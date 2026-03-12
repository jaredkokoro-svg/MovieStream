'use client';

import { PlayCircle, CheckCircle2 } from 'lucide-react';

export default function VideoPlayer({ id, titulo, anio }: { id: string, titulo?: string, anio?: string }) {
  
  // LA MAGIA: Usamos un proveedor global que busca la película solo con el ID de TMDB
  // Proveedor confiable y muy usado en la comunidad: vidsrc.me
  const videoUrl = `https://vidsrc.me/embed/movie?tmdb=${id}`;

  return (
    <div className="space-y-4">
      
      {/* PANTALLA DE TV (IFRAME DIRECTO) */}
      <div className="w-full aspect-video bg-[#050505] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-10">
        <iframe 
          src={videoUrl}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={`Reproductor - ${titulo || 'Película'}`}
        ></iframe>
      </div>

      {/* PANEL DE ESTADO */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wider">
          <PlayCircle size={16} className="text-green-500" /> 
          Servidor: 
          <span className="text-green-500">
            VidSrc (Auto-Embed API)
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">
          <CheckCircle2 size={16} className="text-green-500" />
          <span className="text-xs font-bold text-green-500 tracking-wider">
            CONECTADO POR ID: {id}
          </span>
        </div>
      </div>

    </div>
  );
}