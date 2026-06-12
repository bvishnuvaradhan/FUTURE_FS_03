import { motion } from 'framer-motion';
import Button from '../components/Button';
import heroBg from '../assets/hero_bg.png';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cafe-texture"
    >
      {/* Background Image with Scale Animation */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Coffee Bean/Badge Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center justify-center border border-gold/40 px-4 py-1 bg-charcoal/80 backdrop-blur-sm"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold font-sans">
            ESTABLISHED IN 2026
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-bold leading-[1.1] mb-6"
        >
          Savor the Art of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-beige to-gold">
            Coffee & Fine Dining
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-cream/70 text-base md:text-lg lg:text-xl font-light mb-10 leading-relaxed font-sans"
        >
          Welcome to Urban Brew Café. We combine artisan-roasted coffee beans, gourmet locally-sourced ingredients, and a luxurious ambiance to deliver an unforgettable dining experience.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Button variant="primary" href="#menu" className="w-full sm:w-auto">
            Explore Menu
          </Button>
          <Button variant="secondary" href="#reservations" className="w-full sm:w-auto">
            Book a Table
          </Button>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-charcoal to-transparent z-20" />
    </section>
  );
}
