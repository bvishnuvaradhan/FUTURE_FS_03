import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ShieldCheck, UserCheck, Loader2 } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Validating mock credentials
      if (email === 'admin@urbanbrew.com' && password === 'admin123') {
        onLoginSuccess({ name: 'Café Admin', email: 'admin@urbanbrew.com', role: 'admin' });
        handleClose();
      } else if (email === 'user@urbanbrew.com' && password === 'user123') {
        onLoginSuccess({ name: 'Boga Vishnu', email: 'user@urbanbrew.com', role: 'user' });
        handleClose();
      } else {
        setError('Invalid email or password. Hint: Use the quick login buttons below!');
      }
    }, 1000);
  };

  const handleQuickLogin = (role) => {
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'admin') {
        onLoginSuccess({ name: 'Café Admin', email: 'admin@urbanbrew.com', role: 'admin' });
      } else {
        onLoginSuccess({ name: 'Boga Vishnu', email: 'user@urbanbrew.com', role: 'user' });
      }
      handleClose();
    }, 800);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Login Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 bg-charcoal border border-gold/20 z-55 shadow-2xl glass-panel text-left"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gold/10 pb-4 mb-6">
              <h3 className="font-serif text-2xl font-bold text-cream">Sign In</h3>
              <button 
                onClick={handleClose}
                className="text-cream/60 hover:text-gold transition-colors focus:outline-none cursor-pointer"
                aria-label="Close login modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-300 text-xs px-4 py-2.5 mb-6 font-sans tracking-wide">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="login-email" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40">
                    <Mail size={16} />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@urbanbrew.com or admin@urbanbrew.com"
                    className="w-full bg-charcoal/50 border border-gold/15 text-cream text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/25 rounded-none font-sans"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="login-password" className="text-[10px] uppercase tracking-widest text-cream/70 font-semibold mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40">
                    <Lock size={16} />
                  </span>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-charcoal/50 border border-gold/15 text-cream text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/25 rounded-none font-sans"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold text-charcoal border border-gold hover:bg-gold-hover hover:border-gold-hover py-3.5 uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Quick Login Section */}
            <div className="mt-8 pt-6 border-t border-gold/10">
              <span className="text-[9px] uppercase tracking-widest text-cream/40 font-semibold block mb-4 text-center font-sans">
                Quick-Test Profiles
              </span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('user')}
                  className="py-2.5 px-3 border border-gold/25 hover:border-gold text-cream/80 hover:text-cream text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 bg-charcoal-light/50 cursor-pointer rounded-none"
                >
                  <UserCheck size={12} className="text-gold" />
                  User Mode
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="py-2.5 px-3 border border-gold/25 hover:border-gold text-cream/80 hover:text-cream text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 bg-charcoal-light/50 cursor-pointer rounded-none"
                >
                  <ShieldCheck size={12} className="text-gold" />
                  Admin Mode
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
