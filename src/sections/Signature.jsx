import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award } from 'lucide-react';
import burgerImg from '../assets/burger.png';
import coffeeImg from '../assets/coffee.png';
import cheesecakeImg from '../assets/cheesecake.png';
import Button from '../components/Button';

export default function Signature() {
  const signatureDishes = [
    {
      badge: "Chef's Signature",
      name: "Truffle Glazed Wagyu Burger",
      description: "A masterclass in taste. Hand-pressed Wagyu beef patty cooked to medium perfection, topped with freshly shaved black truffles, melted mature English cheddar, caramelized port-infused onions, and house-made smoked garlic aioli on a toasted buttered brioche bun.",
      price: "₹890",
      rating: 5,
      reviews: "120+ Ratings",
      image: burgerImg,
      alignLeft: true
    },
    {
      badge: "Barista Special",
      name: "Artisan Coffee Experience",
      description: "A sensory journey. Enjoy a custom-roasted double shot espresso pulled on our state-of-the-art La Marzocco, paired with a miniature single-origin pour-over (Ethiopian Yirgacheffe) and a freshly baked butter croissant. Comes with custom tasting notes.",
      price: "₹450",
      rating: 4.9,
      reviews: "350+ Ratings",
      image: coffeeImg,
      alignLeft: false
    },
    {
      badge: "Master Patissier Recommend",
      name: "Grand Strawberry Glaze Cheesecake",
      description: "Creamy, velvety New York style cheesecake baked slowly over a buttery graham cracker crust. Smothered in our homemade, sweet organic strawberry reduction and garnished with fresh organic strawberries and fresh garden mint leaves.",
      price: "₹380",
      rating: 5,
      reviews: "80+ Ratings",
      image: cheesecakeImg,
      alignLeft: true
    }
  ];

  return (
    <section id="signature" className="py-24 md:py-32 bg-charcoal relative overflow-hidden cafe-texture">
      {/* Abstract background blobs */}
      <div className="absolute top-1/3 right-1/10 w-[400px] h-[400px] bg-coffee/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/10 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 border border-gold/25 px-3.5 py-1 mb-4">
            <Award size={12} className="text-gold" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold font-sans">
              Culinary Spotlights
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Signature Creations
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            The dishes and beverages that define us. Handcrafted with passion, these chef favorites showcase the heart and soul of Urban Brew Café.
          </p>
        </div>

        {/* Showcase Layout */}
        <div className="flex flex-col gap-24 md:gap-32">
          {signatureDishes.map((dish, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
                dish.alignLeft ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Frame */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 aspect-4/3 overflow-hidden border border-gold/20 shadow-2xl relative group"
              >
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              </motion.div>

              {/* Dish Metadata */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 text-left flex flex-col items-start"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold bg-gold/5 border border-gold/20 px-3 py-1 mb-4 font-sans">
                  {dish.badge}
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-3 leading-tight">
                  {dish.name}
                </h3>

                {/* Rating & Pricing Row */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="font-serif text-2xl font-bold text-gold">
                    {dish.price}
                  </span>
                  <div className="h-4 w-[1px] bg-cream/20" />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(dish.rating) ? "text-gold fill-gold" : "text-cream/20"} 
                      />
                    ))}
                    <span className="text-xs font-semibold text-cream/70 font-sans ml-1">
                      {dish.rating} ({dish.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-cream/75 font-sans font-light leading-relaxed mb-8 text-sm md:text-base">
                  {dish.description}
                </p>

                <Button variant="outline" href="#reservations">
                  Book Table to Try
                </Button>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
