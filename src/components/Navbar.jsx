import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, ShoppingBag, Sun, Moon } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reservations', href: '#reservations' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenCart, cartCount, theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy logic
      const scrollPosition = window.scrollY + 200; 
      
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-nav py-4 shadow-lg' 
        : 'bg-transparent py-6 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-gold"
          >
            <Coffee size={28} />
          </motion.div>
          <span className="font-serif text-2xl font-bold tracking-wider text-cream group-hover:text-gold transition-colors duration-300">
            URBAN BREW
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-cream/70 hover:text-cream'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side controls (Cart, Theme Switcher, Reservation CTA) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="text-cream/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle theme style"
          >
            {theme === 'onyx' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart Icon trigger */}
          <button
            onClick={onOpenCart}
            className="text-cream/70 hover:text-gold transition-colors focus:outline-none relative cursor-pointer"
            aria-label="Open Shopping cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </button>

          {/* Table Book CTA */}
          <a
            href="#reservations"
            onClick={(e) => handleClick(e, '#reservations')}
            className="px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-charcoal uppercase tracking-widest text-xs font-semibold rounded-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,168,128,0.3)]"
          >
            Reserve Table
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Theme Switcher mobile */}
          <button
            onClick={onToggleTheme}
            className="text-cream/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
          >
            {theme === 'onyx' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart trigger mobile */}
          <button
            onClick={onOpenCart}
            className="text-cream/70 hover:text-gold transition-colors focus:outline-none relative cursor-pointer"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-cream hover:text-gold transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-charcoal border-b border-gold/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => {
                const id = link.href.substring(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`text-lg uppercase tracking-widest py-2 transition-colors ${
                      isActive ? 'text-gold font-semibold' : 'text-cream/70'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#reservations"
                onClick={(e) => handleClick(e, '#reservations')}
                className="mt-4 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-charcoal uppercase tracking-widest text-sm font-semibold rounded-none text-center transition-all duration-300"
              >
                Reserve Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
