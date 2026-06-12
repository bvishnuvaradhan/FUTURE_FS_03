import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Loader2, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';
import Button from './Button';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart,
  onPlaceOrder
}) {
  const [orderType, setOrderType] = useState('pickup'); // 'pickup' or 'delivery'
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const [confirmedDetails, setConfirmedDetails] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10);
    return acc + (priceNum * item.quantity);
  }, 0);

  const deliveryFee = 50;
  const total = orderType === 'delivery' ? subtotal + deliveryFee : subtotal;

  const handleCheckout = (e) => {
    e.preventDefault();

    if (orderType === 'delivery' && !address) {
      alert('Please enter a delivery address.');
      return;
    }

    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      const generatedId = `UB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNum(generatedId);
      
      const orderData = {
        id: generatedId,
        items: cartItems,
        type: orderType,
        address: address,
        landmark: landmark,
        total: total,
        status: 'Pending'
      };
      
      setConfirmedDetails(orderData);

      if (onPlaceOrder) {
        onPlaceOrder(orderData);
      }

      // Clear inputs
      setAddress('');
      setLandmark('');
      onClearCart();
    }, 1800);
  };

  const closeAndReset = () => {
    setIsSuccess(false);
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
            onClick={closeAndReset}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Cart Panel Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-charcoal border-l border-gold/15 z-55 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold" />
                <h3 className="font-serif text-lg font-bold text-cream uppercase tracking-wider">
                  Takeout Bag
                </h3>
              </div>
              <button 
                onClick={closeAndReset}
                className="text-cream/70 hover:text-gold transition-colors focus:outline-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Items Panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Order success screen */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full space-y-6"
                  >
                    <CheckCircle2 size={56} className="text-gold animate-bounce" />
                    <h4 className="font-serif text-2xl font-bold text-cream">Order Confirmed!</h4>
                    
                    <p className="text-cream/75 text-sm font-sans font-light leading-relaxed max-w-xs">
                      Thank you! Your order <strong className="text-gold font-semibold">{orderNum}</strong> has been successfully placed.
                    </p>

                    <div className="bg-charcoal-light border border-gold/15 p-5 w-full text-xs font-sans text-cream/70 text-left space-y-3 uppercase tracking-wider">
                      <div className="flex justify-between border-b border-gold/10 pb-2">
                        <span>Order Type:</span>
                        <span className="text-gold font-bold">{confirmedDetails?.type}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold/10 pb-2">
                        <span>Total Paid:</span>
                        <span className="text-gold font-bold">₹{confirmedDetails?.total}</span>
                      </div>
                      <div className="flex justify-between border-b border-gold/10 pb-2">
                        <span>Est. Duration:</span>
                        <span className="text-gold font-bold">
                          {confirmedDetails?.type === 'delivery' ? '35 Mins' : '15 Mins'}
                        </span>
                      </div>
                      {confirmedDetails?.type === 'delivery' && (
                        <div className="pt-1 text-[10px] text-cream/50 leading-relaxed font-sans normal-case">
                          <strong className="text-cream/70 block uppercase tracking-widest text-[9px] mb-1">Delivering To:</strong>
                          {confirmedDetails?.address}
                          {confirmedDetails?.landmark && <span className="block mt-1">Landmark: {confirmedDetails?.landmark}</span>}
                        </div>
                      )}
                    </div>

                    <Button variant="outline" onClick={closeAndReset} className="w-full">
                      Return to Menu
                    </Button>
                  </motion.div>
                ) : cartItems.length === 0 ? (
                  /* Empty state */
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  >
                    <ShoppingBag size={48} className="text-cream/20" />
                    <p className="text-cream/50 text-sm font-sans font-light">
                      Your takeout bag is empty. Explore our menu to add items!
                    </p>
                  </motion.div>
                ) : (
                  /* Items list & Delivery address inputs */
                  <motion.div key="list" className="space-y-6">
                    
                    {/* Pickup / Delivery toggle */}
                    <div className="flex border border-gold/20 p-1 bg-charcoal-light w-full">
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        className={`flex-1 py-2 uppercase tracking-widest text-[9px] font-semibold transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none ${
                          orderType === 'pickup' 
                            ? 'bg-gold text-charcoal' 
                            : 'bg-transparent text-cream/60 hover:text-cream'
                        }`}
                      >
                        <ShieldCheck size={12} />
                        Self-Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`flex-1 py-2 uppercase tracking-widest text-[9px] font-semibold transition-all duration-300 rounded-none cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none ${
                          orderType === 'delivery' 
                            ? 'bg-gold text-charcoal' 
                            : 'bg-transparent text-cream/60 hover:text-cream'
                        }`}
                      >
                        <Truck size={12} />
                        Home Delivery
                      </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-cream/50 font-semibold text-left border-b border-gold/10 pb-2 font-sans">
                        Selected Items
                      </h4>
                      {cartItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex gap-4 p-4 bg-charcoal-light border border-gold/10 hover:border-gold/20 transition-all flex-shrink-0"
                        >
                          {/* Thumbnail */}
                          <div className="w-16 h-16 bg-charcoal border border-gold/15 overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between text-left">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-serif text-sm font-semibold text-cream leading-tight">
                                {item.name}
                              </h4>
                              <button 
                                onClick={() => onRemoveItem(item.id)}
                                className="text-cream/30 hover:text-red-400 transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gold/20 text-xs">
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-gold/10 hover:text-gold transition-colors cursor-pointer"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="px-2 text-cream font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-gold/10 hover:text-gold transition-colors cursor-pointer"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              
                              {/* Price */}
                              <span className="font-serif text-sm font-semibold text-gold">
                                ₹{(parseInt(item.price.replace(/[^\d]/g, ''), 10) * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Form inputs */}
                    {orderType === 'delivery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 text-left pt-2 border-t border-gold/10"
                      >
                        <h4 className="text-[10px] uppercase tracking-widest text-cream/50 font-semibold font-sans mb-1">
                          Delivery Information
                        </h4>
                        
                        <div className="flex flex-col">
                          <label htmlFor="del-address" className="text-[9px] uppercase tracking-wider text-cream/60 font-semibold mb-1.5 font-sans">
                            Address *
                          </label>
                          <textarea
                            id="del-address"
                            required
                            rows="2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your complete delivery address"
                            className="bg-charcoal-light border border-gold/15 text-cream text-xs px-3 py-2.5 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/25 rounded-none font-sans"
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="del-landmark" className="text-[9px] uppercase tracking-wider text-cream/60 font-semibold mb-1.5 font-sans">
                            Landmark / Instructions
                          </label>
                          <input
                            id="del-landmark"
                            type="text"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            placeholder="e.g. Near central park gate 2, ring doorbell"
                            className="bg-charcoal-light border border-gold/15 text-cream text-xs px-3 py-2.5 focus:outline-none focus:border-gold transition-colors placeholder:text-cream/25 rounded-none font-sans"
                          />
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom summary and check out actions */}
            {!isSuccess && cartItems.length > 0 && (
              <div className="p-6 border-t border-gold/15 bg-charcoal-light space-y-4">
                
                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs font-sans text-cream/70">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-serif text-sm font-semibold text-cream">₹{subtotal}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between items-center text-cream/50">
                      <span className="flex items-center gap-1"><Truck size={10} /> Delivery Charge</span>
                      <span className="font-serif text-sm font-semibold text-cream/70">₹{deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-gold/10 pt-2 text-cream">
                    <span className="text-xs uppercase tracking-widest font-bold">Total Amount</span>
                    <span className="font-serif text-lg font-bold text-gold">₹{total}</span>
                  </div>
                </div>
                
                <p className="text-[9px] text-cream/50 text-left leading-normal font-sans pt-1">
                  {orderType === 'delivery' 
                    ? "* Delivery charges are flat across our coverage radius. Delivery orders are packaged in eco-friendly container bags."
                    : "* All takeout orders are prepared fresh for self-pickup at our espresso counter. Please pick up within 30 minutes of order confirmation."
                  }
                </p>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gold text-charcoal border border-gold hover:bg-gold-hover hover:border-gold-hover px-8 py-3.5 uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place {orderType === 'delivery' ? 'Delivery' : 'Pickup'} Order
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
