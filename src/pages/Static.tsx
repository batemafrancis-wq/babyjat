import { useApp } from '../context/AppContext';

export function Privacy() {
  const { darkMode } = useApp();
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Privacy Policy</h1>
      </div>
      <div className={`max-w-3xl mx-auto px-4 py-16 prose ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="text-sm mb-4 text-gray-500">Last updated: June 2025</p>
        <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
        <p className="mb-4">We collect your name, phone number, email (optional), and booking/order history to provide our services.</p>
        <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">Your information is used to process bookings, orders, loyalty tokens, and to contact you regarding your appointments via WhatsApp or SMS.</p>
        <h2 className="text-xl font-bold mb-3">3. Data Protection</h2>
        <p className="mb-4">We comply with Uganda's Data Protection and Privacy Act 2019. Your data is stored securely and never sold to third parties.</p>
        <h2 className="text-xl font-bold mb-3">4. Your Rights</h2>
        <p className="mb-4">You may request access, correction, or deletion of your personal data at any time by contacting us via WhatsApp or email.</p>
        <h2 className="text-xl font-bold mb-3">5. Contact</h2>
        <p>For any privacy concerns, contact us at +256 700 000 000 or visit our salon at Plot 12 Nakawa Road, Kampala.</p>
      </div>
    </div>
  );
}

export function Terms() {
  const { darkMode } = useApp();
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Terms of Service</h1>
      </div>
      <div className={`max-w-3xl mx-auto px-4 py-16 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="text-sm mb-4 text-gray-500">Last updated: June 2025</p>
        <h2 className="text-xl font-bold mb-3">1. Appointments</h2>
        <p className="mb-4">Bookings are subject to availability. Please arrive on time. Cancellations must be made at least 2 hours before your appointment.</p>
        <h2 className="text-xl font-bold mb-3">2. Orders</h2>
        <p className="mb-4">Orders for hair accessories are processed within 1–2 business days. Delivery within Kampala is available.</p>
        <h2 className="text-xl font-bold mb-3">3. Loyalty Tokens</h2>
        <p className="mb-4">Tokens have no cash value, are non-transferable, and expire 12 months after being earned.</p>
        <h2 className="text-xl font-bold mb-3">4. Refunds</h2>
        <p className="mb-4">Refunds are handled on a case-by-case basis. Contact us within 24 hours if you're not satisfied with our service.</p>
        <h2 className="text-xl font-bold mb-3">5. Changes</h2>
        <p>BabyJat reserves the right to update these terms at any time. Continued use of our services constitutes acceptance.</p>
      </div>
    </div>
  );
}
