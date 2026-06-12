import { useState } from 'react';
import { Coffee, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
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
    }
  };

  return (
    <footer className="bg-charcoal-light border-t border-gold/15 py-16 md:py-24 relative overflow-hidden cafe-texture">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-gold/10">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-4 text-left flex flex-col items-start">
            <a href="#home" onClick={(e) => handleClick(e, 'home')} className="flex items-center gap-2 group mb-6">
              <Coffee size={24} className="text-gold group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-xl font-bold tracking-wider text-cream group-hover:text-gold transition-colors">
                URBAN BREW
              </span>
            </a>
            <p className="text-cream/60 font-sans text-xs md:text-sm font-light leading-relaxed mb-6">
              Elevating the daily ritual of coffee and food. We bring you specialty hand-selected beans and fine dining in a luxurious dark-themed lounge.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3 font-sans text-xs md:text-sm font-light text-cream/70">
              <li><a href="#home" onClick={(e) => handleClick(e, 'home')} className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleClick(e, 'about')} className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#offers" onClick={(e) => handleClick(e, 'offers')} className="hover:text-gold transition-colors">Special Offers</a></li>
              <li><a href="#menu" onClick={(e) => handleClick(e, 'menu')} className="hover:text-gold transition-colors">Featured Menu</a></li>
              <li><a href="#gallery" onClick={(e) => handleClick(e, 'gallery')} className="hover:text-gold transition-colors">Cafe Gallery</a></li>
              <li><a href="#reservations" onClick={(e) => handleClick(e, 'reservations')} className="hover:text-gold transition-colors">Reservations</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 font-sans text-xs font-light text-cream/75">
              <li>
                <span className="block text-[9px] uppercase tracking-widest text-cream/40 mb-1 font-semibold">Address</span>
                582 Artisan Blvd, Suite 100,<br />Seattle, WA 98101
              </li>
              <li>
                <span className="block text-[9px] uppercase tracking-widest text-cream/40 mb-1 font-semibold">Phone</span>
                <a href="tel:+12065550198" className="hover:text-gold transition-colors">+1 (206) 555-0198</a>
              </li>
              <li>
                <span className="block text-[9px] uppercase tracking-widest text-cream/40 mb-1 font-semibold">Email</span>
                <a href="mailto:hello@urbanbrewcafe.com" className="hover:text-gold transition-colors">hello@urbanbrewcafe.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-6">Newsletter</h4>
            <p className="text-cream/60 font-sans text-xs font-light leading-relaxed mb-6">
              Subscribe to get notified about our special culinary events, weekend menus, and exclusive discount codes.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe} 
                  className="flex border border-gold/20"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-charcoal/50 text-cream text-xs px-4 py-3 focus:outline-none w-full placeholder:text-cream/35"
                  />
                  <button
                    type="submit"
                    className="bg-gold text-charcoal hover:bg-gold-hover px-4 py-3 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={14} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="subscribed-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 p-3 bg-gold/10 border border-gold/30 text-gold text-xs font-sans"
                >
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>Subscribed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Copyright Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 font-sans text-[11px] font-light text-cream/40 gap-4">
          <div>
            © {new Date().getFullYear()} Urban Brew Café. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
