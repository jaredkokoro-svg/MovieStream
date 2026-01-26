'use client';

import { useState } from 'react';
import { Server, Globe, Settings } from 'lucide-react';

export default function VideoPlayer({ id }: { id: string }) {
  // LISTA DE SERVIDORES
  const servers = [
    { name: "Plus (Rápido)", url: `https://vidsrc.to/embed/movie/${id}` },
    { name: "Alpha (Estable)", url: `https://vidsrc.me/embed/movie?tmdb=${id}` },
    { name: "Delta (Multi-Lang)", url: `https://embed.su/embed/movie/${id}` },
    { name: "Pro (Backup)", url: `https://vidsrc.pro/embed/movie/${id}` },
  ];

  const [currentServer, setCurrentServer] = useState(servers[0]);

  return (
    <div className="space-y-4">
      
      {/* 1. EL REPRODUCTOR */}
      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
        <iframe 
          key={currentServer.name}
          src={currentServer.url}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="Reproductor"
        />
      </div>

      {/* 2. SELECTOR DE SERVIDORES */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm font-bold uppercase tracking-wider">
          <Server size={14} /> Seleccionar Servidor
        </div>
        
        <div className="flex flex-wrap gap-3">
          {servers.map((server) => (
            <button
              key={server.name}
              onClick={() => setCurrentServer(server)}
              className={`
                px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
                ${currentServer.name === server.name 
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-900/40 scale-105" 
                  : "bg-black/40 text-gray-400 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Globe size={14} />
              {server.name}
            </button>
          ))}
        </div>
        
        {/* CORRECCIÓN AQUÍ: Usamos comillas simples 'CC' en lugar de dobles "CC" */}
        <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
          <Settings size={12} />
          Nota: Si no hay audio latino, busca el icono 'CC' o 'Settings' dentro del reproductor.
        </p>
      </div>

    </div>
  );
}