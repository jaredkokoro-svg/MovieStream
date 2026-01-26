import { getTrending, getPopularMovies, getPopularSeries } from './lib/tmdb';
import { Play, Info, Star } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const trending = await getTrending();
  const movies = await getPopularMovies();
  const series = await getPopularSeries();

  const heroMovie = trending[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20 font-sans">
      
      {/* --- 1. HERO SECTION PREMIUM --- */}
      <div className="relative w-full h-[85vh] md:h-[95vh] flex items-end">
        
        {/* A. Imagen de Fondo (Full Quality) */}
        <div className="absolute inset-0">
          <img 
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`} 
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
          
          {/* B. Truco de Magia: VIGNETTE & DEGRADADOS */}
          {/* Oscurece arriba para que se vea el menú */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-32" />
          
          {/* Oscurece los lados (estilo cine) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          
          {/* Oscurece abajo para conectar con el contenido */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>

        {/* C. Contenido del Banner */}
        <div className="relative z-10 w-full container mx-auto px-6 md:px-12 mb-20 md:mb-32">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            
            {/* Badges / Etiquetas */}
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded-md text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-red-900/50">
                Top #1
              </span>
              <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                <Star size={14} fill="currentColor" /> {heroMovie.vote_average.toFixed(1)}
              </span>
            </div>

            {/* Título Gigante */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight drop-shadow-2xl">
              {heroMovie.title || heroMovie.name}
            </h1>

            {/* Descripción (Limitada a 3 líneas) */}
            <p className="text-gray-200 text-base md:text-xl font-medium line-clamp-3 max-w-2xl drop-shadow-md text-shadow">
              {heroMovie.overview}
            </p>
            
            {/* Botones de Acción Estilizados */}
            <div className="flex items-center gap-4 pt-4">
              <Link href={`/movie/${heroMovie.id}`}>
                <button className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-transform active:scale-95 shadow-xl shadow-white/10">
                  <Play fill="black" size={24} /> 
                  Reproducir
                </button>
              </Link>
              
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-transform active:scale-95">
                <Info size={24} /> 
                Más Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. CARRILES (SLIDERS) --- */}
      <div className="relative z-20 px-6 md:px-12 space-y-12 -mt-10">
        
        {/* Sección: Películas */}
        <MovieRow title="Tendencias de Hoy" items={trending} />
        <MovieRow title="Películas Populares" items={movies} />
        <MovieRow title="Series Más Vistas" items={series} isSeries={true} />

      </div>
    </div>
  );
}

// --- COMPONENTE EXTRA: Fila de Películas (Para no repetir código) ---
function MovieRow({ title, items, isSeries = false }: { title: string, items: any[], isSeries?: boolean }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 group cursor-pointer">
        <div className="w-1.5 h-8 bg-orange-600 rounded-full group-hover:h-10 transition-all duration-300" />
        {title}
        <span className="text-xs font-normal text-gray-500 ml-auto mr-4 hidden md:block">Ver todo &rarr;</span>
      </h2>
      
      <div className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x px-2">
        {items.map((item: any) => (
          <Link href={`/movie/${item.id}`} key={item.id}>
            <div className="min-w-[150px] md:min-w-[220px] snap-start cursor-pointer group relative">
              
              {/* Contenedor de la Imagen con Efecto Hover */}
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 border border-white/5 shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-orange-500/50 group-hover:shadow-orange-900/20 z-0 group-hover:z-10">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                  alt={item.title || item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay Oscuro al pasar el mouse */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <Play fill="white" size={20} className="text-white ml-1" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-widest uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                    Ver ahora
                  </span>
                </div>
              </div>

              {/* Título Debajo */}
              <div className="mt-3 px-1">
                <h3 className="text-sm md:text-base font-semibold text-gray-300 group-hover:text-white truncate transition-colors">
                  {item.title || item.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{new Date(item.release_date || item.first_air_date || Date.now()).getFullYear()}</span>
                  <span>•</span>
                  <span className="border border-gray-600 px-1 rounded text-[10px]">HD</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}