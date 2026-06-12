import { motion } from 'framer-motion';
import { Award, ShieldCheck, Flame } from 'lucide-react';
import coffeeImg from '../assets/coffee.png';

export default function About() {
  const features = [
    {
      icon: <Award className="text-gold" size={24} />,
      title: "Premium Grade Beans",
      description: "100% Arabica, single-origin beans sourced sustainably and roasted to perfection weekly."
    },
    {
      icon: <Flame className="text-gold" size={24} />,
      title: "Culinary Gastronomy",
      description: "Our world-class chefs curate gourmet recipes blending classical techniques with modern tastes."
    },
    {
      icon: <ShieldCheck className="text-gold" size={24} />,
      title: "Organic Ingredients",
      description: "From farm to table, we utilize fresh, hormone-free ingredients from local growers."
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-charcoal-light relative overflow-hidden cafe-texture">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-left"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 font-sans">
              Discover Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight">
              Crafting Memorable Moments <br />
              <span className="italic font-light">One Brew At A Time</span>
            </h2>
            <p className="text-cream/75 font-light leading-relaxed mb-6 font-sans">
              Founded in 2026, Urban Brew Café was born out of a desire to unite the sensory craft of specialty coffee with the elevated artistry of gourmet dining. We believe that a meal is more than just food—it's a celebration of flavors, community, and hospitality.
            </p>
            <p className="text-cream/60 font-light leading-relaxed mb-10 font-sans text-sm">
              Every single espresso shot we pull, every gourmet burger we grill, and every dessert we bake is treated as a masterpiece. Nestled in a premium, warm atmosphere, we invite you to sit back, relax, and savor the details.
            </p>

            {/* Core Values / Features */}
            <div className="flex flex-col gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-3 bg-charcoal border border-gold/15 rounded-none flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-gold mb-1">{feature.title}</h4>
                    <p className="text-cream/60 text-sm font-light leading-relaxed font-sans">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Creative Collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Background Frame Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-2 border-gold/10 pointer-events-none" />

            {/* Main Image Frame with Zoom Effect */}
            <div className="relative w-full h-[380px] md:h-[480px] lg:h-[520px] overflow-hidden border border-gold/20 shadow-2xl">
              <motion.img 
                src={coffeeImg} 
                alt="Artisan Craft Brewing" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-65 pointer-events-none" />
            </div>

            {/* Overlapping Floating Stats Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-6 -left-4 md:-left-8 bg-charcoal-light border border-gold/25 p-6 shadow-2xl glass-card flex flex-col items-center justify-center min-w-[150px] text-center"
            >
              <span className="font-serif text-4xl font-bold text-gold">100%</span>
              <span className="text-[10px] tracking-widest text-cream/70 uppercase font-semibold font-sans mt-1">
                Satisfactory Rate
              </span>
            </motion.div>

            {/* Floating Chef Recommendation Overlay */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-6 -right-4 md:-right-8 bg-charcoal border border-gold/25 p-4 shadow-2xl glass-card flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full border border-gold overflow-hidden bg-cream flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Chef" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-left">
                <p className="text-[10px] tracking-widest text-gold uppercase font-semibold font-sans">Chef Recommendation</p>
                <p className="font-serif text-sm font-semibold text-cream">Truffle Alfredo</p>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
