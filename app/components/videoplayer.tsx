'use client';

import { useState } from 'react';
import { PlayCircle, Server, CheckCircle2 } from 'lucide-react';

// 1. EL DICCIONARIO DE SERVIDORES
// Aquí puedes agregar, quitar o modificar proveedores fácilmente en el futuro
const SERVIDORES = [
  {
    id: 'vidlink',
    nombre: 'VidLink (Latino/Multi)',
    // VidLink es muy popular por tener múltiples idiomas
    getUrl: (tmdbId: string) => `https://vidlink.pro/movie/${tmdbId}`,
    color: 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400'
  },
  {
    id: 'vidsrc',
    nombre: 'VidSrc (Inglés/Subs)',
    getUrl: (tmdbId: string) => `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`,
    color: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400'
  },
  {
    id: 'superembed',
    nombre: 'AutoEmbed (Alternativo)',
    // Otro proveedor masivo muy usado como plan C
    getUrl: (tmdbId: string) => `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`,
    color: 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
  }
];

export default function VideoPlayer({ id, titulo }: { id: string, titulo?: string }) {
  // 2. EL ESTADO DEL SERVIDOR ACTIVO
  // Iniciamos con el índice 0 (VidLink) por defecto
  const [servidorActivo, setServidorActivo] = useState(0);

  const servidorActual = SERVIDORES[servidorActivo];

  return (
    <div className="space-y-4">
      
      {/* PANTALLA DE TV (IFRAME DINÁMICO) */}
      <div className="w-full aspect-video bg-[#050505] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-10">
        <iframe 
          // El 'src' cambia automáticamente cuando cambia el estado 'servidorActivo'
          src={servidorActual.getUrl(id)}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen"
          title={`Reproductor - ${titulo || 'Película'}`}
        ></iframe>
      </div>

      {/* PANEL DE CONTROL: SELECTOR DE SERVIDORES */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 space-y-4">
        
        <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wider">
          <Server size={16} className="text-gray-300" /> 
          Opciones de Servidor:
        </div>

        {/* LA BOTONERA */}
        <div className="flex flex-wrap gap-3">
          {SERVIDORES.map((servidor, index) => (
            <button
              key={servidor.id}
              onClick={() => setServidorActivo(index)}
              className={`
                px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-200 border
                ${servidorActivo === index 
                  ? servidor.color // Si está activo, usa su color brillante
                  : 'bg-[#2a2a2a] text-gray-400 border-white/5 hover:bg-[#333] hover:text-white' // Si está inactivo, se ve apagado
                }
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