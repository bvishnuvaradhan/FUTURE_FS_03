import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import burgerImg from '../assets/burger.png';
import cheesecakeImg from '../assets/cheesecake.png';
import espressoImg from '../assets/espresso.png';

const categories = ['All', 'Coffee', 'Main Course', 'Desserts', 'Beverages'];

const menuItems = [
  // Coffee
  {
    id: 1,
    category: 'Coffee',
    name: 'Single-Origin Espresso',
    description: 'Double shot of concentrated espresso brewed from our premium Ethiopian house blend.',
    price: '₹180',
    image: espressoImg
  },
  {
    id: 2,
    category: 'Coffee',
    name: 'Classic Cappuccino',
    description: 'Perfect balance of rich espresso, velvety steamed milk, and a thick layer of micro-foam.',
    price: '₹220',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 3,
    category: 'Coffee',
    name: 'Artisan Cafe Latte',
    description: 'Smooth espresso poured over creamy steamed milk, decorated with professional latte art.',
    price: '₹240',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 4,
    category: 'Coffee',
    name: 'Velvet Mocha',
    description: 'Decadent fusion of rich espresso, dark chocolate ganache, and steamed milk with cocoa dust.',
    price: '₹280',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400&h=400'
  },
  
  // Main Course
  {
    id: 5,
    category: 'Main Course',
    name: 'Urban Gourmet Burger',
    description: 'Flame-grilled Wagyu beef patty, sharp cheddar, heirloom tomato, baby arugula, brioche bun, house sauce.',
    price: '₹590',
    image: burgerImg // Generated image
  },
  {
    id: 6,
    category: 'Main Course',
    name: 'Herb Grilled Chicken',
    description: 'Marinated chicken breast served with roasted seasonal vegetables, fingerling potatoes, and garlic rosemary jus.',
    price: '₹650',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 7,
    category: 'Main Course',
    name: 'Fettuccine Alfredo',
    description: 'Fresh pasta tossed in a rich, velvety garlic parmesan cream sauce, topped with microgreens.',
    price: '₹520',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 8,
    category: 'Main Course',
    name: 'Organic Veggie Bowl',
    description: 'Roasted quinoa, ripe avocado, roasted chickpeas, organic kale, pickled cabbage, tahini dressing.',
    price: '₹450',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=400'
  },

  // Desserts
  {
    id: 9,
    category: 'Desserts',
    name: 'Belgian Chocolate Ganache',
    description: 'Decadent dark chocolate flourless cake with fresh raspberry coulis and double cream.',
    price: '₹320',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 10,
    category: 'Desserts',
    name: 'Strawberry Glazed Cheesecake',
    description: 'Classic rich and creamy New York baked cheesecake topped with glazed strawberries and mint.',
    price: '₹350',
    image: cheesecakeImg // Generated image
  },
  {
    id: 11,
    category: 'Desserts',
    name: 'Fudge Gelato Brownie',
    description: 'Warm, gooey chocolate fudge brownie topped with a scoop of organic Madagascar vanilla bean gelato.',
    price: '₹290',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400&h=400'
  },

  // Beverages
  {
    id: 12,
    category: 'Beverages',
    name: 'Cold-Pressed Immunity Juice',
    description: 'Refreshing blend of organic oranges, fresh carrots, turmeric, and ginger root.',
    price: '₹180',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 13,
    category: 'Beverages',
    name: 'Wild Berry Superfood Smoothie',
    description: 'Creamy blend of wild blueberries, Greek yogurt, organic chia seeds, raw honey, and almond milk.',
    price: '₹220',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 14,
    category: 'Beverages',
    name: 'Hibiscus Lime Iced Tea',
    description: 'Hand-steeped organic hibiscus flower tea with fresh key lime and sprigs of fresh mint.',
    price: '₹160',
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export default function Menu({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-24 md:py-32 bg-charcoal-light relative overflow-hidden cafe-texture">
      
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 block font-sans">
            Curated Culinary Selection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Our Featured Menu
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            Take a look at our selection of handcrafted drinks, savory meals, and decadent desserts made with premium ingredients.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-2.5 uppercase tracking-widest text-[10px] font-semibold font-sans transition-all duration-300 rounded-none border focus:outline-none cursor-pointer ${
                activeTab === category
                  ? 'bg-gold text-charcoal border-gold'
                  : 'bg-transparent text-cream/70 border-cream/10 hover:text-cream hover:border-cream/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="glass-card flex flex-col justify-between overflow-hidden border border-gold/10 group h-full shadow-lg"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-[220px] overflow-hidden border-b border-gold/10">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-left">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="font-serif text-lg font-bold text-gold shrink-0">
                        {item.price}
                      </span>
                    </div>
                    
                    <p className="text-cream/60 font-sans text-xs md:text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Add to Bag CTA */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="w-full py-2 border border-gold/30 text-gold text-[10px] uppercase font-semibold tracking-widest hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Add to Bag</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
