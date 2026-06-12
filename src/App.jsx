import { useState, useEffect } from 'react';
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



export default function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('warm'); // 'warm' or 'onyx'
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // stores user profile or null
  const [isAdminViewActive, setIsAdminViewActive] = useState(false);

  // Global Dashboard Tracker states
  const [ordersList, setOrdersList] = useState([]);
  const [reservationsList, setReservationsList] = useState([]);
  const [vacancyMap, setVacancyMap] = useState({
    booths: [],
    window: [],
    bar: [],
    patio: []
  });

  // Fetch initial data from backend APIs
  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrdersList(data))
      .catch((err) => console.error('Error fetching orders:', err));

    fetch('/api/reservations')
      .then((res) => res.json())
      .then((data) => setReservationsList(data))
      .catch((err) => console.error('Error fetching reservations:', err));

    fetch('/api/vacancy')
      .then((res) => res.json())
      .then((data) => setVacancyMap(data))
      .catch((err) => console.error('Error fetching vacancy:', err));
  }, []);

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
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to place order');
        return res.json();
      })
      .then((savedOrder) => {
        setOrdersList((prev) => [savedOrder, ...prev]);
      })
      .catch((err) => console.error('Error placing order:', err));
  };

  const handleAddReservation = (resData) => {
    return fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to save reservation');
        return res.json();
      })
      .then((savedRes) => {
        setReservationsList((prev) => [savedRes, ...prev]);

        // Also auto-occupy one vacant table in that zone if available on the backend
        const zoneId = resData.seating;
        const zoneTables = vacancyMap[zoneId] || [];
        const firstEmptyTable = zoneTables.find(t => !t.occupied);
        if (firstEmptyTable) {
          fetch('/api/vacancy', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              zone: zoneId,
              tableId: firstEmptyTable.id,
              occupied: true
            })
          })
            .then((res) => res.json())
            .then((updatedMap) => {
              setVacancyMap(updatedMap);
            })
            .catch((err) => console.error('Error updating table state:', err));
        }
        return savedRes;
      });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update order status');
        return res.json();
      })
      .then((updatedOrder) => {
        setOrdersList((prev) => prev.map((o) => (o.id === orderId ? updatedOrder : o)));
      })
      .catch((err) => console.error('Error updating order status:', err));
  };

  const handleUpdateReservationStatus = (indexToCancel) => {
    const resToCancel = reservationsList[indexToCancel];
    if (!resToCancel) return;

    const deletePromise = resToCancel._id
      ? fetch(`/api/reservations/${resToCancel._id}`, { method: 'DELETE' })
      : Promise.resolve();

    deletePromise
      .then((res) => {
        if (res && !res.ok) throw new Error('Failed to cancel reservation');
        setReservationsList((prev) => prev.filter((_, idx) => idx !== indexToCancel));

        // Release one table in that zone if possible
        const zoneId = resToCancel.seating;
        const zoneTables = vacancyMap[zoneId] || [];
        const firstOccupiedTable = zoneTables.find((t) => t.occupied);
        if (firstOccupiedTable) {
          fetch('/api/vacancy', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              zone: zoneId,
              tableId: firstOccupiedTable.id,
              occupied: false
            })
          })
            .then((res) => res.json())
            .then((updatedMap) => {
              setVacancyMap(updatedMap);
            })
            .catch((err) => console.error('Error releasing table state:', err));
        }
      })
      .catch((err) => console.error('Error deleting reservation:', err));
  };

  const handleToggleVacancy = (zoneId, tableId) => {
    const zoneTables = vacancyMap[zoneId] || [];
    const table = zoneTables.find((t) => t.id === tableId);
    if (!table) return;

    fetch('/api/vacancy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zone: zoneId,
        tableId: tableId,
        occupied: !table.occupied
      })
    })
      .then((res) => res.json())
      .then((updatedMap) => {
        setVacancyMap(updatedMap);
      })
      .catch((err) => console.error('Error toggling vacancy state:', err));
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
          <Reservation 
            key={currentUser ? currentUser.email : 'guest'}
            onAddReservation={handleAddReservation} 
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
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
