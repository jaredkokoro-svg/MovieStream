import { getMovieDetails } from '@/app/lib/tmdb';
import { Play, Star, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  // EL TRUCO DE MAGIS TV: Usamos una API de Embed pública
  // Le pasamos el ID de la película y ella nos devuelve el video.
  const videoUrl = `https://vidsrc.to/embed/movie/${params.id}`;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* 1. FONDO DIFUMINADO (BACKDROP) */}
      <div className="fixed inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* BOTÓN REGRESAR */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>

        {/* 2. ZONA DE REPRODUCCIÓN (IFRAME) */}
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8 relative group">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
            title="Reproductor"
          />
        </div>

        {/* 3. INFO DE LA PELÍCULA */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Vertical */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full rounded-xl shadow-lg border border-white/10"
            />
          </div>

          {/* Textos */}
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">
                <Star size={14} fill="currentColor" />{' '}
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                <Clock size={14} /> {movie.runtime} min
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                <Calendar size={14} /> {movie.release_date.split('-')[0]}
              </span>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              {movie.overview}
            </p>

            {/* Géneros */}
            <div className="flex gap-2 pt-2">
              {movie.genres.map((g: any) => (
                <span
                  key={g.id}
                  className="text-xs border border-white/20 px-3 py-1 rounded-full text-gray-400"
                >
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
