import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Calendar, Plus, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { services, stylists, timeSlots } from '../../data/mockData';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function AppointmentsList() {
  const { currentUser, bookings, darkMode, cancelBooking } = useApp();
  if (!currentUser) return null;
  const myBookings = bookings.filter(b => b.userId === currentUser.id);
  const upcoming = myBookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');
  const past = myBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const card = `rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  const StatusIcon = ({ s }: { s: string }) => {
    if (s === 'completed') return <CheckCircle size={13} />;
    if (s === 'pending') return <Clock size={13} />;
    if (s === 'cancelled') return <XCircle size={13} />;
    return <AlertCircle size={13} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Appointments</h1>
        <Link to="/account/appointments/new"
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 transition-colors">
          <Plus size={15} /> Book New
        </Link>
      </div>

      {/* UPCOMING */}
      <div className={card}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-bold">Upcoming ({upcoming.length})</h2>
        </div>
        {upcoming.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <Calendar size={40} className="mx-auto mb-3 opacity-50" />
            <p>No upcoming appointments</p>
            <Link to="/account/appointments/new" className="mt-2 inline-block text-pink-600 text-sm font-semibold hover:underline">Book One</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {upcoming.map(b => (
              <div key={b.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold">{b.serviceName}</h3>
                  <div className={`text-sm mt-1 space-y-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>📅 {b.date} at {b.time}</p>
                    <p>💇 {b.stylistName}</p>
                    <p>💰 {b.servicePrice.toLocaleString()} UGX</p>
                    {b.notes && <p className="italic">📝 {b.notes}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${statusColors[b.status]}`}>
                    <StatusIcon s={b.status} /> {b.status}
                  </span>
                  {b.status !== 'cancelled' && (
                    <button onClick={() => cancelBooking(b.id)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-colors ${darkMode ? 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'}`}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAST */}
      {past.length > 0 && (
        <div className={card}>
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold">Past Appointments ({past.length})</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {past.map(b => (
              <div key={b.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold">{b.serviceName}</h3>
                  <div className={`text-sm mt-1 space-y-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>📅 {b.date} at {b.time}</p>
                    <p>💇 {b.stylistName}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${statusColors[b.status]}`}>
                  <StatusIcon s={b.status} /> {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NewAppointment() {
  const { currentUser, darkMode, addBooking } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    serviceId: '', date: '', time: '', stylistId: 'st4', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!currentUser) return null;

  const selectedService = services.find(s => s.id === form.serviceId);
  const selectedStylist = stylists.find(s => s.id === form.stylistId);

  const handleSubmit = () => {
    if (!selectedService || !selectedStylist) return;
    addBooking({
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      serviceId: form.serviceId,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      date: form.date,
      time: form.time,
      stylistId: form.stylistId,
      stylistName: selectedStylist.name,
      status: 'pending',
      notes: form.notes,
    });
    setSubmitted(true);
  };

  const card = `rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-sm border border-gray-100'}`;

  if (submitted) {
    return (
      <div className={`${card} text-center py-16`}>
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Booking Submitted!</h2>
        <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          We'll confirm your appointment via WhatsApp within 30 minutes.<br />
          {selectedService && <span>You earned {Math.floor(selectedService.price / 1000)} loyalty tokens!</span>}
        </p>
        <Link to="/account/appointments" className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors">
          View My Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Book Appointment</h1>

      {/* STEPS */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex items-center gap-2 ${s < 3 ? 'flex-1' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= s ? 'bg-pink-600 text-white' : darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-400'
            }`}>{s}</div>
            <span className={`text-xs hidden sm:block ${step >= s ? 'text-pink-600 font-medium' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {s === 1 ? 'Select Service' : s === 2 ? 'Pick Date & Time' : 'Confirm'}
            </span>
            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-pink-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1: SERVICE */}
      {step === 1 && (
        <div className={card}>
          <h2 className="font-bold text-lg mb-4">Choose a Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.filter(s => s.active).map(s => (
              <button key={s.id} onClick={() => setForm(f => ({ ...f, serviceId: s.id }))}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  form.serviceId === s.id ? 'border-pink-500 bg-pink-50' : darkMode ? 'border-gray-700 hover:border-pink-700' : 'border-gray-100 hover:border-pink-200'
                }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{s.name}</p>
                    <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.category} · {s.duration} min</p>
                  </div>
                  <span className="font-bold text-pink-600 text-sm flex-shrink-0">{s.price.toLocaleString()} UGX</span>
                </div>
              </button>
            ))}
          </div>
          <button disabled={!form.serviceId} onClick={() => setStep(2)}
            className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors disabled:opacity-40">
            Continue →
          </button>
        </div>
      )}

      {/* STEP 2: DATE & TIME & STYLIST */}
      {step === 2 && (
        <div className={card}>
          <h2 className="font-bold text-lg mb-4">Pick Date, Time & Stylist</h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preferred Date</label>
              <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preferred Time</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, time: t }))}
                    className={`py-2 px-1 rounded-lg text-xs font-medium border transition-colors ${
                      form.time === t ? 'bg-pink-600 text-white border-pink-600' : darkMode ? 'border-gray-700 text-gray-300 hover:border-pink-600' : 'border-gray-200 hover:border-pink-300'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Stylist Preference</label>
              <select value={form.stylistId} onChange={e => setForm(f => ({ ...f, stylistId: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-200'}`}>
                {stylists.map(s => <option key={s.id} value={s.id}>{s.name}{s.speciality ? ` – ${s.speciality}` : ''}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notes (optional)</label>
              <textarea rows={3} value={form.notes} placeholder="Any special requests or preferences..."
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-pink-400 resize-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-200 placeholder-gray-400'}`} />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)} className={`px-5 py-3 rounded-xl text-sm font-medium border ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>← Back</button>
            <button disabled={!form.date || !form.time} onClick={() => setStep(3)}
              className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors disabled:opacity-40">
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONFIRM */}
      {step === 3 && selectedService && selectedStylist && (
        <div className={card}>
          <h2 className="font-bold text-lg mb-6">Confirm Booking</h2>
          <div className={`space-y-3 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            {[
              ['Service', selectedService.name],
              ['Category', selectedService.category],
              ['Duration', `${selectedService.duration} min`],
              ['Price', `${selectedService.price.toLocaleString()} UGX`],
              ['Date', form.date],
              ['Time', form.time],
              ['Stylist', selectedStylist.name],
              ['Notes', form.notes || 'None'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <span className="font-bold">Tokens to Earn</span>
              <span className="font-bold text-yellow-500">+{Math.floor(selectedService.price / 1000)} pts</span>
            </div>
          </div>
          <p className={`text-xs mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            A WhatsApp confirmation will be sent to {currentUser.phone} after booking.
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(2)} className={`px-5 py-3 rounded-xl text-sm font-medium border ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>← Back</button>
            <button onClick={handleSubmit}
              className="px-8 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2">
              <Calendar size={16} /> Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
