import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, Calendar, Package, ShoppingBag, Scissors,
  Image, Star, Users, Gift, Settings, LogOut, Menu, Sparkles
} from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/services', label: 'Services', icon: Scissors },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/tokens', label: 'Tokens', icon: Gift },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, darkMode, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) { navigate('/signin'); return; }
    if (currentUser.role !== 'admin') navigate('/account');
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const isActiveFix = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname === to || location.pathname.startsWith(to + '/');

  const handleLogout = () => { logout(); navigate('/'); };

  const Sidebar = () => (
    <aside className={`w-64 flex-shrink-0 flex flex-col ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r min-h-screen`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-yellow-400 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">BabyJat Admin</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Control Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, exact }) => (
          <Link key={to} to={to} onClick={() => setSideOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActiveFix(to, exact)
                ? 'bg-pink-600 text-white shadow-sm'
                : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
            }`}>
            <Icon size={16} /> {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link to="/" className={`flex items-center gap-2 px-4 py-2 text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'} mb-2`}>← Back to Website</Link>
        <button onClick={handleLogout} className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 rounded-xl ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-red-50'} transition-colors`}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sideOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSideOpen(false)} />
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSideOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100">
              <Menu size={18} />
            </button>
            <div>
              <p className="font-semibold text-sm">{navItems.find(n => isActiveFix(n.to, n.exact))?.label || 'Admin'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white text-sm font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold">{currentUser.name}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Administrator</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
