import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { services as initialServices, products as initialProducts, galleryImages as initialGallery } from '../../data/mockData';
import { CheckCircle, XCircle, Star, Trash2, Plus, Search, Calendar, Package, Gift } from 'lucide-react';

// ── SHARED ─────────────────────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  processing: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
};

function useCard() {
  const { darkMode } = useApp();
  return `rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;
}

// ── BOOKINGS ──────────────────────────────────────────────────────────────────
export function AdminBookings() {
  const { bookings, updateBookingStatus, darkMode } = useApp();
  const card = useCard();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Bookings</h1>
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-pink-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            {f} {f === 'all' ? `(${bookings.length})` : `(${bookings.filter(b => b.status === f).length})`}
          </button>
        ))}
      </div>
      <div className={card}>
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400"><Calendar size={40} className="mx-auto mb-3 opacity-30" /><p>No bookings found.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${darkMode ? 'border-gray-800' : 'border-gray-100'} border-b`}>
                  {['Customer', 'Service', 'Date/Time', 'Stylist', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className={`text-left py-3 px-4 font-semibold text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-50'}`}>
                    <td className="py-3 px-4">
                      <p className="font-medium">{b.userName}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{b.userPhone}</p>
                    </td>
                    <td className="py-3 px-4">{b.serviceName}</td>
                    <td className="py-3 px-4">{b.date}<br /><span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{b.time}</span></td>
                    <td className="py-3 px-4">{b.stylistName}</td>
                    <td className="py-3 px-4">{b.servicePrice.toLocaleString()} UGX</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {b.status === 'pending' && (
                          <button onClick={() => updateBookingStatus(b.id, 'confirmed')}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Confirm</button>
                        )}
                        {b.status === 'confirmed' && (
                          <button onClick={() => updateBookingStatus(b.id, 'completed')}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Complete</button>
                        )}
                        {b.status !== 'cancelled' && b.status !== 'completed' && (
                          <button onClick={() => updateBookingStatus(b.id, 'cancelled')}
                            className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ORDERS ────────────────────────────────────────────────────────────────────
export function AdminOrders() {
  const { orders, updateOrderStatus, darkMode } = useApp();
  const card = useCard();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      <div className={card}>
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-400"><Package size={40} className="mx-auto mb-3 opacity-30" /><p>No orders yet.</p></div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders.map(o => (
              <div key={o.id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">Order #{o.id}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{o.userName} · {o.userPhone}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{o.createdAt} · {o.paymentMethod} · {o.address}</p>
                    <div className={`mt-2 space-y-1 p-3 rounded-xl text-xs ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      {o.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{item.productName} x{item.qty}</span>
                          <span>{(item.price * item.qty).toLocaleString()} UGX</span>
                        </div>
                      ))}
                      <div className={`pt-1 border-t font-bold flex justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <span>Total</span><span className="text-pink-600">{o.total.toLocaleString()} UGX</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[o.status]}`}>{o.status}</span>
                    <div className="flex gap-2">
                      {o.status === 'pending' && (
                        <button onClick={() => updateOrderStatus(o.id, 'processing')}
                          className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Process</button>
                      )}
                      {o.status === 'processing' && (
                        <button onClick={() => updateOrderStatus(o.id, 'delivered')}
                          className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Mark Delivered</button>
                      )}
                      {o.status !== 'cancelled' && o.status !== 'delivered' && (
                        <button onClick={() => updateOrderStatus(o.id, 'cancelled')}
                          className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
export function AdminProducts() {
  const { darkMode } = useApp();
  const card = useCard();
  const [prods, setProds] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Accessories', image: '', stock: true });

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    setProds(p => [...p, { id: 'p' + Date.now(), name: form.name, description: form.description, price: Number(form.price), category: form.category, image: form.image || 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400', stock: form.stock }]);
    setForm({ name: '', description: '', price: '', category: 'Accessories', image: '', stock: true });
    setShowForm(false);
  };

  const handleDelete = (id: string) => setProds(p => p.filter(x => x.id !== id));
  const toggleStock = (id: string) => setProds(p => p.map(x => x.id === id ? { ...x, stock: !x.stock } : x));

  const inp = `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200'}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button onClick={() => setShowForm(o => !o)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 transition-colors">
          <Plus size={15} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className={`${card} p-6`}>
          <h2 className="font-bold mb-4">New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name *</label><input className={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Price (UGX) *</label><input type="number" className={inp} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="15000" /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Category</label><select className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option>Accessories</option><option>Hair</option><option>Products</option></select></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Image URL</label><input className={inp} value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." /></div>
            <div className="sm:col-span-2"><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description</label><textarea rows={2} className={inp + ' resize-none'} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description" /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="stock" checked={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.checked }))} />
              <label htmlFor="stock" className="text-sm">In Stock</label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="px-5 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700">Add Product</button>
            <button onClick={() => setShowForm(false)} className={`px-5 py-2 rounded-xl text-sm border ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {prods.map(p => (
          <div key={p.id} className={`${card} overflow-hidden`}>
            <div className="aspect-video overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">{p.name}</h3>
                <button onClick={() => toggleStock(p.id)} className={`text-xs px-2 py-0.5 rounded-full ${p.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{p.stock ? 'In Stock' : 'Out'}</button>
              </div>
              <p className="text-pink-600 font-bold text-sm">{p.price.toLocaleString()} UGX</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.description}</p>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{p.category}</span>
                <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
export function AdminServices() {
  const { darkMode } = useApp();
  const card = useCard();
  const [svcs, setSvcs] = useState(initialServices);

  const toggleActive = (id: string) => setSvcs(s => s.map(x => x.id === id ? { ...x, active: !x.active } : x));
  const updatePrice = (id: string, price: number) => setSvcs(s => s.map(x => x.id === id ? { ...x, price } : x));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Services & Prices</h1>
      <div className={card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                {['Service', 'Category', 'Duration', 'Price (UGX)', 'Active'].map(h => (
                  <th key={h} className={`text-left py-3 px-4 font-semibold text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {svcs.map(s => (
                <tr key={s.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-50'}`}>
                  <td className="py-3 px-4">
                    <p className="font-medium">{s.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.description}</p>
                  </td>
                  <td className="py-3 px-4">{s.category}</td>
                  <td className="py-3 px-4">{s.duration} min</td>
                  <td className="py-3 px-4">
                    <input type="number" value={s.price} onChange={e => updatePrice(s.id, Number(e.target.value))}
                      className={`w-28 px-2 py-1 rounded-lg border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`} />
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleActive(s.id)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${s.active ? 'bg-pink-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${s.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
export function AdminGallery() {
  const { darkMode } = useApp();
  const card = useCard();
  const [gallery, setGallery] = useState(initialGallery);
  const [form, setForm] = useState({ url: '', caption: '', category: 'Braiding' });
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (!form.url) return;
    setGallery(g => [...g, { id: 'g' + Date.now(), ...form }]);
    setForm({ url: '', caption: '', category: 'Braiding' });
    setShowForm(false);
  };

  const inp = `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200'}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Gallery</h1>
        <button onClick={() => setShowForm(o => !o)} className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700">
          <Plus size={15} /> Add Image
        </button>
      </div>
      {showForm && (
        <div className={`${card} p-6`}>
          <h2 className="font-bold mb-4">Add Gallery Image</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2"><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Image URL *</label><input className={inp} value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Category</label><select className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{['Braiding', 'Styling', 'Colouring', 'Salon', 'Accessories'].map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Caption</label><input className={inp} value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} placeholder="Image caption" /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="px-5 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold">Add</button>
            <button onClick={() => setShowForm(false)} className={`px-5 py-2 rounded-xl text-sm border ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {gallery.map(img => (
          <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden">
            <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <p className="text-white text-xs font-medium text-center">{img.caption}</p>
              <span className="text-pink-300 text-xs">{img.category}</span>
              <button onClick={() => setGallery(g => g.filter(x => x.id !== img.id))}
                className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
export function AdminTestimonials() {
  const { reviews, updateReview, darkMode } = useApp();
  const card = useCard();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(r => (
          <div key={r.id} className={`${card} p-5`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold">{r.userName}</p>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className={`text-xs px-2 py-0.5 rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {r.approved ? 'Approved' : 'Pending'}
                </span>
                {r.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">Featured</span>}
              </div>
            </div>
            <p className={`text-sm italic mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{r.text}"</p>
            <div className="flex gap-2 flex-wrap">
              {!r.approved && (
                <button onClick={() => updateReview(r.id, { approved: true })}
                  className="flex items-center gap-1 text-xs px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  <CheckCircle size={12} /> Approve
                </button>
              )}
              {r.approved && (
                <button onClick={() => updateReview(r.id, { featured: !r.featured })}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-lg ${r.featured ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <Star size={12} /> {r.featured ? 'Unfeature' : 'Feature'}
                </button>
              )}
              <button onClick={() => updateReview(r.id, { approved: false })}
                className="flex items-center gap-1 text-xs px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                <XCircle size={12} /> {r.approved ? 'Unapprove' : 'Reject'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CUSTOMERS ─────────────────────────────────────────────────────────────────
export function AdminCustomers() {
  const { allUsers, bookings, orders, darkMode } = useApp();
  const card = useCard();
  const [search, setSearch] = useState('');

  const customers = allUsers.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Customer List</h1>
      <div className="relative">
        <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        <input type="text" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500' : 'border-gray-200'}`} />
      </div>
      <div className={card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                {['Customer', 'Phone', 'Role', 'Tokens', 'Bookings', 'Orders', 'Joined'].map(h => (
                  <th key={h} className={`text-left py-3 px-4 font-semibold text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map(u => (
                <tr key={u.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-50'}`}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.name.charAt(0)}</div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{u.phone}</td>
                  <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-pink-100 text-pink-700'}`}>{u.role}</span></td>
                  <td className="py-3 px-4">{u.tokens} pts</td>
                  <td className="py-3 px-4">{bookings.filter(b => b.userId === u.id).length}</td>
                  <td className="py-3 px-4">{orders.filter(o => o.userId === u.id).length}</td>
                  <td className="py-3 px-4 text-xs">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TOKENS ────────────────────────────────────────────────────────────────────
export function AdminTokens() {
  const { allUsers, adjustTokens, darkMode } = useApp();
  const card = useCard();
  const [adjustId, setAdjustId] = useState('');
  const [delta, setDelta] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Token Management</h1>

      {/* EARNING RULES */}
      <div className={`${card} p-6`}>
        <h2 className="font-bold mb-4 flex items-center gap-2"><Gift size={18} className="text-yellow-500" /> Earning Rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Service Booking', '1 token per 1,000 UGX spent'],
            ['Product Order', '1 token per 1,000 UGX spent'],
            ['Approved Review', '20 bonus tokens'],
            ['Referral', '50 tokens per referred customer'],
          ].map(([rule, desc]) => (
            <div key={rule} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className="font-semibold text-sm">{rule}</p>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
            </div>
          ))}
        </div>
        <p className={`text-xs mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Redemption: 100 tokens = 10,000 UGX discount</p>
      </div>

      {/* ADJUST TOKENS */}
      <div className={`${card} p-6`}>
        <h2 className="font-bold mb-4">Manually Adjust Tokens</h2>
        <div className="flex flex-wrap gap-3">
          <select value={adjustId} onChange={e => setAdjustId(e.target.value)}
            className={`flex-1 min-w-40 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}>
            <option value="">Select customer...</option>
            {allUsers.filter(u => u.role === 'customer').map(u => <option key={u.id} value={u.id}>{u.name} ({u.tokens} pts)</option>)}
          </select>
          <input type="number" placeholder="+50 or -30" value={delta} onChange={e => setDelta(e.target.value)}
            className={`w-32 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200'}`} />
          <button disabled={!adjustId || !delta} onClick={() => { adjustTokens(adjustId, Number(delta)); setDelta(''); setAdjustId(''); }}
            className="px-5 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 disabled:opacity-40">Adjust</button>
        </div>
      </div>

      {/* BALANCES */}
      <div className={card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                {['Customer', 'Phone', 'Token Balance', 'Redeemable Value'].map(h => (
                  <th key={h} className={`text-left py-3 px-4 font-semibold text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allUsers.filter(u => u.role === 'customer').map(u => (
                <tr key={u.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-50'}`}>
                  <td className="py-3 px-4 font-medium">{u.name}</td>
                  <td className="py-3 px-4">{u.phone}</td>
                  <td className="py-3 px-4"><span className="font-bold text-yellow-500">{u.tokens} pts</span></td>
                  <td className="py-3 px-4">{(Math.floor(u.tokens / 100) * 10000).toLocaleString()} UGX</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────
export function AdminSettings() {
  const { darkMode } = useApp();
  const card = useCard();
  const [settings, setSettings] = useState({
    parlourName: 'BabyJat Beauty Parlor & Hair Accessories',
    motto: 'Where Beauty Meets Elegance',
    phone: '+256 700 000 000',
    address: 'Plot 12 Nakawa Road, Kampala, Uganda',
    hoursWeekday: '8:00 AM – 7:00 PM',
    hoursSat: '8:00 AM – 6:00 PM',
    hoursSun: '10:00 AM – 5:00 PM',
    intro: 'Your premier destination for beautiful hair in Kampala, Uganda. We specialise in braiding, treatments, styling, and premium hair accessories.',
  });
  const [saved, setSaved] = useState(false);

  const inp = `w-full px-3 py-2 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Website Settings</h1>
      {saved && <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"><CheckCircle size={15} /> Settings saved successfully!</div>}
      <form onSubmit={handleSave} className="space-y-6">
        <div className={`${card} p-6`}>
          <h2 className="font-bold mb-4">Business Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Parlour Name</label><input className={inp} value={settings.parlourName} onChange={e => setSettings(s => ({ ...s, parlourName: e.target.value }))} /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Motto / Tagline</label><input className={inp} value={settings.motto} onChange={e => setSettings(s => ({ ...s, motto: e.target.value }))} /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone / WhatsApp</label><input className={inp} value={settings.phone} onChange={e => setSettings(s => ({ ...s, phone: e.target.value }))} /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Address</label><input className={inp} value={settings.address} onChange={e => setSettings(s => ({ ...s, address: e.target.value }))} /></div>
            <div className="sm:col-span-2"><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Home Page Intro Text</label><textarea rows={3} className={inp + ' resize-none'} value={settings.intro} onChange={e => setSettings(s => ({ ...s, intro: e.target.value }))} /></div>
          </div>
        </div>
        <div className={`${card} p-6`}>
          <h2 className="font-bold mb-4">Opening Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mon–Fri</label><input className={inp} value={settings.hoursWeekday} onChange={e => setSettings(s => ({ ...s, hoursWeekday: e.target.value }))} /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Saturday</label><input className={inp} value={settings.hoursSat} onChange={e => setSettings(s => ({ ...s, hoursSat: e.target.value }))} /></div>
            <div><label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sunday</label><input className={inp} value={settings.hoursSun} onChange={e => setSettings(s => ({ ...s, hoursSun: e.target.value }))} /></div>
          </div>
        </div>
        <button type="submit" className="px-8 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors">Save Settings</button>
      </form>
    </div>
  );
}
