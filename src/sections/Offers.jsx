import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export default function Offers() {
  const specialOffers = [
    {
      badge: "Sunday Special",
      title: "Weekend Brunch Fiesta",
      description: "Indulge in our exquisite sweet & savory brunch menu featuring gourmet waffles, eggs benedict, and artisan coffees. A perfect family experience.",
      discount: "20% OFF",
      schedule: "Every Sunday | 9:00 AM - 2:00 PM",
      image: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&q=80&w=800&h=600",
      icon: <Calendar className="text-gold" size={18} />
    },
    {
      badge: "Weekday Delight",
      title: "Specialty Espresso Hour",
      description: "Double the pleasure. Order any of our premium espresso-based drinks, single-origin pour-overs, or signature cold brews and get the second one free.",
      discount: "BUY 1 GET 1",
      schedule: "Mon - Fri | 2:00 PM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800&h=600",
      icon: <Clock className="text-gold" size={18} />
    }
  ];

  return (
    <section id="offers" className="py-24 md:py-32 bg-charcoal relative overflow-hidden cafe-texture">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-coffee/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 border border-gold/25 px-3.5 py-1 mb-4">
            <Sparkles size={12} className="text-gold" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold font-sans">
              Exclusive Promotions
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Special Experiences
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            Elevate your dining with our limited-time culinary experiences. Reserve your table ahead to lock in these exclusive offers.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {specialOffers.map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="glass-panel flex flex-col md:flex-row overflow-hidden border border-gold/15 shadow-2xl relative group"
            >
              {/* Image Container with Zoom */}
              <div className="md:w-1/2 h-[260px] md:h-auto overflow-hidden relative border-b md:border-b-0 md:border-r border-gold/15">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gold text-charcoal font-sans text-xs font-bold px-3 py-1.5 shadow-lg tracking-widest uppercase">
                  {offer.discount}
                </div>
              </div>

              {/* Offer Details */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between text-left">
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-gold/80 uppercase font-sans">
                    {offer.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-cream mt-2 mb-3 leading-tight group-hover:text-gold transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <p className="text-cream/65 font-sans text-xs md:text-sm font-light leading-relaxed mb-6">
                    {offer.description}
                  </p>
                </div>

                <div>
                  {/* Schedule Info */}
                  <div className="flex items-center gap-2 text-cream/70 text-xs font-sans tracking-wide mb-6 border-t border-cream/10 pt-4">
                    {offer.icon}
                    <span>{offer.schedule}</span>
                  </div>

                  {/* Reserve CTA */}
                  <Button variant="primary" href="#reservations" className="w-full text-center py-2.5">
                    Reserve Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
