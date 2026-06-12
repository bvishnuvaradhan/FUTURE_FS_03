import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Compass } from 'lucide-react';

export default function Contact() {
  const contactDetails = [
    {
      icon: <MapPin className="text-gold" size={20} />,
      label: "Our Location",
      value: "582 Artisan Boulevard, Suite 100, Seattle, WA 98101",
      link: "https://maps.google.com"
    },
    {
      icon: <Phone className="text-gold" size={20} />,
      label: "Phone Number",
      value: "+1 (206) 555-0198",
      link: "tel:+12065550198"
    },
    {
      icon: <Mail className="text-gold" size={20} />,
      label: "Email Address",
      value: "hello@urbanbrewcafe.com",
      link: "mailto:hello@urbanbrewcafe.com"
    }
  ];

  const socialLinks = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      url: "https://facebook.com",
      label: "Facebook"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
      url: "https://instagram.com",
      label: "Instagram"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      ),
      url: "https://twitter.com",
      label: "Twitter"
    },
    { 
      icon: <Compass size={18} />, 
      url: "https://yelp.com", 
      label: "Yelp" 
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-charcoal relative overflow-hidden cafe-texture">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-coffee/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 block font-sans">
            Connect & Visit
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Location & Contact
          </h2>
          <p className="text-cream/60 font-light font-sans text-sm md:text-base leading-relaxed">
            Drop by for a fresh brew or get in touch. We are always thrilled to hear from you.
          </p>
        </div>

        {/* Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Contact Cards & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between text-left gap-10"
          >
            {/* Info details */}
            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <a 
                  key={idx}
                  href={detail.link} 
                  target={detail.link.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="flex gap-4 p-5 bg-charcoal-light border border-gold/10 hover:border-gold/25 transition-all duration-300 group"
                >
                  <div className="p-3 bg-charcoal border border-gold/15 group-hover:border-gold/30 rounded-none flex-shrink-0 transition-colors">
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-cream/50 font-semibold mb-1 font-sans">
                      {detail.label}
                    </h4>
                    <p className="font-serif text-base text-cream group-hover:text-gold transition-colors leading-relaxed">
                      {detail.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Opening Hours */}
            <div className="p-6 md:p-8 bg-charcoal-light border border-gold/10">
              <div className="flex items-center gap-2 border-b border-gold/15 pb-4 mb-4">
                <Clock size={16} className="text-gold" />
                <h3 className="font-serif text-lg font-bold text-cream">Opening Hours</h3>
              </div>
              <div className="space-y-3 font-sans text-sm font-light text-cream/70">
                <div className="flex justify-between items-center border-b border-cream/5 pb-2">
                  <span>Monday – Friday</span>
                  <span className="font-medium text-cream">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span>Saturday – Sunday</span>
                  <span className="font-medium text-cream">9:00 AM – 11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-cream/50 font-semibold font-sans">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 border border-gold/30 hover:border-gold text-cream/80 hover:text-gold rounded-none flex items-center justify-center transition-colors shadow-md bg-charcoal-light"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Map Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px] border border-gold/15 shadow-2xl relative"
          >
            {/* Embedded styled Map */}
            <iframe
              title="Urban Brew Cafe Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.7547141527715!2d-122.33649472346914!3d47.60759087119047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab45012543f%3A0x868b42217c01b0f5!2s582%20Artisan%20Blvd!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(85%) contrast(110%)', opacity: 0.85 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
