import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, ShoppingBag, Gift, Plus, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'completed' || status === 'delivered') return <CheckCircle size={14} />;
  if (status === 'pending') return <Clock size={14} />;
  if (status === 'cancelled') return <XCircle size={14} />;
  return <AlertCircle size={14} />;
};

export default function AccountDashboard() {
  const { currentUser, bookings, orders, darkMode, cancelBooking } = useApp();
  if (!currentUser) return null;

  const myBookings = bookings.filter(b => b.userId === currentUser.id);
  const myOrders = orders.filter(o => o.userId === currentUser.id);
  const upcoming = myBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').slice(0, 2);
  const recentOrders = myOrders.slice(0, 2);
  const redeemable = Math.floor(currentUser.tokens / 100);

  const card = `rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  return (
    <div className="space-y-6">
      {/* WELCOME */}
      <div className={`${card} bg-gradient-to-br from-pink-500 to-pink-700 border-0 text-white`}>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
        <p className="text-pink-200 mt-1 text-sm">Manage your appointments, orders, and loyalty rewards.</p>
        <div className="flex flex-wrap gap-3 mt-5">
          <Link to="/account/appointments/new"
            className="flex items-center gap-2 px-5 py-2 bg-white text-pink-600 rounded-xl text-sm font-semibold hover:bg-pink-50 transition-colors">
            <Plus size={15} /> Book Appointment
          </Link>
          <Link to="/account/orders/new"
            className="flex items-center gap-2 px-5 py-2 bg-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/30 transition-colors border border-white/30">
            <ShoppingBag size={15} /> Shop Now
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: myBookings.length, icon: Calendar, color: 'pink' },
          { label: 'Total Orders', value: myOrders.length, icon: ShoppingBag, color: 'purple' },
          { label: 'Token Balance', value: `${currentUser.tokens} pts`, icon: Gift, color: 'yellow' },
          { label: 'Redeemable', value: `${redeemable}x`, icon: Gift, color: 'green' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={card}>
            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
              color === 'pink' ? 'bg-pink-100 text-pink-600' :
              color === 'purple' ? 'bg-purple-100 text-purple-600' :
              color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
              'bg-green-100 text-green-600'
            }`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
          </div>
        ))}
      </div>

      {/* UPCOMING APPOINTMENTS */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Upcoming Appointments</h2>
          <Link to="/account/appointments" className="text-pink-600 text-sm hover:underline">View All</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <Calendar size={36} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming appointments</p>
            <Link to="/account/appointments/new" className="mt-3 inline-block text-pink-600 text-sm font-semibold hover:underline">Book One Now</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map(b => (
              <div key={b.id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div>
                  <p className="font-semibold text-sm">{b.serviceName}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{b.date} at {b.time} · {b.stylistName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${statusColors[b.status]}`}>
                    <StatusIcon status={b.status} /> {b.status}
                  </span>
                  <button onClick={() => cancelBooking(b.id)}
                    className={`text-xs px-3 py-1 rounded-lg border transition-colors ${darkMode ? 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'}`}>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT ORDERS */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Recent Orders</h2>
          <Link to="/account/orders" className="text-pink-600 text-sm hover:underline">View All</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <ShoppingBag size={36} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No orders yet</p>
            <Link to="/account/orders/new" className="mt-3 inline-block text-pink-600 text-sm font-semibold hover:underline">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map(o => (
              <div key={o.id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div>
                  <p className="font-semibold text-sm">Order #{o.id}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{o.items.length} item(s) · {o.total.toLocaleString()} UGX</p>
                </div>
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${statusColors[o.status]}`}>
                  <StatusIcon status={o.status} /> {o.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOKENS */}
      <div className={`${card} bg-gradient-to-br from-yellow-400 to-yellow-500 border-0 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1"><Gift size={20} /><span className="font-bold text-lg">Loyalty Tokens</span></div>
            <div className="text-4xl font-bold">{currentUser.tokens}</div>
            <div className="text-yellow-100 text-sm mt-1">points earned</div>
            <p className="text-yellow-100 text-xs mt-3">100 pts = 10,000 UGX discount · Earn 1 pt per 1,000 UGX spent</p>
          </div>
          <Link to="/account/tokens" className="px-4 py-2 bg-white text-yellow-600 rounded-xl text-sm font-semibold hover:bg-yellow-50 transition-colors flex-shrink-0">
            Redeem
          </Link>
        </div>
      </div>
    </div>
  );
}
