import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { galleryImages } from '../data/mockData';
import { X } from 'lucide-react';

const categories = ['All', ...Array.from(new Set(galleryImages.map(g => g.category)))];

export default function Gallery() {
  const { darkMode } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter(g => g.category === activeCategory);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Our Gallery</h1>
        <p className="text-pink-200 text-lg">A showcase of our finest work</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-pink-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(img => (
            <div key={img.id} onClick={() => setLightbox(img.url)}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group">
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/50 transition-all flex flex-col items-center justify-center">
                <p className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</p>
                <span className="text-pink-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30">
            <X size={20} />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain rounded-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
