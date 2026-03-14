import Link from 'next/link';
import { PlayCircle, SearchX } from 'lucide-react';
import { searchMulti } from '@/app/lib/tmdb'; // Tu función de búsqueda

// Next.js pasa automáticamente los parámetros de la URL (searchParams)
export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  // Más abajo, dentro del map: Decide a qué URL mandarte
  const isMovie = item.media_type === 'movie';
  const url = isMovie ? `/movie/${item.id}` : `/serie/${item.id}`;
  
  // Usamos tu función para buscar en TMDB
  const results = query ? await searchMulti(query) : [];

  // Filtramos para mostrar solo películas y series (quitamos resultados de personas)
  const filteredResults = results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-24 pb-20 px-4 md:px-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-200">
        Resultados para: <span className="text-white">{`"${query}"`}</span>
      </h1>

      {filteredResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <SearchX className="w-20 h-20 mb-4 opacity-50" />
          <p className="text-xl">No encontramos coincidencias para tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredResults.map((item: any) => {
            const isMovie = item.media_type === 'movie';
            const url = isMovie ? `/movie/${item.id}` : `/serie/${item.id}`; // Preparando ruta de series
            const title = item.title || item.name;
            const year = (item.release_date || item.first_air_date)?.substring(0, 4);

            return (
              <Link 
                href={url} 
                key={item.id}
                className="relative aspect-[2/3] rounded-xl overflow-hidden group bg-zinc-900 transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/20 hover:ring-2 hover:ring-red-500"
              >
                {item.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-center p-2 text-sm text-gray-400">
                    Sin Imagen
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <PlayCircle className="text-white w-10 h-10 mx-auto mb-2 opacity-80" />
                  <p className="text-white text-xs font-bold text-center line-clamp-2">{title}</p>
                  <p className="text-gray-300 text-[10px] text-center mt-1">{year}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}