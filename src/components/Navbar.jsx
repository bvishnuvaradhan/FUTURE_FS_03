import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, ShoppingBag, Sun, Moon, LogOut, User } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reservations', href: '#reservations' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ 
  onOpenCart, 
  cartCount, 
  theme, 
  onToggleTheme,
  currentUser,
  onOpenLogin,
  onLogout,
  isAdminViewActive,
  onToggleAdminView
}) {
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
    
    // If Admin view is active, switch to website view first
    if (isAdminViewActive) {
      onToggleAdminView();
    }

    const id = href.substring(1);
    
    // Wait a brief tick for view to shift before scrolling
    setTimeout(() => {
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
    }, 100);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'glass-nav py-4 shadow-lg' 
        : 'bg-transparent py-6 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            if (isAdminViewActive) onToggleAdminView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-center gap-2 group"
        >
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

        {/* Desktop Links (Hidden if Admin View is Active) */}
        {!isAdminViewActive ? (
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
        ) : (
          <div className="hidden md:block font-serif text-lg tracking-wider text-gold font-semibold uppercase">
            System Administrator Session
          </div>
        )}

        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="text-cream/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
            title="Switch theme color"
          >
            {theme === 'onyx' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Icon trigger (Hidden for Admins) */}
          {!isAdminViewActive && (
            <button
              onClick={onOpenCart}
              className="text-cream/70 hover:text-gold transition-colors focus:outline-none relative cursor-pointer"
              title="Open takeout bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <div className="h-4 w-[1px] bg-cream/10" />

          {/* Auth Controllers */}
          {currentUser ? (
            <div className="flex items-center gap-4">
              {/* User Identity */}
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-cream font-sans">{currentUser.name}</span>
                <span className="text-[8px] uppercase tracking-widest text-gold font-bold leading-none mt-0.5 font-sans">
                  {currentUser.role}
                </span>
              </div>
              
              {/* Admin Panel Toggle */}
              {currentUser.role === 'admin' && (
                <button
                  onClick={onToggleAdminView}
                  className="px-4 py-2 border border-gold/40 hover:border-gold text-gold text-[9px] uppercase tracking-wider font-semibold transition-all rounded-none cursor-pointer hover:bg-gold/5"
                >
                  {isAdminViewActive ? "Home Site" : "Admin Panel"}
                </button>
              )}

              {/* Logout */}
              <button
                onClick={onLogout}
                className="text-cream/60 hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-5 py-2 border border-gold/45 text-gold hover:bg-gold hover:text-charcoal uppercase tracking-widest text-[9px] font-semibold rounded-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(197,168,128,0.2)] cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Book Table CTA (Hidden if Admin View is Active) */}
          {!isAdminViewActive && (
            <a
              href="#reservations"
              onClick={(e) => handleClick(e, '#reservations')}
              className="px-5 py-2 bg-gold text-charcoal hover:bg-gold-hover uppercase tracking-widest text-[9px] font-semibold rounded-none transition-all duration-300"
            >
              Book Table
            </a>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme Switcher mobile */}
          <button
            onClick={onToggleTheme}
            className="text-cream/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
          >
            {theme === 'onyx' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Cart trigger mobile (Hidden for Admin View) */}
          {!isAdminViewActive && (
            <button
              onClick={onOpenCart}
              className="text-cream/70 hover:text-gold transition-colors focus:outline-none relative cursor-pointer"
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* User Icon indicator */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.role === 'admin' && (
                <button
                  onClick={onToggleAdminView}
                  className="px-2 py-1.5 border border-gold/30 text-gold text-[8px] uppercase font-bold tracking-wider rounded-none font-sans"
                >
                  {isAdminViewActive ? "Home" : "Admin"}
                </button>
              )}
              <button
                onClick={onLogout}
                className="text-cream/50 hover:text-red-400 transition-colors focus:outline-none"
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="text-cream/60 hover:text-gold transition-colors focus:outline-none"
              title="Sign In"
            >
              <User size={16} />
            </button>
          )}

          {/* Hamburger toggle (Hidden if Admin View is Active) */}
          {!isAdminViewActive && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream hover:text-gold transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && !isAdminViewActive && (
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
                Book Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
