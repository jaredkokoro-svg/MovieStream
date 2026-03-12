import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// 1. NUESTRA FUNCIÓN ALGORÍTMICA (El creador de Slugs)
function generarSlug(titulo: string, anio: string) {
  const tituloLimpio = titulo
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Deja solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, '-'); // Cambia espacios por guiones
    
  return `${tituloLimpio}-${anio}`; // Une todo
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tmdbId = searchParams.get('id');
  const titulo = searchParams.get('titulo');
  const anio = searchParams.get('anio');

  if (!tmdbId || !titulo || !anio) {
    return NextResponse.json({ error: 'Faltan datos (ID, título o año)' }, { status: 400 });
  }

  try {
    // 2. CREAMOS EL SLUG DINÁMICO
    const slug = generarSlug(titulo, anio);
    
    // 3. CONSTRUIMOS LA URL (Fórmula descubierta: slug-3[id]3v.html)
    const urlOriginal = `https://cue-vana3.org/pelicula/${slug}-3${tmdbId}3v.html?ver=1080p`;
    const urlObjetivo = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlOriginal)}`;

    console.log(`[Scraper] Buscando: ${titulo} (${anio})`);
    console.log(`[Scraper] Intentando raspar: ${urlOriginal}`);

    // 4. HACEMOS LA PETICIÓN DISFRAZADOS
    const response = await fetch(urlObjetivo, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!response.ok) throw new Error(`Bloqueo de red (Status: ${response.status})`);
    
    const htmlReal = await response.text();
    const $ = cheerio.load(htmlReal);

    // 5. EXTRAEMOS EL VIDEO
    const videoExtraido = $('#my-video source').first().attr('src');

    if (!videoExtraido) {
      return NextResponse.json({ error: 'No se encontró el enlace en esta película.' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      mensaje: 'Scraping real exitoso',
      url: videoExtraido, 
      idioma: 'Latino' 
    });

  } catch (error: any) {
    return NextResponse.json({ error: `Fallo de servidor: ${error.message}` }, { status: 500 });
  }
}