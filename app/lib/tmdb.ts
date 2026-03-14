// app/lib/tmdb.ts

const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

// 1. FUNCIÓN MAESTRA (Usada por los carruseles)
export async function fetchTMDB(endpoint: string) {
  if (!API_KEY) {
    console.error("⚠️ Error: TMDB_API_KEY no detectada.");
    return { results: [] };
  }

  const separador = endpoint.includes('?') ? '&' : '?';
  const urlFinal = `${BASE_URL}${endpoint}${separador}api_key=${API_KEY}&language=es-MX`;

  try {
    const res = await fetch(urlFinal, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      console.log(`[TMDB Log] Status ${res.status} en: ${endpoint}`);
      return { results: [] };
    }
    return res.json();
  } catch (error) {
    return { results: [] };
  }
}

// 2. FUNCIONES DE CATEGORÍAS
export async function getTrending() {
  const data = await fetchTMDB('/trending/all/day');
  return data.results || [];
}

export async function getPopularMovies() {
  const data = await fetchTMDB('/movie/popular');
  return data.results || [];
}

export async function getPopularSeries() {
  const data = await fetchTMDB('/tv/popular');
  return data.results || [];
}

export async function searchMulti(query: string) {
  const data = await fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
  return data.results || [];
}

// 3. DETALLES DE PELÍCULA (Aquí estaba el error 404 en Vercel)
export async function getMovieDetails(id: string) {
  if (!API_KEY) return null;

  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
    
    // Parche: Si no existe la peli, devolvemos null en vez de lanzar Error
    if (!res.ok) {
      console.error(`[Vercel Fix] Película no encontrada ID: ${id}`);
      return null;
    }
    return res.json();
  } catch (e) {
    return null;
  }
}

// 4. DETALLES DE SERIE
export async function getTvDetails(id: string) {
  if (!API_KEY) return null;

  try {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es-MX`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}