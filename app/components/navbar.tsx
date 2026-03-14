'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tv, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Función para manejar el buscador
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setMenuOpen(false); // Cierra el menú en móviles al buscar
    }
  };

  return (
    <nav className="w-full bg-[#141414]/90 backdrop-blur-md p-4 md:px-12 fixed top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO Y ENLACES DE ESCRITORIO */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded text-white">
              <Tv size={20} />
            </div>
            <span className="text-xl font-black tracking-widest text-white hidden sm:block">
              MOVIE<span className="text-red-600">STREAM</span>
            </span>
          </Link>

          {/* Submenús (Visibles en PC) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-300">
            <Link href="/" className="hover:text-white transition">Inicio</Link>
            <Link href="/series" className="hover:text-white transition">Series</Link>
            <Link href="/anime" className="hover:text-white transition">Anime</Link>
          </div>
        </div>

        {/* BUSCADOR Y BOTÓN MÓVIL */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Títulos, personas, géneros..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-black/50 border border-white/20 text-white text-sm rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:border-white/50 w-48 lg:w-64 transition-all"
            />
          </form>

          {/* Menú Hamburguesa para celulares */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#141414] border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/20 text-white text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-red-500"
            />
          </form>
          <Link href="/" className="text-gray-300 font-bold hover:text-white" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/series" className="text-gray-300 font-bold hover:text-white" onClick={() => setMenuOpen(false)}>Series</Link>
          <Link href="/anime" className="text-gray-300 font-bold hover:text-white" onClick={() => setMenuOpen(false)}>Anime</Link>
        </div>
      )}
    </nav>
  );
}