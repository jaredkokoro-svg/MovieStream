'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

export default function MovieCarousel({ title, movies }: { title: string, movies: any[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      // Calcula cuánto deslizar (una pantalla entera hacia el lado correspondiente)
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-2 md:space-y-4 relative group/row">
      {/* Título de la fila estilo Netflix */}
      <h2 className="text-lg md:text-2xl font-bold text-[#e5e5e5] px-4 md:px-12 transition duration-200 hover:text-white cursor-pointer">
        {title} <span className="text-transparent group-hover/row:text-green-500 text-sm ml-2 transition-all">Explorar todos {'>'}</span>
      </h2>
      
      <div className="group/slider relative">
        {/* BOTÓN IZQUIERDA (Aparece en hover) */}
        <button
          onClick={() => scroll('left')}
          className="absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 bg-black/50 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 hover:bg-black/80 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 text-white transition hover:scale-125" />
        </button>

        {/* CONTENEDOR DESLIZABLE */}
        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-2 md:gap-4 px-4 md:px-12 scrollbar-hide scroll-smooth"
        >
          {movies.map((movie: any) => (
            <Link 
              href={`/movie/${movie.id}`} 
              key={movie.id}
              className="relative flex-none w-[130px] md:w-[220px] aspect-[2/3] rounded-md overflow-hidden bg-zinc-900 transition-transform duration-300 hover:scale-105 hover:z-30 hover:ring-2 hover:ring-gray-300"
            >
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <PlayCircle className="text-white w-10 h-10 mx-auto mb-2 opacity-90 hover:scale-110 transition-transform" />
                <p className="text-white text-sm font-bold text-center line-clamp-1">{movie.title || movie.name}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTÓN DERECHA (Aparece en hover) */}
        <button
          onClick={() => scroll('right')}
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 bg-black/50 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 hover:bg-black/80 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 text-white transition hover:scale-125" />
        </button>
      </div>
    </div>
  );
}