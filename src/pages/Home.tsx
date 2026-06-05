import { Link } from 'react-router-dom';
import { Star, Calendar, ShoppingBag, Gift, ChevronRight, Sparkles, Shield, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { services, testimonials, galleryImages } from '../data/mockData';

export default function Home() {
  const { darkMode } = useApp();
  const featuredServices = services.slice(0, 6);
  const featuredTestimonials = testimonials.filter(t => t.featured && t.approved).slice(0, 3);
  const featuredGallery = galleryImages.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/7750109/pexels-photo-7750109.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
            alt="BabyJat Beauty Parlor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-950/85 via-pink-900/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/30">
              <Sparkles size={12} /> Premium Beauty Experience in Kampala
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Where Beauty<br />
              <span className="text-yellow-300">Meets Elegance</span>
            </h1>
            <p className="text-lg text-pink-100 mb-8 leading-relaxed">
              Experience world-class braiding, hair treatments, and styling at BabyJat Beauty Parlor. Book appointments online, shop our premium accessories, and earn loyalty rewards with every visit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/account/appointments/new"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-xl shadow-pink-900/40 flex items-center gap-2">
                <Calendar size={20} /> Book Appointment
              </Link>
              <Link to="/services"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all border border-white/40 flex items-center gap-2">
                View Services <ChevronRight size={20} />
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              <div className="text-white">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-pink-200">Happy Clients</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold text-yellow-300">8+</div>
                <div className="text-sm text-pink-200">Years Experience</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold text-yellow-300">4.9★</div>
                <div className="text-sm text-pink-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FEATURES */}
      <section className={`py-10 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: 'Easy Booking', desc: 'Book appointments online 24/7, choose your stylist & time slot', color: 'pink' },
            { icon: Gift, title: 'Loyalty Tokens', desc: 'Earn 1 token per 1,000 UGX spent, redeem for discounts', color: 'yellow' },
            { icon: ShoppingBag, title: 'Online Shop', desc: 'Browse & order premium hair accessories delivered to you', color: 'purple' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className={`flex items-start gap-4 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                color === 'pink' ? 'bg-pink-100 text-pink-600' : color === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 'bg-purple-100 text-purple-600'
              }`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className={`py-20 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-500 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="text-4xl font-bold mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Our Services</h2>
            <p className={`mt-3 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Professional hair care tailored to you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(s => (
              <div key={s.id} className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 ${darkMode ? 'bg-gray-900 border-gray-800 hover:border-pink-800' : 'bg-white border-gray-100 hover:border-pink-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${darkMode ? 'bg-pink-900/40 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>{s.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-600 text-lg">{s.price.toLocaleString()} UGX</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.duration} min</div>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{s.name}</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{s.description}</p>
                <Link to="/account/appointments/new"
                  className="w-full block text-center py-2 bg-pink-50 text-pink-600 rounded-xl text-sm font-medium hover:bg-pink-100 transition-colors">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-pink-500 text-pink-600 rounded-2xl font-semibold hover:bg-pink-500 hover:text-white transition-all">
              View All Services <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-pink-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-500 text-sm font-semibold uppercase tracking-widest">Our Work</span>
            <h2 className="text-4xl font-bold mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredGallery.map((img, i) => (
              <div key={img.id} className={`relative overflow-hidden rounded-2xl group aspect-square ${i === 0 ? 'md:row-span-2 md:col-span-1' : ''}`}>
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/40 transition-all flex items-end">
                  <div className="p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <p className="text-white font-semibold text-sm">{img.caption}</p>
                    <span className="text-pink-200 text-xs">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-pink-500 text-pink-600 rounded-2xl font-semibold hover:bg-pink-500 hover:text-white transition-all">
              View Full Gallery <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`py-20 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-pink-500 text-sm font-semibold uppercase tracking-widest">What Clients Say</span>
            <h2 className="text-4xl font-bold mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map(t => (
              <div key={t.id} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-pink-50'}`}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-4 italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-gradient-to-br from-pink-600 to-pink-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Why Choose BabyJat?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Quality Guaranteed', desc: 'We use only the best products and techniques' },
              { icon: Clock, title: 'Punctual Service', desc: 'We respect your time – always on schedule' },
              { icon: Star, title: 'Expert Stylists', desc: 'Trained professionals with years of experience' },
              { icon: Gift, title: 'Loyalty Rewards', desc: 'Earn tokens on every service and purchase' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-pink-200 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Look <span className="text-pink-600">Amazing?</span>
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Book your appointment today or create an account to start earning loyalty tokens.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/account/appointments/new"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg">
              Book Appointment
            </Link>
            <Link to="/signup"
              className={`px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-pink-500 text-pink-600 hover:bg-pink-50 transition-all`}>
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
