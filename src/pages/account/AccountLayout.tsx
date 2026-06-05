import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, ShoppingBag, Gift, User, ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react';
import { useEffect } from 'react';

const navItems = [
  { to: '/account', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/account/appointments', label: 'My Appointments', icon: Calendar },
  { to: '/account/orders', label: 'My Orders', icon: ShoppingBag },
  { to: '/account/tokens', label: 'My Tokens', icon: Gift },
  { to: '/account/profile', label: 'Profile', icon: User },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, darkMode, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/signin');
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* BACK TO SITE */}
        <Link to="/" className={`inline-flex items-center gap-2 text-sm mb-6 hover:text-pink-600 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <ArrowLeft size={14} /> Back to Site
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <aside className={`w-full lg:w-64 flex-shrink-0`}>
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}>
              {/* USER INFO */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate">{currentUser.name}</p>
                  <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.phone}</p>
                  <span className="inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full mt-1">
                    <Gift size={10} /> {currentUser.tokens} tokens
                  </span>
                </div>
              </div>

              {/* NAV */}
              <nav className="space-y-1">
                {navItems.map(({ to, label, icon: Icon, exact }) => (
                  <Link key={to} to={to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(to, exact)
                        ? 'bg-pink-600 text-white shadow-sm'
                        : darkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                    }`}>
                    <Icon size={16} /> {label}
                  </Link>
                ))}
                <button onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-red-500 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-red-50'}`}>
                  <LogOut size={16} /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
