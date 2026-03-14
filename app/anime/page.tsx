import Link from 'next/link';
import { PlayCircle, Tv } from 'lucide-react';
import { fetchTMDB } from '@/app/lib/tmdb';

export default async function AnimePage() {
  // EL TRUCO MAGISTRAL: Animación (16) + Idioma Original Japonés (ja)
  const data = await fetchTMDB('/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc');
  const animes = data.results || [];

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-24 pb-20 px-4 md:px-12">
      
      {/* HEADER DE LA CATEGORÍA */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-red-600 pl-4 uppercase tracking-wider">
          Anime
        </h1>
        <p className="text-gray-400 mt-2 pl-5 font-medium">Las mejores series de animación japonesa del momento.</p>
      </div>

      {/* CUADRÍCULA (GRID) DE CATÁLOGO */}
      {animes.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No se encontraron resultados.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {animes.map((anime: any) => {
            const year = (anime.first_air_date || anime.release_date)?.substring(0, 4);
            const title = anime.name || anime.title; // Las series usan 'name', las pelis usan 'title'

            return (
              <Link 
                href={`/serie/${anime.id}`} // Nota: Esto apuntará a una futura ruta de series
                key={anime.id}
                className="relative aspect-[2/3] rounded-xl overflow-hidden group bg-zinc-900 transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/20 hover:ring-2 hover:ring-red-500"
              >
                <img 
                  src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`} 
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Capa Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <PlayCircle className="text-white w-10 h-10 mx-auto mb-2 opacity-80" />
                  <p className="text-white text-xs font-bold text-center line-clamp-2">{title}</p>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-gray-300 font-semibold">
                    <span>{year}</span>
                    <span className="text-green-400">★ {anime.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}