import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarRange, CheckCircle2, Loader2, Users, Clock, Calendar, Armchair, Sun, Coffee, Trees } from 'lucide-react';
import Button from '../components/Button';

const seatingZones = [
  { 
    id: 'booths', 
    name: 'Cozy Booths', 
    icon: <Armchair size={18} className="text-gold" />,
    desc: 'Indoors, soft leather seats, warm lights' 
  },
  { 
    id: 'window', 
    name: 'Window Side', 
    icon: <Sun size={18} className="text-gold" />,
    desc: 'High tables, street views, bright light' 
  },
  { 
    id: 'bar', 
    name: 'Coffee Bar', 
    icon: <Coffee size={18} className="text-gold" />,
    desc: 'Watch baristas pull espresso shots close up' 
  },
  { 
    id: 'patio', 
    name: 'Garden Patio', 
    icon: <Trees size={18} className="text-gold" />,
    desc: 'Outdoors, lush green plants, fresh air' 
  }
];

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '18:00',
    guests: '2',
    seating: 'booths'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '18:00',
      guests: '2',
      seating: 'booths'
    });
    setIsSubmitted(false);
  };

  const activeZoneName = seatingZones.find(z => z.id === formData.seating)?.name || 'Cozy Booths';

  return (
    <section id="reservations" className="py-24 md:py-32 bg-charcoal-light relative overflow-hidden cafe-texture">
      {/* Accent Background Blobs */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-coffee/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Editorial Info */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 border border-gold/25 px-3.5 py-1 mb-4">
              <CalendarRange size={12} className="text-gold" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold font-sans">
                Fine Dining Bookings
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight">
              Secure Your Table <br />
              <span className="italic font-light">At Urban Brew</span>
            </h2>
            <p className="text-cream/70 font-sans text-sm md:text-base font-light leading-relaxed mb-6">
              We recommend reserving your table at least 24 hours in advance, especially during weekends and brunch hours, to guarantee your preferred seating.
            </p>
            <p className="text-cream/50 font-sans text-xs md:text-sm font-light leading-relaxed mb-8">
              For parties larger than 8 guests, private dining rooms, or special culinary events, please contact us directly via phone or WhatsApp.
            </p>

            {/* Quick stats / highlights */}
            <div className="flex flex-col gap-4 border-t border-gold/15 pt-6 w-full">
              <div className="flex items-center gap-3">
                <Users size={16} className="text-gold" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cream/80">Max 8 Guests online booking</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-gold" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cream/80">Dinner slots: 5:00 PM - 10:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Glassmorphism Form container */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full"
          >
            <div className="glass-panel p-8 md:p-12 border border-gold/15 shadow-2xl relative min-h-[460px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                
                {/* Form state */}
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                  >
                    <h3 className="font-serif text-2xl font-bold text-cream mb-8">
                      Book a Reservation
                    </h3>

                    {errorMsg && (
                      <div className="bg-red-950/40 border border-red-500/30 text-red-300 text-xs px-4 py-2.5 rounded-none font-sans tracking-wide">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name */}
                      <div className="flex flex-col">
                        <label htmlFor="res-name" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Name *</label>
                        <input
                          id="res-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="bg-charcoal/50 border border-gold/15 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/30 rounded-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col">
                        <label htmlFor="res-email" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Email *</label>
                        <input
                          id="res-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          className="bg-charcoal/50 border border-gold/15 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/30 rounded-none"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col">
                        <label htmlFor="res-phone" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Phone Number *</label>
                        <input
                          id="res-phone"
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your contact number"
                          className="bg-charcoal/50 border border-gold/15 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/30 rounded-none"
                        />
                      </div>

                      {/* Guests */}
                      <div className="flex flex-col">
                        <label htmlFor="res-guests" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Number of Guests</label>
                        <select
                          id="res-guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="bg-charcoal/50 border border-gold/15 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors rounded-none appearance-none cursor-pointer"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5">5 Guests</option>
                          <option value="6">6 Guests</option>
                          <option value="7">7 Guests</option>
                          <option value="8">8 Guests</option>
                        </select>
                      </div>

                      {/* Seating Area Interactive Map Selector */}
                      <div className="col-span-1 md:col-span-2 flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-3">Select Dining Zone *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {seatingZones.map((zone) => {
                            const isSelected = formData.seating === zone.id;
                            return (
                              <button
                                key={zone.id}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, seating: zone.id }))}
                                className={`p-4 border text-center transition-all duration-300 rounded-none cursor-pointer flex flex-col items-center justify-between min-h-[120px] ${
                                  isSelected 
                                    ? 'bg-gold/15 border-gold text-cream shadow-[0_0_15px_rgba(197,168,128,0.2)]' 
                                    : 'bg-charcoal/30 border-gold/10 text-cream/50 hover:border-gold/30 hover:text-cream'
                                }`}
                              >
                                <div className="p-2 border border-gold/15 bg-charcoal flex items-center justify-center">
                                  {zone.icon}
                                </div>
                                <div className="mt-2 text-[10px] uppercase tracking-widest font-bold font-sans leading-none">{zone.name}</div>
                                <div className="text-[8px] text-cream/40 leading-tight mt-1 hidden sm:block font-sans">{zone.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex flex-col">
                        <label htmlFor="res-date" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Date *</label>
                        <input
                          id="res-date"
                          type="date"
                          name="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={handleChange}
                          className="bg-charcoal/50 border border-gold/15 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors rounded-none w-full cursor-pointer"
                        />
                      </div>

                      {/* Time */}
                      <div className="flex flex-col">
                        <label htmlFor="res-time" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Preferred Time</label>
                        <select
                          id="res-time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="bg-charcoal/50 border border-gold/15 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors rounded-none appearance-none cursor-pointer"
                        >
                          <option value="08:00">08:00 AM (Brunch)</option>
                          <option value="09:30">09:30 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:30">12:30 PM (Lunch)</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="17:00">05:00 PM (Dinner)</option>
                          <option value="18:30">06:30 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="21:30">09:30 PM</option>
                        </select>
                      </div>

                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gold text-charcoal border border-gold hover:bg-gold-hover hover:border-gold-hover px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Confirming Details...
                          </>
                        ) : (
                          "Book Now"
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  
                  // Success State
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center text-center space-y-6 py-6"
                  >
                    <CheckCircle2 size={64} className="text-gold animate-bounce" />
                    
                    <h3 className="font-serif text-3xl font-bold text-cream">
                      Reservation Confirmed!
                    </h3>

                    <div className="max-w-md bg-charcoal/40 border border-gold/15 p-6 space-y-4">
                      <p className="text-cream/90 text-sm font-sans font-light leading-relaxed">
                        Thank you, <strong className="text-gold font-semibold">{formData.name}</strong>. Your table for <strong className="text-gold font-semibold">{formData.guests} {formData.guests === '1' ? 'guest' : 'guests'}</strong> has been successfully booked.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-left border-t border-gold/10 pt-4 text-xs uppercase tracking-wider font-sans text-cream/70">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gold" />
                          <span>{formData.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gold" />
                          <span>{formData.time}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-2 border-t border-gold/5 pt-2">
                          <Armchair size={14} className="text-gold" />
                          <span>Preferred Seating: <strong className="text-gold font-semibold">{activeZoneName}</strong></span>
                        </div>
                      </div>
                    </div>

                    <p className="text-cream/50 text-xs font-sans max-w-sm leading-relaxed">
                      We have sent a digital receipt to <span className="text-cream/80">{formData.email}</span> and a text reminder to <span className="text-cream/80">{formData.phone}</span>.
                    </p>

                    <Button variant="outline" onClick={resetForm} className="mt-4">
                      Book Another Table
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
