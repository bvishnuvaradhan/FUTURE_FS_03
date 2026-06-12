import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  className = '', 
  type = 'button' 
}) {
  const baseStyle = "relative px-8 py-3.5 uppercase tracking-widest text-xs font-semibold font-sans transition-all duration-300 overflow-hidden select-none cursor-pointer block text-center";
  
  const variants = {
    primary: "bg-gold text-charcoal hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] border border-gold hover:bg-gold-hover hover:border-gold-hover",
    secondary: "bg-transparent text-cream border border-cream/20 hover:border-cream hover:bg-cream/5",
    outline: "bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-gold/5",
  };

  const handleClick = (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    if (onClick) onClick(e);
  };

  const content = (
    <motion.button
      type={type}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );

  if (href && !href.startsWith('#')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return content;
}
