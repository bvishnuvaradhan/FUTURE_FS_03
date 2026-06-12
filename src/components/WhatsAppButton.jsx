import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "1234567890"; // Mock number, replace with actual if needed
  const message = encodeURIComponent("Hello! I would like to make a reservation at Urban Brew Café.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
        
        {/* Main Icon */}
        <MessageCircle size={28} className="relative z-10" />

        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-charcoal-light border border-gold/20 text-cream text-xs px-3 py-1.5 rounded-none opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-sans tracking-widest uppercase shadow-lg">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
