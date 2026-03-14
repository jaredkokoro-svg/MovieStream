import Link from 'next/link';
import { PlayCircle, Info, AlertTriangle } from 'lucide-react';
import { fetchTMDB } from '@/app/lib/tmdb'; 
import MovieCarousel from '@/app/components/movie-carousel';

export default async function Home() {
  const [trending, action, comedy, horror] = await Promise.all([
    fetchTMDB('/trending/movie/week'), // Week da mejores resultados para la portada
    fetchTMDB('/discover/movie?with_genres=28'),
    fetchTMDB('/discover/movie?with_genres=35'),
    fetchTMDB('/discover/movie?with_genres=27'),
  ]);

  if (!trending?.results?.length) {
    return (
      <main className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold">Error de conexión con TMDB</h1>
      </main>
    );
  }

  const heroMovie = trending.results[0];
  const restOfTrending = trending.results.slice(1);
  const heroImage = `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`;

  return (
    <main className="min-h-screen bg-[#141414] text-white pb-20 overflow-x-hidden selection:bg-red-600/30">

      {/* 🎬 HERO BANNER GIGANTE */}
      <div className="relative w-full h-[85vh] flex flex-col justify-end pb-24 md:pb-32 px-4 md:px-12">
        
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Degradado inferior intenso para montar los carruseles */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent w-[80%]" />
        
        {/* Textos y botones */}
        <div className="relative z-10 max-w-2xl space-y-4 md:space-y-6">
          {/* Logo en texto gigante (Ya que no tenemos el logo SVG real de la peli) */}
          <h1 className="text-5xl md:text-8xl font-black drop-shadow-2xl tracking-tighter text-white uppercase leading-none">
            {heroMovie.title || heroMovie.name}
          </h1>
          
          <p className="text-white text-sm md:text-lg line-clamp-3 drop-shadow-xl font-medium md:max-w-[85%] leading-snug">
            {heroMovie.overview}
          </p>
          
          <div className="flex gap-3 pt-2">
            <Link 
              href={`/movie/${heroMovie.id}`} 
              className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded md:rounded-md font-bold flex items-center gap-2 hover:bg-white/80 transition-all text-sm md:text-lg"
            >
              <PlayCircle className="w-6 h-6 md:w-8 md:h-8 fill-black text-white" /> Reproducir
            </Link>
            <button className="bg-gray-500/70 text-white px-6 py-2 md:py-3 rounded md:rounded-md font-bold flex items-center gap-2 hover:bg-gray-500/50 transition-all text-sm md:text-lg">
              <Info className="w-6 h-6 md:w-8 md:h-8" /> Más información
            </button>
          </div>
        </div>
      </div>

      {/* CARRUSELES (Montados sobre el degradado del banner) */}
      <div className="space-y-8 md:space-y-12 relative z-20 -mt-20 md:-mt-32">
        <MovieCarousel title="Tendencias" movies={restOfTrending} />
        <MovieCarousel title="Acción y Aventura" movies={action.results} />
        <MovieCarousel title="Comedias" movies={comedy.results} />
        <MovieCarousel title="Películas de Terror" movies={horror.results} />
      </div>

    </main>
  );
}