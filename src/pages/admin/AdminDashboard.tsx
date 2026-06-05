import { useApp } from '../../context/AppContext';
import { Calendar, ShoppingBag, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
};

export default function AdminDashboard() {
  const { bookings, orders, allUsers, reviews, darkMode } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === today || b.status === 'pending');
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const customers = allUsers.filter(u => u.role === 'customer');
  const pendingReviews = reviews.filter(r => !r.approved);

  const card = `rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back! Here's what's happening at BabyJat today.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Bookings", value: todayBookings.length, icon: Calendar, color: 'pink', to: '/admin/bookings' },
          { label: 'Pending Orders', value: pendingOrders.length, icon: ShoppingBag, color: 'orange', to: '/admin/orders' },
          { label: 'Total Customers', value: customers.length, icon: Users, color: 'blue', to: '/admin/customers' },
          { label: 'Pending Reviews', value: pendingReviews.length, icon: AlertCircle, color: 'yellow', to: '/admin/testimonials' },
        ].map(({ label, value, icon: Icon, color, to }) => (
          <Link to={to} key={label} className={`${card} hover:shadow-md transition-shadow`}>
            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
              color === 'pink' ? 'bg-pink-100 text-pink-600' :
              color === 'orange' ? 'bg-orange-100 text-orange-600' :
              color === 'blue' ? 'bg-blue-100 text-blue-600' :
              'bg-yellow-100 text-yellow-600'
            }`}>
              <Icon size={18} />
            </div>
            <div className="text-3xl font-bold">{value}</div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
          </Link>
        ))}
      </div>

      {/* REVENUE QUICK VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Bookings Revenue', value: bookings.filter(b => b.status === 'completed').reduce((a, b) => a + b.servicePrice, 0) },
          { label: 'Total Orders Revenue', value: orders.filter(o => o.status === 'delivered').reduce((a, o) => a + o.total, 0) },
          { label: 'Tokens Issued', value: allUsers.reduce((a, u) => a + u.tokens, 0) + ' pts' },
        ].map(({ label, value }) => (
          <div key={label} className={`${card} flex items-center gap-4`}>
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="text-xl font-bold">{typeof value === 'number' ? value.toLocaleString() + ' UGX' : value}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg flex items-center gap-2"><Calendar size={18} className="text-pink-600" /> Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-pink-600 text-sm hover:underline">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                {['Customer', 'Service', 'Date', 'Time', 'Stylist', 'Status'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(b => (
                <tr key={b.id} className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                  <td className="py-3 pr-4">
                    <p className="font-medium">{b.userName}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{b.userPhone}</p>
                  </td>
                  <td className="py-3 pr-4">{b.serviceName}</td>
                  <td className="py-3 pr-4">{b.date}</td>
                  <td className="py-3 pr-4">{b.time}</td>
                  <td className="py-3 pr-4">{b.stylistName}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PENDING ORDERS */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg flex items-center gap-2"><ShoppingBag size={18} className="text-pink-600" /> Pending Orders</h2>
          <Link to="/admin/orders" className="text-pink-600 text-sm hover:underline">View All →</Link>
        </div>
        {pendingOrders.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <CheckCircle size={32} className="mx-auto mb-2 text-green-400" />
            <p className="text-sm">All orders are processed!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingOrders.map(o => (
              <div key={o.id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div>
                  <p className="font-medium text-sm">Order #{o.id} – {o.userName}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{o.items.length} item(s) · {o.total.toLocaleString()} UGX · {o.paymentMethod}</p>
                </div>
                <Link to="/admin/orders" className="text-xs px-3 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Process</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Manage Bookings', to: '/admin/bookings', icon: Calendar },
          { label: 'Manage Products', to: '/admin/products', icon: ShoppingBag },
          { label: 'Approve Reviews', to: '/admin/testimonials', icon: AlertCircle },
          { label: 'View Customers', to: '/admin/customers', icon: Users },
        ].map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center text-sm font-medium transition-all hover:border-pink-400 hover:-translate-y-1 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
            <Icon size={22} className="text-pink-600" /> {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
