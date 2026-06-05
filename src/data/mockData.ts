// ── SERVICES ────────────────────────────────────────────────────────────────
export const services = [
  { id: 's1', name: 'Box Braids', category: 'Braiding', description: 'Classic protective box braids in various sizes', duration: 180, price: 80000, active: true },
  { id: 's2', name: 'Cornrows', category: 'Braiding', description: 'Traditional and modern cornrow styles', duration: 90, price: 35000, active: true },
  { id: 's3', name: 'Knotless Braids', category: 'Braiding', description: 'Lightweight knotless braids, gentle on edges', duration: 240, price: 120000, active: true },
  { id: 's4', name: 'Senegalese Twists', category: 'Braiding', description: 'Elegant rope-like twists, natural look', duration: 200, price: 100000, active: true },
  { id: 's5', name: 'Deep Conditioning', category: 'Treatment', description: 'Intense moisture treatment for dry hair', duration: 60, price: 30000, active: true },
  { id: 's6', name: 'Scalp Treatment', category: 'Treatment', description: 'Nourishing scalp care and massage', duration: 45, price: 25000, active: true },
  { id: 's7', name: 'Hair Relaxer', category: 'Treatment', description: 'Professional chemical straightening', duration: 120, price: 60000, active: true },
  { id: 's8', name: 'Blow Dry & Style', category: 'Styling', description: 'Professional blow dry with styling', duration: 60, price: 20000, active: true },
  { id: 's9', name: 'Updo / Bridal Style', category: 'Styling', description: 'Elegant updos for special occasions', duration: 90, price: 50000, active: true },
  { id: 's10', name: 'Hair Colour', category: 'Colouring', description: 'Full colour, highlights or balayage', duration: 150, price: 90000, active: true },
  { id: 's11', name: 'Highlights', category: 'Colouring', description: 'Partial highlights for a natural look', duration: 120, price: 70000, active: true },
  { id: 's12', name: 'Manicure', category: 'Nails', description: 'Classic manicure with polish', duration: 45, price: 20000, active: true },
  { id: 's13', name: 'Gel Nails', category: 'Nails', description: 'Long-lasting gel nail application', duration: 60, price: 35000, active: true },
];

// ── PRODUCTS ─────────────────────────────────────────────────────────────────
export const products = [
  { id: 'p1', name: 'Satin Scrunchies (Pack of 5)', description: 'Luxurious satin scrunchies, gentle on hair', price: 15000, image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Accessories' },
  { id: 'p2', name: 'Braiding Hair (Pack)', description: 'High quality synthetic braiding hair', price: 25000, image: 'https://images.pexels.com/photos/9741840/pexels-photo-9741840.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Hair' },
  { id: 'p3', name: 'Edge Control Gel', description: 'Strong hold edge control for baby hairs', price: 18000, image: 'https://images.pexels.com/photos/3997384/pexels-photo-3997384.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Products' },
  { id: 'p4', name: 'Silk Hair Bonnet', description: 'Protect your style overnight with silk', price: 22000, image: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Accessories' },
  { id: 'p5', name: 'Argan Oil Serum', description: 'Moroccan argan oil for shine & smoothness', price: 35000, image: 'https://images.pexels.com/photos/4465821/pexels-photo-4465821.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Products' },
  { id: 'p6', name: 'Hair Clips Set (10pc)', description: 'Elegant gold-tone hair clips set', price: 12000, image: 'https://images.pexels.com/photos/3993466/pexels-photo-3993466.jpeg?auto=compress&cs=tinysrgb&w=400', stock: false, category: 'Accessories' },
  { id: 'p7', name: 'Deep Conditioner Mask', description: '500ml intensive repair hair mask', price: 28000, image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Products' },
  { id: 'p8', name: 'Beaded Hair Pins (20pc)', description: 'Decorative beaded pins for braids', price: 8000, image: 'https://images.pexels.com/photos/9741840/pexels-photo-9741840.jpeg?auto=compress&cs=tinysrgb&w=400', stock: true, category: 'Accessories' },
];

// ── GALLERY ───────────────────────────────────────────────────────────────────
export const galleryImages = [
  { id: 'g1', url: 'https://images.pexels.com/photos/9741840/pexels-photo-9741840.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Box Braids', category: 'Braiding' },
  { id: 'g2', url: 'https://images.pexels.com/photos/13430270/pexels-photo-13430270.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Knotless Braids', category: 'Braiding' },
  { id: 'g3', url: 'https://images.pexels.com/photos/35086597/pexels-photo-35086597.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Natural Twists', category: 'Braiding' },
  { id: 'g4', url: 'https://images.pexels.com/photos/11462529/pexels-photo-11462529.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Protective Style', category: 'Styling' },
  { id: 'g5', url: 'https://images.pexels.com/photos/18153185/pexels-photo-18153185.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Dreadlocks', category: 'Braiding' },
  { id: 'g6', url: 'https://images.pexels.com/photos/6180559/pexels-photo-6180559.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Braided Updo', category: 'Styling' },
  { id: 'g7', url: 'https://images.pexels.com/photos/7750109/pexels-photo-7750109.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Our Salon', category: 'Salon' },
  { id: 'g8', url: 'https://images.pexels.com/photos/7750114/pexels-photo-7750114.jpeg?auto=compress&cs=tinysrgb&w=600', caption: 'Styling Stations', category: 'Salon' },
];

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
export const testimonials = [
  { id: 't1', name: 'Amara Nakato', rating: 5, text: 'BabyJat did my knotless braids and I\'ve never felt more beautiful! The team is so professional and the salon is gorgeous. I\'ll definitely be coming back!', date: '2025-05-15', approved: true, featured: true },
  { id: 't2', name: 'Grace Namutebi', rating: 5, text: 'Booked online so easily and my appointment was ready when I arrived. The deep conditioning treatment left my hair feeling silky smooth. Amazing experience!', date: '2025-05-28', approved: true, featured: true },
  { id: 't3', name: 'Prossy Nalwanga', rating: 4, text: 'Love the loyalty token system – I\'ve already earned enough for a discount on my next visit! Great braiding too, very neat and lasted long.', date: '2025-06-01', approved: true, featured: false },
  { id: 't4', name: 'Sharon Atim', rating: 5, text: 'The bridal updo they did for my wedding was absolutely perfect. All my guests complimented my hair. Thank you BabyJat team!', date: '2025-06-08', approved: true, featured: true },
  { id: 't5', name: 'Diana Akello', rating: 4, text: 'Ordered hair accessories online and they arrived quickly. The satin scrunchies are amazing quality. Will order again!', date: '2025-06-10', approved: true, featured: false },
];

// ── STYLISTS ──────────────────────────────────────────────────────────────────
export const stylists = [
  { id: 'st1', name: 'Janet (BabyJat)', role: 'Master Stylist & Owner', speciality: 'Braiding, Knotless, Twists' },
  { id: 'st2', name: 'Sarah Nabirye', role: 'Senior Stylist', speciality: 'Colouring, Treatments' },
  { id: 'st3', name: 'Mary Acan', role: 'Stylist', speciality: 'Styling, Nails' },
  { id: 'st4', name: 'Any Available', role: '', speciality: '' },
];

// ── TIME SLOTS ────────────────────────────────────────────────────────────────
export const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
];

// ── BOOKING STATUSES ──────────────────────────────────────────────────────────
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';
export type UserRole = 'customer' | 'admin';
