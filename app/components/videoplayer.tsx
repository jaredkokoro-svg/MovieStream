'use client';

import { useState } from 'react';
import { Server, Globe, Settings, PlayCircle } from 'lucide-react';

export default function VideoPlayer({ id }: { id: string }) {
  // LISTA DE SERVIDORES ACTUALIZADA (2026)
  const servers = [
    // 1. El que ya sabes que funciona
    { name: "Plus (Rápido)", url: `https://vidsrc.to/embed/movie/${id}` },
    
    // 2. Multiembed: Este es BUENÍSIMO, busca en varios lados
    { name: "Multi (Recomendado)", url: `https://multiembed.mov/?video_id=${id}&tmdb=1` },
    
    // 3. VidSrc CC: Una versión alternativa muy estable
    { name: "Alpha (Estable)", url: `https://vidsrc.cc/v2/embed/movie/${id}` },
    
    // 4. XYZ: Otro espejo por si todo falla
    { name: "Backup (XYZ)", url: `https://vidsrc.xyz/embed/movie?tmdb=${id}` },
  ];

  const [currentServer, setCurrentServer] = useState(servers[0]);

  return (
    <div className="space-y-4">
      
      {/* PANTALLA DE TV */}
      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group z-10">
        <iframe 
          key={currentServer.name}
          src={currentServer.url}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="Reproductor"
        />
      </div>

      {/* CONTROL REMOTO (SELECTOR) */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm font-bold uppercase tracking-wider">
          <Server size={14} /> Fuente de Video: <span className="text-white">{currentServer.name}</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {servers.map((server) => (
            <button
              key={server.name}
              onClick={() => setCurrentServer(server)}
              className={`
                px-4 py-3 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transition-all border
                ${currentServer.name === server.name 
                  ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-900/40 scale-105" 
                  : "bg-black/40 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {currentServer.name === server.name ? <PlayCircle size={16} /> : <Globe size={16} />}
              {server.name}
            </button>
          ))}
        </div>
        
        <p className="mt-4 text-[10px] md:text-xs text-gray-500 flex items-center gap-1 opacity-70">
          <Settings size={12} />
          Tip: Prueba el servidor Multi si buscas audio latino.
        </p>
      </div>

    </div>
  );
}