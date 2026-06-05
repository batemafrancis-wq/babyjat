import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, Zap, Star, TrendingUp, CheckCircle } from 'lucide-react';

export default function Tokens() {
  const { currentUser, darkMode, adjustTokens } = useApp();
  const [redeemed, setRedeemed] = useState(false);

  if (!currentUser) return null;

  const redeemable = Math.floor(currentUser.tokens / 100);
  const discount = redeemable * 10000;

  const handleRedeem = () => {
    if (redeemable <= 0) return;
    adjustTokens(currentUser.id, -(redeemable * 100));
    setRedeemed(true);
    setTimeout(() => setRedeemed(false), 4000);
  };

  const card = `rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Loyalty Tokens</h1>

      {/* BALANCE CARD */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Gift size={24} />
          </div>
          <div>
            <p className="text-yellow-100 text-sm font-medium">Current Balance</p>
            <p className="text-4xl font-bold">{currentUser.tokens} pts</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-yellow-100 text-xs">Redeemable</p>
            <p className="text-2xl font-bold">{redeemable}x</p>
            <p className="text-yellow-100 text-xs">discount vouchers</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-yellow-100 text-xs">Total Value</p>
            <p className="text-2xl font-bold">{discount.toLocaleString()}</p>
            <p className="text-yellow-100 text-xs">UGX off your next bill</p>
          </div>
        </div>
      </div>

      {/* REDEEM */}
      <div className={card}>
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> Redeem Tokens</h2>
        {redeemed ? (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl text-green-700">
            <CheckCircle size={20} />
            <div>
              <p className="font-semibold">Tokens Redeemed!</p>
              <p className="text-sm">Show this to your stylist for {discount.toLocaleString()} UGX off your bill.</p>
            </div>
          </div>
        ) : (
          <>
            <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-gray-800' : 'bg-yellow-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                You can redeem <strong>{redeemable} discount vouchers</strong> for a total of <strong>{discount.toLocaleString()} UGX</strong> off your next service or order.
              </p>
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>1 voucher = 100 tokens = 10,000 UGX discount</p>
            </div>
            <button disabled={redeemable === 0} onClick={handleRedeem}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all disabled:opacity-40 shadow-sm">
              Redeem {redeemable > 0 ? `${redeemable * 100} tokens` : '(need 100+ pts)'}
            </button>
          </>
        )}
      </div>

      {/* HOW TO EARN */}
      <div className={card}>
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-pink-500" /> How to Earn Tokens</h2>
        <div className="space-y-3">
          {[
            { icon: Star, title: 'Book a Service', desc: 'Earn 1 token for every 1,000 UGX spent on hair services', color: 'pink' },
            { icon: Gift, title: 'Place an Order', desc: 'Earn 1 token for every 1,000 UGX spent on hair accessories', color: 'purple' },
            { icon: Zap, title: 'Leave a Review', desc: 'Earn 20 bonus tokens for every approved review', color: 'yellow' },
            { icon: TrendingUp, title: 'Refer a Friend', desc: 'Earn 50 tokens when a friend signs up and books a service', color: 'green' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                color === 'pink' ? 'bg-pink-100 text-pink-600' :
                color === 'purple' ? 'bg-purple-100 text-purple-600' :
                color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TERMS */}
      <div className={`${card} text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <p className="font-semibold mb-1">Terms & Conditions</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Tokens have no cash value and cannot be transferred.</li>
          <li>Tokens expire 12 months after the date they were earned.</li>
          <li>Minimum 100 tokens required to redeem one voucher.</li>
          <li>Vouchers must be presented at time of service/order.</li>
          <li>BabyJat reserves the right to modify token earning rules with notice.</li>
        </ul>
      </div>
    </div>
  );
}
