import { getMovieDetails } from '@/app/lib/tmdb';
import { Star, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import VideoPlayer from '@/app/components/videoplayer';

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      
      {/* 1. FONDO DIFUMINADO */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-black/60 z-10" />
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          alt={movie.title} // <--- CORRECCIÓN: Agregamos alt
          className="w-full h-full object-cover opacity-30 blur-sm scale-105"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        
        {/* HEADER */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition group">
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition">
             <ArrowLeft size={20} />
          </div>
          <span className="font-bold">Volver al Inicio</span>
        </Link>

        {/* 2. REPRODUCTOR */}
        <div className="mb-10">
           <VideoPlayer id={params.id} />
        </div>

        {/* 3. INFO */}
        <div className="flex flex-col md:flex-row gap-8 bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          
          {/* Poster */}
          <div className="hidden md:block w-56 flex-shrink-0">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={`Poster de ${movie.title}`} // <--- CORRECCIÓN: Agregamos alt
              className="w-full rounded-xl shadow-2xl shadow-black/50 border border-white/10"
            />
          </div>

          {/* Textos */}
          <div className="flex-1 space-y-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {movie.title}
              </h1>
              <p className="text-orange-500 font-bold text-lg mt-1 italic">
                {movie.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm font-bold">
              <span className="flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded">
                <Star size={16} fill="black" /> {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded border border-white/10">
                <Clock size={16} /> {movie.runtime} min
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded border border-white/10">
                <Calendar size={16} /> {movie.release_date?.split('-')[0]}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {movie.genres.map((g: any) => (
                <span key={g.id} className="text-xs font-bold border border-white/20 px-3 py-1 rounded-full text-gray-400 hover:text-white hover:border-white transition cursor-default">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}