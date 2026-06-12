import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Flame, ShieldAlert, Cpu, Coffee } from 'lucide-react';
import grindingImg from '../assets/grinding.png';
import espressoImg from '../assets/espresso.png';
import coffeeImg from '../assets/coffee.png';

const steps = [
  {
    icon: <Globe className="text-gold" size={24} />,
    title: "1. Ethical Sourcing",
    subtitle: "High-Altitude Farms",
    description: "We source organic, 100% Arabica beans directly from high-altitude micro-lots in Ethiopia, Colombia, and Sumatra, ensuring fair wages for local farming cooperatives.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    icon: <Flame className="text-gold" size={24} />,
    title: "2. Micro-Roasting",
    subtitle: "Artisanal Profiles",
    description: "Our beans are light-to-medium roasted in weekly small batches to unlock their unique single-origin profiles, featuring floral, citrus, and chocolaty undertones.",
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=500&h=300"
  },
  {
    icon: <ShieldAlert className="text-gold" size={24} />,
    title: "3. Burr Grinding",
    subtitle: "Micron Precision",
    description: "We use professional flat burr grinders calibrated daily to exact micron metrics to ensure maximum uniformity and prevent overheating during the grind.",
    image: grindingImg
  },
  {
    icon: <Cpu className="text-gold" size={24} />,
    title: "4. Precision Extraction",
    subtitle: "La Marzocco 9-Bar Pulls",
    description: "Water is filtered and heated to exactly 93.5°C, then pushed at a steady 9 bars of pressure through double-spouted portafilters to yield perfect golden crema.",
    image: espressoImg
  },
  {
    icon: <Coffee className="text-gold" size={24} />,
    title: "5. Milk Micro-Foam",
    subtitle: "Latte Art Presentation",
    description: "Whole organic milk is steamed to exactly 65°C, creating a silky micro-foam texture that blends harmoniously with espresso, poured with custom latte art.",
    image: coffeeImg
  }
];

export default function BrewingProcess() {
  return (
    <section id="brewing" className="py-24 md:py-32 bg-charcoal relative overflow-hidden cafe-texture">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-coffee/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 block font-sans">
            Craftsmanship
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            The Bean-To-Cup Journey
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            Specialty coffee is a meticulous science. Learn how we craft every single cup of coffee we serve at Urban Brew.
          </p>
        </div>

        {/* Timeline Items Grid */}
        <div className="relative">
          {/* Timeline center line for desktops */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gold/10 hidden lg:block -translate-x-1/2" />

          <div className="flex flex-col gap-16 lg:gap-24 relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-[45%] text-left"
                  >
                    <div className="glass-card overflow-hidden border border-gold/10 relative hover:border-gold/30 transition-all duration-300 group">
                      
                      {/* Image Banner */}
                      <div className="h-44 w-full overflow-hidden border-b border-gold/10 relative">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
                        />
                        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      <div className="p-8">
                        <div className="p-3 bg-charcoal border border-gold/15 w-fit mb-6">
                          {step.icon}
                        </div>
                        
                        <span className="text-[10px] tracking-widest text-gold uppercase font-semibold font-sans">
                          {step.subtitle}
                        </span>
                        
                        <h3 className="font-serif text-2xl font-bold text-cream mt-1 mb-3">
                          {step.title}
                        </h3>
                        
                        <p className="text-cream/70 font-sans text-xs md:text-sm font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bullet Center Connector */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1.2, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className="w-4 h-4 rounded-full bg-gold border-4 border-charcoal shadow-lg shadow-gold/50"
                    />
                  </div>

                  {/* Spacer for desktops */}
                  <div className="w-full lg:w-[45%] hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
