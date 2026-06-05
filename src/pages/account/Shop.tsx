import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { products } from '../../data/mockData';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle, Package } from 'lucide-react';

export function ProductShop() {
  const { darkMode, cart, addToCart, removeFromCart, updateQty, clearCart, currentUser, addOrder } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderForm, setOrderForm] = useState({ address: '', paymentMethod: 'Cash on Delivery' });
  const [ordered, setOrdered] = useState(false);

  if (!currentUser) return null;

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
  const cartTotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const handleAddToCart = (p: typeof products[0]) => {
    addToCart({ productId: p.id, productName: p.name, price: p.price, qty: 1, image: p.image });
  };

  const handleOrder = () => {
    if (!orderForm.address.trim()) return;
    addOrder({
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      items: cart.map(c => ({ productId: c.productId, productName: c.productName, price: c.price, qty: c.qty })),
      total: cartTotal,
      status: 'pending',
      paymentMethod: orderForm.paymentMethod,
      address: orderForm.address,
    });
    clearCart();
    setOrdered(true);
    setCheckingOut(false);
  };

  const card = `rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  if (ordered) {
    return (
      <div className={`${card} p-12 text-center`}>
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your order has been received. We'll contact you on {currentUser.phone} to arrange payment and delivery.
        </p>
        <Link to="/account/orders" className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors">
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hair Accessories Shop</h1>
        {cartCount > 0 && (
          <button onClick={() => setCheckingOut(true)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 transition-colors">
            <ShoppingCart size={15} /> Cart ({cartCount}) · {cartTotal.toLocaleString()} UGX
          </button>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {checkingOut && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <h2 className="font-bold text-xl mb-4">Checkout</h2>
            <div className={`space-y-2 mb-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {cart.map(item => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.productName} x{item.qty}</span>
                  <span className="font-medium">{(item.price * item.qty).toLocaleString()} UGX</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-pink-600">{cartTotal.toLocaleString()} UGX</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Delivery Address</label>
                <input type="text" required value={orderForm.address} placeholder="Your address in Kampala"
                  onChange={e => setOrderForm(f => ({ ...f, address: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payment Method</label>
                <select value={orderForm.paymentMethod} onChange={e => setOrderForm(f => ({ ...f, paymentMethod: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}>
                  <option>Cash on Delivery</option>
                  <option>MTN Mobile Money</option>
                  <option>Airtel Money</option>
                  <option>WhatsApp Order</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setCheckingOut(false)} className={`flex-1 py-3 rounded-xl border text-sm font-medium ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200'}`}>Cancel</button>
              <button onClick={handleOrder} disabled={!orderForm.address.trim()}
                className="flex-1 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors disabled:opacity-40">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORIES */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-pink-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => {
          const inCart = cart.find(c => c.productId === p.id);
          return (
            <div key={p.id} className={`${card} overflow-hidden`}>
              <div className="aspect-video overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {p.stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <p className={`text-xs mb-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pink-600">{p.price.toLocaleString()} UGX</span>
                  {inCart ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(p.id, inCart.qty - 1)} className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200"><Minus size={12} /></button>
                      <span className="w-6 text-center text-sm font-bold">{inCart.qty}</span>
                      <button onClick={() => updateQty(p.id, inCart.qty + 1)} className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200"><Plus size={12} /></button>
                      <button onClick={() => removeFromCart(p.id)} className="w-7 h-7 rounded-lg bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 ml-1"><Trash2 size={12} /></button>
                    </div>
                  ) : (
                    <button disabled={!p.stock} onClick={() => handleAddToCart(p)}
                      className="flex items-center gap-1 px-3 py-2 bg-pink-600 text-white rounded-lg text-xs font-semibold hover:bg-pink-700 transition-colors disabled:opacity-40">
                      <Plus size={12} /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CART SIDEBAR SUMMARY */}
      {cart.length > 0 && (
        <div className={`${card} p-6`}>
          <h2 className="font-bold mb-4 flex items-center gap-2"><ShoppingCart size={18} /> Cart Summary</h2>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.productId} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div>
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.price.toLocaleString()} × {item.qty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{(item.price * item.qty).toLocaleString()} UGX</span>
                  <button onClick={() => removeFromCart(item.productId)} className="text-red-400 hover:text-red-600"><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
            <div className={`flex justify-between pt-3 border-t font-bold ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <span>Total</span>
              <span className="text-pink-600">{cartTotal.toLocaleString()} UGX</span>
            </div>
          </div>
          <button onClick={() => setCheckingOut(true)}
            className="w-full mt-4 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export function OrdersList() {
  const { currentUser, orders, darkMode } = useApp();
  if (!currentUser) return null;
  const myOrders = orders.filter(o => o.userId === currentUser.id);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const card = `rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Link to="/account/orders/new" className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 transition-colors">
          <ShoppingCart size={15} /> Shop
        </Link>
      </div>
      {myOrders.length === 0 ? (
        <div className={`${card} p-12 text-center`}>
          <Package size={48} className={`mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <p className={darkMode ? 'text-gray-500' : 'text-gray-400'}>No orders yet</p>
          <Link to="/account/orders/new" className="mt-3 inline-block text-pink-600 text-sm font-semibold hover:underline">Browse Products</Link>
        </div>
      ) : (
        <div className={card}>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {myOrders.map(o => (
              <div key={o.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">Order #{o.id}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{o.createdAt} · {o.paymentMethod}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[o.status]}`}>{o.status}</span>
                </div>
                <div className={`space-y-1 p-3 rounded-xl text-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  {o.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.productName} x{item.qty}</span>
                      <span className="font-medium">{(item.price * item.qty).toLocaleString()} UGX</span>
                    </div>
                  ))}
                  <div className={`pt-2 border-t flex justify-between font-bold ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span>Total</span>
                    <span className="text-pink-600">{o.total.toLocaleString()} UGX</span>
                  </div>
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>📍 {o.address}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
