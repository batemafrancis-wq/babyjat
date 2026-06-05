import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { services } from '../data/mockData';

const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

export default function Services() {
  const { darkMode } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      {/* HERO */}
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Services & Prices</h1>
        <p className="text-pink-200 text-lg max-w-2xl mx-auto">Professional hair care services for every style and need. All prices in Uganda Shillings (UGX).</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* FILTER */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-pink-600 text-white shadow-lg'
                  : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => (
            <div key={s.id} className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-pink-900/40 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                  {s.category}
                </span>
                <div className="text-right">
                  <div className="font-bold text-pink-600 text-xl">{s.price.toLocaleString()}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>UGX</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{s.name}</h3>
              <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{s.description}</p>
              <div className={`flex items-center gap-1 text-xs mb-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <Clock size={12} /> {s.duration} minutes
              </div>
              <Link to="/account/appointments/new"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-pink-700 transition-all shadow-sm">
                <Calendar size={15} /> Book This Service
              </Link>
            </div>
          ))}
        </div>

        {/* NOTE */}
        <div className={`mt-16 p-6 rounded-2xl border text-center ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-pink-50 border-pink-100'}`}>
          <h3 className="font-bold text-lg mb-2 text-pink-600">Need a Custom Quote?</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Prices may vary based on hair length, thickness, and complexity. Contact us for a personalised quote.</p>
          <a href="https://wa.me/256700000000?text=Hello!%20I%20need%20a%20quote%20for%20a%20hair%20service."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
