import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors, Menu, X, Sun, Moon, Phone,
  MapPin, Clock, ChevronDown, User, LogOut, ShoppingCart, Sparkles
} from 'lucide-react';

const IGIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FBIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WAIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const { darkMode, toggleDark, currentUser, logout, cart } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* TOP BAR */}
      <div className="bg-pink-600 text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Phone size={11} /> +256 700 000 000</span>
          <span className="flex items-center gap-1"><Clock size={11} /> Mon–Sat: 8am–7pm</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-200 transition-colors"><IGIcon /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-pink-200 transition-colors"><FBIcon /></a>
          <span className="flex items-center gap-1"><MapPin size={11} /> Kampala, Uganda</span>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} border-b shadow-sm transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center shadow-md">
              <Scissors size={18} className="text-white rotate-45" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg text-pink-600" style={{ fontFamily: 'Playfair Display, serif' }}>BabyJat</div>
              <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Beauty Parlor</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive(l.to)
                    ? 'bg-pink-50 text-pink-600'
                    : darkMode ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            <button onClick={toggleDark}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Cart */}
            {currentUser && (
              <Link to="/account/orders/new" className="relative p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors">
                <ShoppingCart size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {currentUser ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(o => !o)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:block max-w-20 truncate">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown size={12} />
                </button>
                {userMenuOpen && (
                  <div className={`absolute right-0 top-12 w-52 rounded-2xl shadow-xl border z-50 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <p className="font-semibold text-sm">{currentUser.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.phone}</p>
                    </div>
                    <Link to="/account" onClick={() => setUserMenuOpen(false)} className={`flex items-center gap-2 px-4 py-3 text-sm hover:bg-pink-50 hover:text-pink-600 transition-colors ${darkMode ? 'hover:bg-gray-700 hover:text-pink-400' : ''}`}>
                      <User size={14} /> My Dashboard
                    </Link>
                    {currentUser.role === 'admin' && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)} className={`flex items-center gap-2 px-4 py-3 text-sm hover:bg-pink-50 hover:text-pink-600 transition-colors ${darkMode ? 'hover:bg-gray-700 hover:text-pink-400' : ''}`}>
                        <Sparkles size={14} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className={`w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors ${darkMode ? 'hover:bg-gray-700' : ''}`}>
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/signin" className={`hidden sm:block px-4 py-2 rounded-full text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-600 hover:text-pink-600'}`}>
                  Sign In
                </Link>
                <Link to="/account/appointments/new"
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full text-sm font-medium hover:from-pink-600 hover:to-pink-700 transition-all shadow-sm">
                  Book Now
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(o => !o)} className={`md:hidden p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileOpen && (
          <div className={`md:hidden border-t ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'} px-4 py-3 space-y-1`}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(l.to) ? 'bg-pink-50 text-pink-600' : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ))}
            {!currentUser && (
              <>
                <Link to="/signin" onClick={() => setMobileOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-4 py-3 bg-pink-600 text-white rounded-xl text-sm font-medium text-center">Create Account</Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center">
                <Scissors size={18} className="text-white rotate-45" />
              </div>
              <div>
                <div className="font-bold text-lg text-pink-600" style={{ fontFamily: 'Playfair Display, serif' }}>BabyJat Beauty Parlor</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>& Hair Accessories</div>
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your premier destination for beautiful hair in Kampala, Uganda. We specialise in braiding, treatments, styling, and premium hair accessories.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"><IGIcon /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"><FBIcon /></a>
              <a href="https://wa.me/256700000000" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/services', 'Services & Prices'], ['/gallery', 'Gallery'], ['/contact', 'Contact Us'], ['/account', 'My Account']].map(([to, label]) => (
                <li key={to}><Link to={to} className={`text-sm hover:text-pink-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Contact</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="flex items-start gap-2"><MapPin size={14} className="text-pink-500 mt-0.5 flex-shrink-0" /><span>Plot 12 Nakawa Road,<br />Kampala, Uganda</span></li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-pink-500" />+256 700 000 000</li>
              <li className="flex items-start gap-2"><Clock size={14} className="text-pink-500 mt-0.5" /><span>Mon–Sat: 8am – 7pm<br />Sunday: 10am – 5pm</span></li>
            </ul>
          </div>
        </div>
        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} py-4 px-4 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          © 2025 BabyJat Beauty Parlor & Hair Accessories. All rights reserved. | <Link to="/privacy" className="hover:text-pink-600">Privacy Policy</Link> | <Link to="/terms" className="hover:text-pink-600">Terms of Service</Link>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/256700000000?text=Hello%20BabyJat!%20I'd%20like%20to%20book%20an%20appointment."
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110">
        <WAIcon />
      </a>
    </div>
  );
}
