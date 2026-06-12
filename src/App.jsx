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

export default function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState('warm'); // 'warm' or 'onyx'
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Apply theme to HTML or body element for variables to bubble
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
    setIsCartOpen(true); // Open drawer instantly when adding items
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
      />

      {/* Core Website Flow */}
      <main>
        <Hero />
        <About />
        <BrewingProcess />
        <Offers />
        <Menu onAddToCart={handleAddToCart} />
        <Signature />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>

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
      />

      {/* Float Widgets */}
      <WhatsAppButton />
    </div>
  );
}
