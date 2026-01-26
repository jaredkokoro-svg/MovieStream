// app/lib/tmdb.ts

const API_KEY = '4916d2427a85c431815c7cfa78116c48'; // <--- OJO AQUÍ
const BASE_URL = 'https://api.themoviedb.org/3';

// Función genérica para pedir datos
async function fetchTMDB(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-MX`, {
    next: { revalidate: 3600 } // Cachear por 1 hora (para que sea rápido)
  });
  
  if (!res.ok) throw new Error('Fallo al conectar con TMDB');
  return res.json();
}

// 1. Obtener Tendencias (Lo que sale en la portada)
export async function getTrending() {
  const data = await fetchTMDB('/trending/all/day');
  return data.results;
}

// 2. Obtener Películas Populares
export async function getPopularMovies() {
  const data = await fetchTMDB('/movie/popular');
  return data.results;
}

// 3. Obtener Series Populares
export async function getPopularSeries() {
  const data = await fetchTMDB('/tv/popular');
  return data.results;
}

// 4. Buscar (Para tu barra de búsqueda futura)
export async function searchMulti(query: string) {
  const data = await fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
  return data.results;
}

// 5. Obtener Detalles de una Película por ID
export async function getMovieDetails(id: string) {
  const data = await fetchTMDB(`/movie/${id}`);
  return data;
}