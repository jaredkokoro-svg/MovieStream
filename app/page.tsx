import { getTrending, getPopularMovies, getPopularSeries } from './lib/tmdb';
import { Play, Info } from 'lucide-react';
import Link from 'next/link'; // <--- IMPORTANTE: Importamos esto para navegar

export default async function HomePage() {
  // 1. Pedimos los datos al servidor
  const trending = await getTrending();
  const movies = await getPopularMovies();
  const series = await getPopularSeries();

  // Tomamos la primera película para el Banner Gigante
  const heroMovie = trending[0];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-20">
      {/* --- 1. HERO SECTION (BANNER TIPO TV) --- */}
      <div className="relative w-full h-[70vh] md:h-[85vh]">
        {/* Imagen de Fondo */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title || heroMovie.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-transparent" />
        </div>

        {/* Información del Banner */}
        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl space-y-4">
          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            #1 en Tendencias
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-xl">
            {heroMovie.title || heroMovie.name}
          </h1>
          <p className="text-gray-300 line-clamp-3 md:text-lg drop-shadow-md">
            {heroMovie.overview}
          </p>

          <div className="flex gap-4 pt-4">
            {/* BOTÓN REPRODUCIR DEL BANNER (Ahora funciona) */}
            <Link href={`/movie/${heroMovie.id}`}>
              <button className="bg-white text-black px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-200 transition">
                <Play fill="black" size={20} /> Reproducir
              </button>
            </Link>

            <button className="bg-gray-500/40 backdrop-blur-md text-white px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-500/60 transition border border-white/10">
              <Info size={20} /> Más Info
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. CARRILES DE PELÍCULAS --- */}
      <div className="px-6 md:px-12 space-y-10 -mt-20 relative z-10">
        {/* Fila: Películas Populares */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-200 flex items-center gap-2">
            <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
            Películas Populares
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {movies.map((movie: any) => (
              // ENLACE A LA PÁGINA DE LA PELÍCULA
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="min-w-[160px] md:min-w-[200px] snap-start cursor-pointer group">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/10 group-hover:border-yellow-500 transition-all duration-300 group-hover:scale-105">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play
                        fill="white"
                        className="text-white w-12 h-12 drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-400 group-hover:text-white truncate">
                    {movie.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Fila: Series Top (Estas aún no tienen enlace porque nos falta crear la página de series) */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-200 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Series del Momento
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {series.map((show: any) => (
              <div
                key={show.id}
                className="min-w-[160px] md:min-w-[200px] snap-start cursor-pointer group"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/10 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-400 group-hover:text-white truncate">
                  {show.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
