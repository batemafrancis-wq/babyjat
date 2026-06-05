import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Scissors, AlertCircle } from 'lucide-react';

export function SignIn() {
  const { login, darkMode } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ phone: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(form.phone.trim(), form.password);
    setLoading(false);
    if (ok) {
      navigate('/account');
    } else {
      setError('Invalid phone number or password. Please try again.');
    }
  };

  const bg = darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-pink-50 to-white';
  const card = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-xl';

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-16 ${bg}`}>
      <div className={`w-full max-w-md rounded-3xl border p-8 ${card}`}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center shadow-md">
              <Scissors size={20} className="text-white rotate-45" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Welcome Back</h1>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to your BabyJat account</p>
        </div>

        {/* Demo hint */}
        <div className={`p-3 rounded-xl text-xs mb-6 ${darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
          <strong> Contact Developer </strong> 
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-5">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
            <input type="tel" required value={form.phone} placeholder="0700 000 000"
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required value={form.password} placeholder="••••••••"
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
              <button type="button" onClick={() => setShowPw(s => !s)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Sign In
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-600 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export function SignUp() {
  const { signup, darkMode } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', password: '', confirmPw: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPw) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = signup(form.name.trim(), form.phone.trim(), form.password);
    setLoading(false);
    if (ok) navigate('/account');
    else setError('This phone number is already registered. Please sign in.');
  };

  const bg = darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-pink-50 to-white';
  const card = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-xl';

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-16 ${bg}`}>
      <div className={`w-full max-w-md rounded-3xl border p-8 ${card}`}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center shadow-md">
              <Scissors size={20} className="text-white rotate-45" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Create Account</h1>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Join BabyJat and start earning loyalty tokens</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm mb-5">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
            { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '0700 000 000' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
              <input type={type} required value={form[key as keyof typeof form]} placeholder={placeholder}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
            </div>
          ))}
          {[
            { key: 'password', label: 'Password', placeholder: '••••••••' },
            { key: 'confirmPw', label: 'Confirm Password', placeholder: '••••••••' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={form[key as keyof typeof form]} placeholder={placeholder}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Create Account
          </button>
        </form>
        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <Link to="/signin" className="text-pink-600 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
