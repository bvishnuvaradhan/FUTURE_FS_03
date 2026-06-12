import React from 'react';
import { motion } from 'framer-motion';
import diningImg from '../assets/dining.png';
import coffeeImg from '../assets/coffee.png';
import burgerImg from '../assets/burger.png';
import cheesecakeImg from '../assets/cheesecake.png';
import heroBgImg from '../assets/hero_bg.png';

export default function Gallery() {
  const galleryItems = [
    {
      title: "Luxurious Dining Lounge",
      category: "Interior",
      image: diningImg,
      heightClass: "h-80"
    },
    {
      title: "Artisan Latte Art",
      category: "Coffee Bar",
      image: coffeeImg,
      heightClass: "h-96"
    },
    {
      title: "La Marzocco Espresso Station",
      category: "Coffee Bar",
      image: heroBgImg,
      heightClass: "h-64"
    },
    {
      title: "Wagyu Signature Plating",
      category: "Culinary",
      image: burgerImg,
      heightClass: "h-96"
    },
    {
      title: "Grand Strawberry Patisserie",
      category: "Desserts",
      image: cheesecakeImg,
      heightClass: "h-80"
    },
    {
      title: "Evening Artisan Cocktails",
      category: "Beverages",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=500&h=750",
      heightClass: "h-96"
    },
    {
      title: "Culinary Kitchen Crafting",
      category: "Team",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=500&h=650",
      heightClass: "h-[450px]"
    },
    {
      title: "Warm Cozy Corner",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=500&h=700",
      heightClass: "h-[400px]"
    }
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-charcoal-light relative overflow-hidden cafe-texture">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 block font-sans">
            Visual Ambiance
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Our Cafe Gallery
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            Take a visual tour through Urban Brew Café. Explore our hand-designed seating, premium brewing station, and freshly cooked cuisines.
          </p>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
              className="relative overflow-hidden border border-gold/15 shadow-xl break-inside-avoid group cursor-pointer"
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Hover Dark Overlay & Title */}
              <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold font-sans mb-1.5">
                  {item.category}
                </span>
                <h4 className="font-serif text-xl font-bold text-cream leading-tight">
                  {item.title}
                </h4>
              </div>

              {/* Subtle Corner Accents (Static) */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/25 opacity-60 group-hover:opacity-100 group-hover:border-gold transition-all duration-300" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/25 opacity-60 group-hover:opacity-100 group-hover:border-gold transition-all duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
