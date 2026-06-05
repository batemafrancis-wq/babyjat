import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Save, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser, darkMode, updateProfile, logout } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: currentUser?.name || '', phone: currentUser?.phone || '', email: currentUser?.email || '' });
  const [saved, setSaved] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState({ rating: 5, text: '' });
  const { addReview } = useApp();

  if (!currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, email: form.email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReview = () => {
    addReview({
      userId: currentUser.id,
      userName: currentUser.name,
      rating: review.rating,
      text: review.text,
      approved: false,
      featured: false,
    });
    setShowReview(false);
    setReview({ rating: 5, text: '' });
  };

  const card = `rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {/* AVATAR */}
      <div className={card}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.phone}</p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-pink-100 text-pink-700'}`}>
              {currentUser.role === 'admin' ? '⚙️ Admin' : '👑 Customer'}
            </span>
          </div>
        </div>

        {saved && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm mb-4">
            <CheckCircle size={15} /> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="flex items-center gap-1"><User size={13} /> Full Name</span>
            </label>
            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="flex items-center gap-1"><Phone size={13} /> Phone Number</span>
            </label>
            <input type="tel" disabled value={form.phone}
              className={`w-full px-4 py-3 rounded-xl border text-sm opacity-60 cursor-not-allowed ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'border-gray-200 bg-gray-50'}`} />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Phone number cannot be changed. Contact support if needed.</p>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email (optional)</label>
            <input type="email" value={form.email} placeholder="your@email.com" onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
          </div>
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors">
            <Save size={15} /> Save Changes
          </button>
        </form>
      </div>

      {/* ACCOUNT STATS */}
      <div className={card}>
        <h2 className="font-bold mb-4">Account Details</h2>
        <div className="space-y-3">
          {[
            ['Member Since', currentUser.createdAt],
            ['Token Balance', `${currentUser.tokens} points`],
            ['Account Type', currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)],
          ].map(([label, value]) => (
            <div key={label} className={`flex justify-between py-2 border-b text-sm ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LEAVE A REVIEW */}
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold flex items-center gap-2"><Star size={18} className="text-yellow-500" /> Leave a Review</h2>
          <button onClick={() => setShowReview(o => !o)} className="text-pink-600 text-sm hover:underline">
            {showReview ? 'Cancel' : 'Write Review'}
          </button>
        </div>
        {showReview && (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setReview(r => ({ ...r, rating: n }))}
                    className={`w-9 h-9 rounded-full text-lg transition-colors ${review.rating >= n ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Review</label>
              <textarea rows={4} value={review.text} placeholder="Share your experience at BabyJat..."
                onChange={e => setReview(r => ({ ...r, text: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 resize-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
            </div>
            <button disabled={!review.text.trim()} onClick={handleReview}
              className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors disabled:opacity-40">
              Submit Review
            </button>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Reviews are reviewed by admin before being published publicly.</p>
          </div>
        )}
      </div>

      {/* SIGN OUT */}
      <div className={card}>
        <h2 className="font-bold mb-3 text-red-500">Danger Zone</h2>
        <button onClick={() => { logout(); navigate('/'); }}
          className="px-6 py-3 border-2 border-red-300 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors text-sm">
          Sign Out of Account
        </button>
      </div>
    </div>
  );
}
