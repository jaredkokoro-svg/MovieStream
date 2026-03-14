'use client';

import { useState } from 'react';
import { PlayCircle, Server, CheckCircle2, ListVideo } from 'lucide-react';

const SERVIDORES_TV = [
  {
    id: 'vidlink',
    nombre: 'VidLink (Latino/Multi)',
    getUrl: (id: string, s: number, e: number) => `https://vidlink.pro/tv/${id}/${s}/${e}`,
    color: 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400'
  },
  {
    id: 'vidsrc',
    nombre: 'VidSrc (Inglés/Subs)',
    getUrl: (id: string, s: number, e: number) => `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}`,
    color: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400'
  }
];

export default function SeriesPlayer({ id, titulo, seasons }: { id: string, titulo?: string, seasons: any[] }) {
  const [servidorActivo, setServidorActivo] = useState(0);
  const [temporada, setTemporada] = useState(1);
  const [episodio, setEpisodio] = useState(1);

  const servidorActual = SERVIDORES_TV[servidorActivo];

  // TMDB a veces manda la Temporada 0 (Especiales). La filtramos para empezar desde la 1.
  const temporadasReales = seasons?.filter((s: any) => s.season_number > 0) || [];
  const temporadaActualData = temporadasReales.find((s: any) => s.season_number === temporada);
  const totalEpisodios = temporadaActualData?.episode_count || 1;

  return (
    <div className="space-y-4">
      {/* SELECTORES DE EPISODIO */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-red-500 font-bold mr-4">
          <ListVideo size={20} /> Seleccionar Capítulo:
        </div>
        
        <select 
          value={temporada} 
          onChange={(e) => {
            setTemporada(Number(e.target.value));
            setEpisodio(1); // Reinicia al ep 1 si cambias de temporada
          }}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        >
          {temporadasReales.map((s: any) => (
            <option key={s.id} value={s.season_number}>Temporada {s.season_number}</option>
          ))}
        </select>

        <select 
          value={episodio} 
          onChange={(e) => setEpisodio(Number(e.target.value))}
          className="bg-black border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:border-red-500"
        >
          {Array.from({ length: totalEpisodios }, (_, i) => i + 1).map((ep) => (
            <option key={ep} value={ep}>Episodio {ep}</option>
          ))}
        </select>
      </div>

      {/* PANTALLA DE VIDEO */}
      <div className="w-full aspect-video bg-[#050505] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <iframe 
          src={servidorActual.getUrl(id, temporada, episodio)}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={`Reproductor Series - ${titulo}`}
        ></iframe>
      </div>

      {/* BOTONES DE SERVIDOR */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 space-y-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wider">
          <Server size={16} /> Servidor:
        </div>
        <div className="flex flex-wrap gap-3">
          {SERVIDORES_TV.map((servidor, index) => (
            <button
              key={servidor.id}
              onClick={() => setServidorActivo(index)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all border
                ${servidorActivo === index ? servidor.color : 'bg-[#2a2a2a] text-gray-400 border-white/5 hover:bg-[#333] hover:text-white'}
              `}
            >
              {servidorActivo === index ? <PlayCircle size={16} /> : <CheckCircle2 size={16} className="opacity-50" />}
              {servidor.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}