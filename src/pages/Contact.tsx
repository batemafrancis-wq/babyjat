import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { darkMode } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const card = `p-6 rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Contact & Location</h1>
        <p className="text-pink-200 text-lg">We'd love to hear from you</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="space-y-6">
          <div className={card}>
            <h2 className="text-xl font-bold mb-6">Find Us</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0"><MapPin size={18} /></div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plot 12 Nakawa Road, Kampala, Uganda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0"><Phone size={18} /></div>
                <div>
                  <p className="font-semibold">Phone / WhatsApp</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+256 700 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0"><Clock size={18} /></div>
                <div>
                  <p className="font-semibold">Opening Hours</p>
                  <div className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>Monday – Friday: 8:00 AM – 7:00 PM</p>
                    <p>Saturday: 8:00 AM – 6:00 PM</p>
                    <p>Sunday: 10:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className={`${card} p-0 overflow-hidden`}>
            <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={40} className="text-pink-500 mx-auto mb-2" />
                <p className="text-pink-700 font-semibold">BabyJat Beauty Parlor</p>
                <p className="text-pink-500 text-sm">Plot 12 Nakawa Road, Kampala</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                  className="mt-3 inline-block px-4 py-2 bg-pink-600 text-white text-xs rounded-lg hover:bg-pink-700 transition-colors">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          <a href="https://wa.me/256700000000?text=Hello%20BabyJat!"
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-3 py-4 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-colors w-full">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* RIGHT: FORM */}
        <div className={card}>
          <h2 className="text-xl font-bold mb-6">Send a Message</h2>
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '0700 000 000' },
                { key: 'email', label: 'Email (optional)', type: 'email', placeholder: 'your@email.com' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
                  <input type={type} required={key !== 'email'} value={form[key as keyof typeof form]} placeholder={placeholder}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`} />
                </div>
              ))}
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea rows={5} required value={form.message} placeholder="How can we help you?"
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all resize-none ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`} />
              </div>
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2">
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
