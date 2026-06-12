import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CalendarRange, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard({ 
  ordersList, 
  reservationsList, 
  onUpdateOrderStatus,
  onUpdateReservationStatus,
  vacancyMap,
  onToggleVacancy
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'bookings', 'vacancy'

  // Calculations
  const activeOrdersCount = ordersList.filter(o => o.status !== 'Completed').length;
  const activeBookingsCount = reservationsList.length;
  
  let totalOccupiedTables = 0;
  let totalTables = 0;
  Object.keys(vacancyMap).forEach(zone => {
    vacancyMap[zone].forEach(table => {
      totalTables++;
      if (table.occupied) totalOccupiedTables++;
    });
  });

  const occupancyRate = totalTables > 0 ? Math.round((totalOccupiedTables / totalTables) * 100) : 0;

  return (
    <section id="admin-dashboard" className="py-24 md:py-32 bg-charcoal relative overflow-hidden cafe-texture min-h-screen">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-coffee/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Dashboard Title */}
        <div className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold mb-3 block font-sans">
              Management Portal
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream">
              Admin Control Center
            </h2>
          </div>
          
          {/* Quick Tab Selectors */}
          <div className="flex bg-charcoal-light border border-gold/20 p-1 rounded-none text-xs font-semibold uppercase tracking-widest font-sans self-start md:self-end">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 cursor-pointer focus:outline-none transition-all rounded-none ${
                activeTab === 'orders' ? 'bg-gold text-charcoal' : 'text-cream/65 hover:text-cream'
              }`}
            >
              Orders ({ordersList.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-5 py-2.5 cursor-pointer focus:outline-none transition-all rounded-none ${
                activeTab === 'bookings' ? 'bg-gold text-charcoal' : 'text-cream/65 hover:text-cream'
              }`}
            >
              Bookings ({reservationsList.length})
            </button>
            <button
              onClick={() => setActiveTab('vacancy')}
              className={`px-5 py-2.5 cursor-pointer focus:outline-none transition-all rounded-none ${
                activeTab === 'vacancy' ? 'bg-gold text-charcoal' : 'text-cream/65 hover:text-cream'
              }`}
            >
              Vacancy ({totalOccupiedTables}/{totalTables} Tables)
            </button>
          </div>
        </div>

        {/* Metrics Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Metrics Card 1 */}
          <div className="glass-card p-6 border border-gold/15 flex items-center gap-4 text-left">
            <div className="p-3 bg-charcoal border border-gold/15">
              <ShoppingBag className="text-gold" size={24} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-cream/50 uppercase font-semibold font-sans">Active Takeout/Delivery</span>
              <h4 className="font-serif text-2xl font-bold text-cream mt-0.5">{activeOrdersCount} Pending</h4>
            </div>
          </div>

          {/* Metrics Card 2 */}
          <div className="glass-card p-6 border border-gold/15 flex items-center gap-4 text-left">
            <div className="p-3 bg-charcoal border border-gold/15">
              <CalendarRange className="text-gold" size={24} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-cream/50 uppercase font-semibold font-sans">Table Reservations</span>
              <h4 className="font-serif text-2xl font-bold text-cream mt-0.5">{activeBookingsCount} Registered</h4>
            </div>
          </div>

          {/* Metrics Card 3 */}
          <div className="glass-card p-6 border border-gold/15 flex items-center gap-4 text-left">
            <div className="p-3 bg-charcoal border border-gold/15">
              <Sparkles className="text-gold" size={24} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-cream/50 uppercase font-semibold font-sans">Cafe Occupancy Rate</span>
              <h4 className="font-serif text-2xl font-bold text-cream mt-0.5">{occupancyRate}% Occupied</h4>
            </div>
          </div>
        </div>

        {/* Content Tabs render */}
        <div className="glass-panel p-6 md:p-8 border border-gold/15 shadow-2xl min-h-[400px]">
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-xl font-bold text-cream text-left mb-6 border-b border-gold/10 pb-3">
                Live Customer Orders
              </h3>

              {ordersList.length === 0 ? (
                <p className="text-cream/50 text-sm font-sans font-light py-10">No customer orders registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gold/20 text-gold uppercase tracking-wider font-semibold">
                        <th className="py-4 px-4">Order ID</th>
                        <th className="py-4 px-4">Items</th>
                        <th className="py-4 px-4">Type</th>
                        <th className="py-4 px-4">Dest/Address</th>
                        <th className="py-4 px-4">Total Price</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.map((order) => {
                        const isCompleted = order.status === 'Completed';
                        return (
                          <tr key={order.id} className="border-b border-gold/10 hover:bg-charcoal-light/30 transition-colors text-cream/80">
                            <td className="py-4 px-4 font-mono font-semibold text-gold">{order.id}</td>
                            <td className="py-4 px-4 max-w-[200px] leading-relaxed">
                              {order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ')}
                            </td>
                            <td className="py-4 px-4 capitalize font-semibold">{order.type}</td>
                            <td className="py-4 px-4 max-w-[220px] truncate leading-normal">
                              {order.type === 'delivery' ? order.address : 'In-Counter Pickup'}
                            </td>
                            <td className="py-4 px-4 font-semibold text-cream font-mono">₹{order.total}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold ${
                                order.status === 'Completed' ? 'bg-green-950/40 text-green-400 border border-green-500/20' :
                                order.status === 'Out for Delivery' ? 'bg-blue-950/40 text-blue-400 border border-blue-500/20' :
                                order.status === 'Preparing' ? 'bg-yellow-950/40 text-yellow-400 border border-yellow-500/20' :
                                'bg-gold/10 text-gold border border-gold/30'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              {!isCompleted && (
                                <button
                                  onClick={() => {
                                    const nextStatus = 
                                      order.status === 'Pending' ? 'Preparing' :
                                      order.status === 'Preparing' && order.type === 'delivery' ? 'Out for Delivery' :
                                      'Completed';
                                    onUpdateOrderStatus(order.id, nextStatus);
                                  }}
                                  className="px-3 py-1.5 border border-gold/30 text-gold text-[9px] uppercase font-semibold tracking-wider hover:bg-gold hover:text-charcoal transition-colors cursor-pointer rounded-none"
                                >
                                  {order.status === 'Pending' ? 'Start Prep' :
                                   order.status === 'Preparing' && order.type === 'delivery' ? 'Ship Order' :
                                   'Complete'}
                                </button>
                              )}
                              {isCompleted && (
                                <span className="text-cream/35 flex items-center justify-end gap-1 text-[10px]">
                                  <CheckCircle2 size={12} className="text-green-500" /> Done
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-xl font-bold text-cream text-left mb-6 border-b border-gold/10 pb-3">
                Reserved Table Logbook
              </h3>

              {reservationsList.length === 0 ? (
                <p className="text-cream/50 text-sm font-sans font-light py-10">No reservations registered yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gold/20 text-gold uppercase tracking-wider font-semibold">
                        <th className="py-4 px-4">Guest</th>
                        <th className="py-4 px-4">Contact</th>
                        <th className="py-4 px-4">Party Size</th>
                        <th className="py-4 px-4">Date</th>
                        <th className="py-4 px-4">Time</th>
                        <th className="py-4 px-4">Seating Zone</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservationsList.map((res, index) => {
                        return (
                          <tr key={index} className="border-b border-gold/10 hover:bg-charcoal-light/30 transition-colors text-cream/80">
                            <td className="py-4 px-4 font-serif text-sm font-semibold text-cream">{res.name}</td>
                            <td className="py-4 px-4">
                              <div>{res.email}</div>
                              <div className="text-[10px] text-cream/55">{res.phone}</div>
                            </td>
                            <td className="py-4 px-4 font-semibold text-center sm:text-left">{res.guests} {res.guests === '1' ? 'Guest' : 'Guests'}</td>
                            <td className="py-4 px-4 font-mono">{res.date}</td>
                            <td className="py-4 px-4 font-mono">{res.time}</td>
                            <td className="py-4 px-4 capitalize font-semibold text-gold">{res.seating}</td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => onUpdateReservationStatus(index)}
                                className="px-3 py-1.5 border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-950/20 text-[9px] uppercase font-semibold tracking-wider transition-colors cursor-pointer rounded-none"
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'vacancy' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 text-left"
            >
              <div className="border-b border-gold/10 pb-3 mb-6 flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-cream">
                  Real-Time Seat & Table Occupancy
                </h3>
                <span className="text-[10px] uppercase font-sans text-gold border border-gold/25 px-3 py-1">
                  Manual Overrides Enabled
                </span>
              </div>
              
              <p className="text-cream/60 font-light font-sans text-xs md:text-sm leading-relaxed mb-8">
                Click on any table box below to manually toggle its occupancy status. Red tables represent occupied seats (either manually set or reserved by customers). Green tables represent empty tables ready to seat incoming guests.
              </p>

              {/* Floor Layout Map */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.keys(vacancyMap).map((zoneId) => {
                  const zoneTitle = 
                    zoneId === 'booths' ? 'Cozy Booths' :
                    zoneId === 'window' ? 'Window Side' :
                    zoneId === 'bar' ? 'Coffee Bar' :
                    'Garden Patio';
                  
                  return (
                    <div key={zoneId} className="bg-charcoal/40 border border-gold/10 p-5 space-y-4">
                      <div className="border-b border-gold/10 pb-2 flex items-center justify-between text-cream">
                        <span className="font-serif text-sm font-bold uppercase tracking-wider">{zoneTitle}</span>
                        <span className="text-[10px] text-gold font-bold">
                          {vacancyMap[zoneId].filter(t => t.occupied).length}/5 Full
                        </span>
                      </div>
                      
                      {/* Tables list in this zone */}
                      <div className="grid grid-cols-5 gap-2 pt-2">
                        {vacancyMap[zoneId].map((table) => {
                          return (
                            <button
                              key={table.id}
                              type="button"
                              onClick={() => onToggleVacancy(zoneId, table.id)}
                              className={`aspect-square border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                                table.occupied 
                                  ? 'bg-red-950/40 border-red-500 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                                  : 'bg-green-950/30 border-green-500/50 text-green-300 hover:border-green-400'
                              }`}
                              title={`Table ${table.id} (${table.occupied ? 'Occupied' : 'Vacant'})`}
                            >
                              <span className="text-[10px] font-bold font-mono">{table.id}</span>
                              <span className="text-[7px] uppercase font-sans tracking-wide leading-none mt-0.5 opacity-60">
                                {table.occupied ? 'Full' : 'Empty'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
