import { ArrowLeft, Star, Calendar, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '@/app/components/videoplayer';
import { getMovieDetails } from '@/app/lib/tmdb';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center gap-6 p-4">
        <AlertCircle className="w-16 h-16 text-red-600" />
        <h1 className="text-3xl font-bold text-center">No pudimos cargar esta película</h1>
        <Link href="/" className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const anio = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const fondoUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <main className="min-h-screen bg-[#141414] text-white pb-20 selection:bg-red-500/30">
      
      {/* EL BANNER GIGANTE (Igual que la portada) */}
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fondoUrl})` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 z-10 max-w-5xl">
          
          <Link 
            href="/" 
            className="flex items-center gap-2 w-fit mb-8 px-5 py-2.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all text-sm font-bold tracking-wider"
          >
            <ArrowLeft size={18} />
            VOLVER AL INICIO
          </Link>

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-2xl">
            {movie.title || movie.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-semibold mb-6">
            <span className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded">
              <Star size={16} className="fill-current" /> {movie.vote_average?.toFixed(1) || '0.0'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {anio}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} /> {movie.runtime || 0} min
            </span>
            <span className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs tracking-wider">
              HD
            </span>
          </div>

          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-5 drop-shadow-md">
            {movie.overview || "No hay sinopsis disponible."}
          </p>
        </div>
      </div>

      {/* ZONA DEL REPRODUCTOR (Un poco separada para que no se superponga feo) */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-4 relative z-20">
        <VideoPlayer 
          id={movie.id.toString()} 
          titulo={movie.title || movie.name} 
        />
      </div>

    </main>
  );
}