import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BookingStatus, OrderStatus, UserRole } from '../data/mockData';

// ── TYPES ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  tokens: number;
  avatar?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
  stylistId: string;
  stylistName: string;
  status: BookingStatus;
  notes: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  address: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  bookingId?: string;
  rating: number;
  text: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  qty: number;
  image: string;
}

interface AppContextType {
  // Theme
  darkMode: boolean;
  toggleDark: () => void;

  // Auth
  currentUser: User | null;
  allUsers: User[];
  login: (phone: string, password: string) => boolean;
  signup: (name: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // Bookings
  bookings: Booking[];
  addBooking: (b: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  cancelBooking: (id: string) => void;

  // Orders
  orders: Order[];
  addOrder: (o: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;

  // Reviews
  reviews: Review[];
  addReview: (r: Omit<Review, 'id' | 'createdAt'>) => void;
  updateReview: (id: string, data: Partial<Review>) => void;

  // Admin helpers
  adjustTokens: (userId: string, delta: number) => void;
}

// ── SAMPLE DATA ───────────────────────────────────────────────────────────────
const SAMPLE_USERS: User[] = [
  { id: 'u1', name: 'Janet BabyJat', phone: '0700000001', email: 'admin@babyjat.com', role: 'admin', tokens: 500, createdAt: '2024-01-01' },
  { id: 'u2', name: 'Amara Nakato', phone: '0781234567', role: 'customer', tokens: 120, createdAt: '2025-03-10' },
  { id: 'u3', name: 'Grace Namutebi', phone: '0752345678', role: 'customer', tokens: 80, createdAt: '2025-04-05' },
  { id: 'u4', name: 'Sharon Atim', phone: '0763456789', role: 'customer', tokens: 200, createdAt: '2025-02-20' },
];

const SAMPLE_BOOKINGS: Booking[] = [
  { id: 'b1', userId: 'u2', userName: 'Amara Nakato', userPhone: '0781234567', serviceId: 's3', serviceName: 'Knotless Braids', servicePrice: 120000, date: '2025-06-15', time: '10:00 AM', stylistId: 'st1', stylistName: 'Janet (BabyJat)', status: 'confirmed', notes: '', createdAt: '2025-06-10' },
  { id: 'b2', userId: 'u3', userName: 'Grace Namutebi', userPhone: '0752345678', serviceId: 's5', serviceName: 'Deep Conditioning', servicePrice: 30000, date: '2025-06-14', time: '2:00 PM', stylistId: 'st2', stylistName: 'Sarah Nabirye', status: 'completed', notes: 'First visit', createdAt: '2025-06-09' },
  { id: 'b3', userId: 'u4', userName: 'Sharon Atim', userPhone: '0763456789', serviceId: 's9', serviceName: 'Updo / Bridal Style', servicePrice: 50000, date: '2025-06-20', time: '9:00 AM', stylistId: 'st1', stylistName: 'Janet (BabyJat)', status: 'pending', notes: 'Wedding on 21 June', createdAt: '2025-06-11' },
  { id: 'b4', userId: 'u2', userName: 'Amara Nakato', userPhone: '0781234567', serviceId: 's1', serviceName: 'Box Braids', servicePrice: 80000, date: '2025-05-01', time: '11:00 AM', stylistId: 'st1', stylistName: 'Janet (BabyJat)', status: 'completed', notes: '', createdAt: '2025-04-28' },
];

const SAMPLE_ORDERS: Order[] = [
  { id: 'o1', userId: 'u2', userName: 'Amara Nakato', userPhone: '0781234567', items: [{ productId: 'p1', productName: 'Satin Scrunchies', price: 15000, qty: 2 }], total: 30000, status: 'pending', paymentMethod: 'Mobile Money', address: 'Kampala, Nakawa', createdAt: '2025-06-12' },
  { id: 'o2', userId: 'u3', userName: 'Grace Namutebi', userPhone: '0752345678', items: [{ productId: 'p5', productName: 'Argan Oil Serum', price: 35000, qty: 1 }, { productId: 'p4', productName: 'Silk Hair Bonnet', price: 22000, qty: 1 }], total: 57000, status: 'delivered', paymentMethod: 'Cash on Delivery', address: 'Kampala, Kireka', createdAt: '2025-06-08' },
];

const SAMPLE_REVIEWS: Review[] = [
  { id: 'r1', userId: 'u2', userName: 'Amara Nakato', rating: 5, text: 'BabyJat did my knotless braids and I\'ve never felt more beautiful!', approved: true, featured: true, createdAt: '2025-05-15' },
  { id: 'r2', userId: 'u3', userName: 'Grace Namutebi', rating: 5, text: 'Booked online so easily and my appointment was ready when I arrived.', approved: true, featured: true, createdAt: '2025-05-28' },
  { id: 'r3', userId: 'u4', userName: 'Sharon Atim', rating: 5, text: 'The bridal updo for my wedding was absolutely perfect!', approved: true, featured: true, createdAt: '2025-06-08' },
];

// ── PASSWORDS MOCK (phone → password) ─────────────────────────────────────────
const PASSWORDS: Record<string, string> = {
  '0700000001': 'admin123',
  '0781234567': 'pass123',
  '0752345678': 'pass123',
  '0763456789': 'pass123',
};

// ── CONTEXT ───────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(SAMPLE_USERS);
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [passwords, setPasswords] = useState<Record<string, string>>(PASSWORDS);

  // Persist session
  useEffect(() => {
    const stored = localStorage.getItem('babyjat_user');
    if (stored) setCurrentUser(JSON.parse(stored));
    const storedDark = localStorage.getItem('babyjat_dark');
    if (storedDark === 'true') setDarkMode(true);
  }, []);

  const toggleDark = () => {
    setDarkMode(d => {
      localStorage.setItem('babyjat_dark', String(!d));
      return !d;
    });
  };

  const login = (phone: string, password: string): boolean => {
    const user = allUsers.find(u => u.phone === phone);
    if (!user) return false;
    if (passwords[phone] !== password) return false;
    setCurrentUser(user);
    localStorage.setItem('babyjat_user', JSON.stringify(user));
    return true;
  };

  const signup = (name: string, phone: string, password: string): boolean => {
    if (allUsers.find(u => u.phone === phone)) return false;
    const newUser: User = {
      id: 'u' + Date.now(),
      name,
      phone,
      role: 'customer',
      tokens: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAllUsers(u => [...u, newUser]);
    setPasswords(p => ({ ...p, [phone]: password }));
    setCurrentUser(newUser);
    localStorage.setItem('babyjat_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('babyjat_user');
    setCart([]);
  };

  const updateProfile = (data: Partial<User>) => {
    setCurrentUser(u => {
      if (!u) return u;
      const updated = { ...u, ...data };
      localStorage.setItem('babyjat_user', JSON.stringify(updated));
      setAllUsers(users => users.map(usr => usr.id === u.id ? updated : usr));
      return updated;
    });
  };

  const addBooking = (b: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = { ...b, id: 'b' + Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    setBookings(prev => [newBooking, ...prev]);
    // Award tokens: 1 token per 1000 UGX
    const tokensEarned = Math.floor(b.servicePrice / 1000);
    setAllUsers(users => users.map(u => u.id === b.userId ? { ...u, tokens: u.tokens + tokensEarned } : u));
    if (currentUser?.id === b.userId) {
      setCurrentUser(u => u ? { ...u, tokens: u.tokens + tokensEarned } : u);
      localStorage.setItem('babyjat_user', JSON.stringify({ ...currentUser, tokens: (currentUser?.tokens || 0) + tokensEarned }));
    }
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const cancelBooking = (id: string) => updateBookingStatus(id, 'cancelled');

  const addOrder = (o: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = { ...o, id: 'o' + Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    setOrders(prev => [newOrder, ...prev]);
    const tokensEarned = Math.floor(o.total / 1000);
    setAllUsers(users => users.map(u => u.id === o.userId ? { ...u, tokens: u.tokens + tokensEarned } : u));
    if (currentUser?.id === o.userId) {
      setCurrentUser(u => u ? { ...u, tokens: u.tokens + tokensEarned } : u);
    }
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.productId === item.productId);
      if (existing) return prev.map(c => c.productId === item.productId ? { ...c, qty: c.qty + item.qty } : c);
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(c => c.productId !== productId));

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) { removeFromCart(productId); return; }
    setCart(prev => prev.map(c => c.productId === productId ? { ...c, qty } : c));
  };

  const clearCart = () => setCart([]);

  const addReview = (r: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = { ...r, id: 'r' + Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    setReviews(prev => [newReview, ...prev]);
  };

  const updateReview = (id: string, data: Partial<Review>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const adjustTokens = (userId: string, delta: number) => {
    setAllUsers(users => users.map(u => u.id === userId ? { ...u, tokens: Math.max(0, u.tokens + delta) } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(u => u ? { ...u, tokens: Math.max(0, u.tokens + delta) } : u);
    }
  };

  return (
    <AppContext.Provider value={{
      darkMode, toggleDark,
      currentUser, allUsers, login, signup, logout, updateProfile,
      bookings, addBooking, updateBookingStatus, cancelBooking,
      orders, addOrder, updateOrderStatus,
      cart, addToCart, removeFromCart, updateQty, clearCart,
      reviews, addReview, updateReview,
      adjustTokens,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
