import { ArrowLeft, Star, Calendar, Tv, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import SeriesPlayer from '@/app/components/series-player';

async function getTvDetails(id: string) {
  const API_KEY = process.env.TMDB_API_KEY;
  if (!API_KEY) return null;

  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es-MX`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function SeriePage({ params }: { params: { id: string } }) {
  const serie = await getTvDetails(params.id);

  if (!serie) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center gap-6">
        <AlertCircle className="w-16 h-16 text-red-600" />
        <h1 className="text-3xl font-bold">No se encontró la serie</h1>
        <Link href="/" className="px-6 py-3 bg-red-600 font-bold rounded hover:bg-red-700">Volver</Link>
      </div>
    );
  }

  const anio = serie.first_air_date ? serie.first_air_date.substring(0, 4) : 'N/A';
  const fondoUrl = serie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${serie.poster_path}`;

  return (
    <main className="min-h-screen bg-[#141414] text-white pb-20 selection:bg-red-500/30">
      
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondoUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 z-10 max-w-5xl">
          <Link href="/" className="flex items-center gap-2 w-fit mb-8 px-5 py-2.5 bg-black/50 rounded-full border border-white/10 hover:bg-white/10 transition-all text-sm font-bold">
            <ArrowLeft size={18} /> VOLVER AL INICIO
          </Link>

          <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-2xl">{serie.name}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-semibold mb-6">
            <span className="flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded">
              <Star size={16} className="fill-current" /> {serie.vote_average?.toFixed(1) || '0.0'}
            </span>
            <span className="flex items-center gap-1"><Calendar size={16} /> {anio}</span>
            <span className="flex items-center gap-1"><Tv size={16} /> {serie.number_of_seasons} Temporadas</span>
          </div>

          <p className="text-gray-400 max-w-2xl text-sm md:text-base line-clamp-4">
            {serie.overview || "Sinopsis no disponible."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <SeriesPlayer id={serie.id.toString()} titulo={serie.name} seasons={serie.seasons} />
      </div>

    </main>
  );
}