import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import BrewingProcess from './sections/BrewingProcess';
import Offers from './sections/Offers';
import Menu from './sections/Menu';
import Signature from './sections/Signature';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Reservation from './sections/Reservation';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import AdminDashboard from './sections/AdminDashboard';

const initialOrders = [
  {
    id: 'UB-192834',
    items: [
      { name: 'Urban Gourmet Burger', quantity: 1, price: '₹590' },
      { name: 'Artisan Cafe Latte', quantity: 2, price: '₹240' }
    ],
    type: 'delivery',
    address: '742 Evergreen Terrace, Seattle, WA',
    landmark: 'Near Springfield Park',
    total: 1120, // 590 + 240*2 + 50
    status: 'Preparing'
  },
  {
    id: 'UB-839210',
    items: [
      { name: 'Strawberry Glazed Cheesecake', quantity: 1, price: '₹350' },
      { name: 'Velvet Mocha', quantity: 1, price: '₹280' }
    ],
    type: 'pickup',
    address: '',
    landmark: '',
    total: 630,
    status: 'Pending'
  }
];

const initialReservations = [
  {
    name: 'Elena Rostova',
    email: 'elena@connoisseur.com',
    phone: '+1 (206) 555-8932',
    guests: '2',
    date: '2026-06-15',
    time: '18:30',
    seating: 'booths'
  },
  {
    name: 'Liam Henderson',
    email: 'liam@techcorp.io',
    phone: '+1 (206) 555-1029',
    guests: '4',
    date: '2026-06-14',
    time: '12:30',
    seating: 'patio'
  }
];

const initialVacancyMap = {
  booths: [
    { id: 'B1', occupied: true },
    { id: 'B2', occupied: false },
    { id: 'B3', occupied: false },
    { id: 'B4', occupied: true },
    { id: 'B5', occupied: false }
  ],
  window: [
    { id: 'W1', occupied: false },
    { id: 'W2', occupied: false },
    { id: 'W3', occupied: true },
    { id: 'W4', occupied: false },
    { id: 'W5', occupied: false }
  ],
  bar: [
    { id: 'K1', occupied: true },
    { id: 'K2', occupied: true },
    { id: 'K3', occupied: false },
    { id: 'K4', occupied: false },
    { id: 'K5', occupied: false }
  ],
  patio: [
    { id: 'P1', occupied: false },
    { id: 'P2', occupied: true },
    { id: 'P3', occupied: false },
    { id: 'P4', occupied: false },
    { id: 'P5', occupied: false }
  ]
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('warm'); // 'warm' or 'onyx'
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // stores user profile or null
  const [isAdminViewActive, setIsAdminViewActive] = useState(false);

  // Global Dashboard Tracker states
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [reservationsList, setReservationsList] = useState(initialReservations);
  const [vacancyMap, setVacancyMap] = useState(initialVacancyMap);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'onyx') {
      root.classList.remove('theme-warm');
      root.classList.add('theme-onyx');
    } else {
      root.classList.remove('theme-onyx');
      root.classList.add('theme-warm');
    }
  }, [theme]);

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'warm' ? 'onyx' : 'warm'));
  };

  // Auth Operations
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'admin') {
      setIsAdminViewActive(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminViewActive(false);
  };

  // Admin Dashboard operations
  const handlePlaceOrder = (orderData) => {
    setOrdersList(prev => [orderData, ...prev]);
  };

  const handleAddReservation = (resData) => {
    setReservationsList(prev => [resData, ...prev]);

    // Also auto-occupy one vacant table in that zone if available
    const zoneId = resData.seating;
    setVacancyMap(prevMap => {
      const zoneTables = [...prevMap[zoneId]];
      const firstEmptyTableIndex = zoneTables.findIndex(t => !t.occupied);
      if (firstEmptyTableIndex !== -1) {
        zoneTables[firstEmptyTableIndex] = { 
          ...zoneTables[firstEmptyTableIndex], 
          occupied: true 
        };
      }
      return {
        ...prevMap,
        [zoneId]: zoneTables
      };
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleUpdateReservationStatus = (indexToCancel) => {
    const resToCancel = reservationsList[indexToCancel];
    setReservationsList(prev => prev.filter((_, idx) => idx !== indexToCancel));

    // Release one table in that zone if possible
    if (resToCancel) {
      const zoneId = resToCancel.seating;
      setVacancyMap(prevMap => {
        const zoneTables = [...prevMap[zoneId]];
        const firstOccupiedTableIndex = zoneTables.findIndex(t => t.occupied);
        if (firstOccupiedTableIndex !== -1) {
          zoneTables[firstOccupiedTableIndex] = {
            ...zoneTables[firstOccupiedTableIndex],
            occupied: false
          };
        }
        return {
          ...prevMap,
          [zoneId]: zoneTables
        };
      });
    }
  };

  const handleToggleVacancy = (zoneId, tableId) => {
    setVacancyMap(prevMap => {
      const zoneTables = prevMap[zoneId].map(t => 
        t.id === tableId ? { ...t, occupied: !t.occupied } : t
      );
      return {
        ...prevMap,
        [zoneId]: zoneTables
      };
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`relative min-h-screen bg-charcoal text-cream font-sans overflow-x-hidden transition-colors duration-500 ${
      theme === 'warm' ? 'theme-warm' : 'theme-onyx'
    }`}>
      {/* Texture Accent */}
      <div className="cafe-texture absolute inset-0 pointer-events-none z-30 opacity-70" />

      {/* Sticky Navigation */}
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        cartCount={cartCount} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        isAdminViewActive={isAdminViewActive}
        onToggleAdminView={() => setIsAdminViewActive(!isAdminViewActive)}
      />

      {/* Screen Routing */}
      {isAdminViewActive ? (
        <AdminDashboard 
          ordersList={ordersList}
          reservationsList={reservationsList}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdateReservationStatus={handleUpdateReservationStatus}
          vacancyMap={vacancyMap}
          onToggleVacancy={handleToggleVacancy}
        />
      ) : (
        <main>
          <Hero />
          <About />
          <BrewingProcess />
          <Offers />
          <Menu onAddToCart={handleAddToCart} />
          <Signature />
          <Gallery />
          <Testimonials />
          <Reservation onAddReservation={handleAddReservation} />
          <Contact />
        </main>
      )}

      {/* Footer Area */}
      <Footer />

      {/* Cart Slider Panel */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Authentication Modal */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Float Widgets */}
      <WhatsAppButton />
    </div>
  );
}
