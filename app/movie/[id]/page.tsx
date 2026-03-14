import { ArrowLeft, Star, Calendar, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '@/app/components/videoplayer';
// IMPORTANTE: Usamos la función del archivo que acabamos de parchear
import { getMovieDetails } from '@/app/lib/tmdb';

export default async function MoviePage({ params }: { params: { id: string } }) {
  // 1. Intentamos obtener la película
  const movie = await getMovieDetails(params.id);

  // 2. Si es null (porque TMDB dio 404), mostramos este aviso elegante en lugar de CRASHEAR
  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center gap-6 p-4 text-center">
        <AlertCircle className="w-20 h-20 text-red-600 opacity-50" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Película no encontrada</h1>
          <p className="text-gray-400 max-w-xs mx-auto">
            Es posible que el ID sea incorrecto o que TMDB no tenga información de este título.
          </p>
        </div>
        <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
          Regresar al Inicio
        </Link>
      </div>
    );
  }

  const anio = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const fondoUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <main className="min-h-screen bg-[#141414] text-white pb-20">
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondoUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-16 z-10 max-w-5xl">
          <Link href="/" className="flex items-center gap-2 w-fit mb-8 px-5 py-2.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all text-sm font-bold">
            <ArrowLeft size={18} /> VOLVER
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-2xl">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-semibold mb-6">
            <span className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded">
              ★ {movie.vote_average?.toFixed(1)}
            </span>
            <span>{anio}</span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base line-clamp-3">{movie.overview}</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-4 relative z-20">
        <VideoPlayer id={movie.id.toString()} titulo={movie.title} />
      </div>
    </main>
  );
}