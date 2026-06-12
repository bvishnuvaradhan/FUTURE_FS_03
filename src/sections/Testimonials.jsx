import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      stars: 5,
      quote: "Amazing food and coffee. Highly recommended.",
      details: "The Truffle Wagyu Burger was cooked to perfection and the latte art was simply a masterpiece. The staff went above and beyond.",
      author: "Sophia Carter",
      role: "Local Food Guide",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      stars: 5,
      quote: "Beautiful atmosphere and excellent service.",
      details: "The warm ambient lighting and custom wood details make it the perfect place for a relaxed Sunday brunch or an intimate evening dinner date.",
      author: "Liam Henderson",
      role: "Regular Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      stars: 5,
      quote: "One of the best cafés in the city.",
      details: "They treat specialty coffee brewing as a pure science. Their single-origin Ethiopian pour-overs are absolutely incredible.",
      author: "Elena Rostova",
      role: "Coffee Connoisseur",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-charcoal relative overflow-hidden cafe-texture">
      {/* Background glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 block font-sans">
            Client Appreciations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            What Our Guests Say
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            We take pride in providing exceptional hospitality. Here are some reviews from our beloved community of food and coffee lovers.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="glass-card p-8 flex flex-col justify-between items-start text-left relative"
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-6 right-6 text-gold/10 pointer-events-none" size={40} />

              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Star Quote */}
                <h3 className="font-serif text-xl font-bold text-cream mb-4 leading-tight">
                  "{review.quote}"
                </h3>

                {/* Detailed description */}
                <p className="text-cream/70 font-sans text-xs md:text-sm font-light leading-relaxed mb-8">
                  {review.details}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto border-t border-gold/10 pt-6 w-full">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/20 flex-shrink-0">
                  <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-gold leading-none mb-1">
                    {review.author}
                  </h4>
                  <span className="text-[10px] tracking-wider text-cream/50 uppercase font-semibold font-sans">
                    {review.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
