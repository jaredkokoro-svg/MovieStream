import Link from 'next/link';
import { PlayCircle, Tv } from 'lucide-react';
import { fetchTMDB } from '@/app/lib/tmdb';

export default async function SeriesPage() {
  // Traemos las series más populares directamente de TMDB
  const data = await fetchTMDB('/tv/popular');
  const series = data.results || [];

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-24 pb-20 px-4 md:px-12">
      
      {/* HEADER DE LA CATEGORÍA */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-red-600 pl-4 uppercase tracking-wider flex items-center gap-3">
          <Tv size={32} className="text-red-600" />
          Series Populares
        </h1>
        <p className="text-gray-400 mt-2 pl-5 font-medium">Las series más aclamadas del momento, listas para una maratón.</p>
      </div>

      {/* CUADRÍCULA (GRID) DE CATÁLOGO */}
      {series.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No se encontraron resultados en este momento.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {series.map((serie: any) => {
            // Las series en TMDB usan first_air_date y name (en lugar de release_date y title)
            const year = (serie.first_air_date)?.substring(0, 4) || 'N/A';
            const title = serie.name || serie.original_name;

            return (
              <Link 
                href={`/serie/${serie.id}`} 
                key={serie.id}
                className="relative aspect-[2/3] rounded-xl overflow-hidden group bg-zinc-900 transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/20 hover:ring-2 hover:ring-red-500"
              >
                <img 
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} 
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Capa Oscura (Efecto Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <PlayCircle className="text-white w-10 h-10 mx-auto mb-2 opacity-80" />
                  <p className="text-white text-xs font-bold text-center line-clamp-2">{title}</p>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-gray-300 font-semibold">
                    <span>{year}</span>
                    <span className="text-green-400">★ {serie.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pie de página sutil */}
      <div className="mt-16 text-center text-[#333] text-xs font-semibold">
        Developed by Jared Jafet Ortiz
      </div>
    </main>
  );
}