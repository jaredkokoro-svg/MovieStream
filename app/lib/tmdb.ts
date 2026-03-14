// app/lib/tmdb.ts

// 1. LEEMOS LA LLAVE DESDE LA BÓVEDA SECRETA (.env)
const API_KEY = process.env.TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDB(endpoint: string) {
  // Protección por si la llave no carga
  if (!API_KEY) {
    console.error("Error: TMDB_API_KEY no está definida en el archivo .env");
    return { results: [] };
  }

  const separador = endpoint.includes('?') ? '&' : '?';
  const urlFinal = `${BASE_URL}${endpoint}${separador}api_key=${API_KEY}&language=es-MX`;

  try {
    const res = await fetch(urlFinal, {
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) {
      console.log("Status TMDB:", res.status);
      return { results: [] };
    };
    return res.json();
  } catch (error) {
    console.error("Fallo de red TMDB:", error);
    return { results: [] };
  }
}

// ... (Aquí dejas el resto de tus funciones getTrending, getPopularMovies, etc. intactas) ...
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

export async function getMovieDetails(id: string) {
  if (!API_KEY) return null;
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-MX`);
  if (!res.ok) return null;
  return res.json();
}