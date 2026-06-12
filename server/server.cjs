const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("CRITICAL: MONGODB_URI is not defined in the environment variables!");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    seedInitialData();
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

// --- Database Schemas & Models ---

// 1. User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'] }
});
const User = mongoose.model('User', userSchema);

// 2. Order Schema
const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: String, required: true }
    }
  ],
  type: { type: String, required: true, enum: ['pickup', 'delivery'] },
  address: { type: String, default: '' },
  landmark: { type: String, default: '' },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Completed'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// 3. Reservation Schema
const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seating: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Reservation = mongoose.model('Reservation', reservationSchema);

// 4. Vacancy Schema (Zone based tables tracker)
const vacancySchema = new mongoose.Schema({
  zone: { type: String, required: true, unique: true }, // 'booths', 'window', 'bar', 'patio'
  tables: [
    {
      id: { type: String, required: true },
      occupied: { type: Boolean, required: true, default: false }
    }
  ]
});
const Vacancy = mongoose.model('Vacancy', vacancySchema);

// --- Seed Initial Data if Database is Empty ---
async function seedInitialData() {
  try {
    // 1. Seed Users (ensuring hashed passwords)
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const userHash = bcrypt.hashSync('user123', 10);
      const adminHash = bcrypt.hashSync('admin123', 10);
      await User.insertMany([
        { name: 'Boga Vishnu', email: 'user@urbanbrew.com', password: userHash, role: 'user' },
        { name: 'Café Admin', email: 'admin@urbanbrew.com', password: adminHash, role: 'admin' }
      ]);
      console.log("Seeded default User and Admin accounts with hashed passwords.");
    } else {
      // Clean up legacy plain text passwords in Atlas if they exist
      const legacyUsers = await User.find({ password: { $not: /^\$2[ayb]\$.{56}$/ } });
      if (legacyUsers.length > 0) {
        console.log("Found legacy plain-text passwords. Updating them to secure hashes...");
        for (const u of legacyUsers) {
          u.password = bcrypt.hashSync(u.password, 10);
          await u.save();
        }
        console.log("Legacy passwords updated.");
      }
    }

    // 2. Seed Vacancy Map
    const vacancyCount = await Vacancy.countDocuments();
    if (vacancyCount === 0) {
      await Vacancy.insertMany([
        {
          zone: 'booths',
          tables: [
            { id: 'B1', occupied: true },
            { id: 'B2', occupied: false },
            { id: 'B3', occupied: false },
            { id: 'B4', occupied: true },
            { id: 'B5', occupied: false }
          ]
        },
        {
          zone: 'window',
          tables: [
            { id: 'W1', occupied: false },
            { id: 'W2', occupied: false },
            { id: 'W3', occupied: true },
            { id: 'W4', occupied: false },
            { id: 'W5', occupied: false }
          ]
        },
        {
          zone: 'bar',
          tables: [
            { id: 'K1', occupied: true },
            { id: 'K2', occupied: true },
            { id: 'K3', occupied: false },
            { id: 'K4', occupied: false },
            { id: 'K5', occupied: false }
          ]
        },
        {
          zone: 'patio',
          tables: [
            { id: 'P1', occupied: false },
            { id: 'P2', occupied: true },
            { id: 'P3', occupied: false },
            { id: 'P4', occupied: false },
            { id: 'P5', occupied: false }
          ]
        }
      ]);
      console.log("Seeded initial table vacancy layouts.");
    }

    // 3. Seed Initial Orders if empty
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.insertMany([
        {
          id: 'UB-192834',
          items: [
            { name: 'Urban Gourmet Burger', quantity: 1, price: '₹590' },
            { name: 'Artisan Cafe Latte', quantity: 2, price: '₹240' }
          ],
          type: 'delivery',
          address: '742 Evergreen Terrace, Seattle, WA',
          landmark: 'Near Springfield Park',
          total: 1120,
          status: 'Preparing'
        },
        {
          id: 'UB-839210',
          items: [
            { name: 'Strawberry Glazed Cheesecake', quantity: 1, price: '₹350' },
            { name: 'Velvet Mocha', quantity: 1, price: '₹280' }
          ],
          type: 'pickup',
          address: '',
          landmark: '',
          total: 630,
          status: 'Pending'
        }
      ]);
      console.log("Seeded default customer orders.");
    }

    // 4. Seed Initial Reservations if empty
    const resCount = await Reservation.countDocuments();
    if (resCount === 0) {
      await Reservation.insertMany([
        {
          name: 'Elena Rostova',
          email: 'elena@connoisseur.com',
          phone: '+1 (206) 555-8932',
          guests: '2',
          date: '2026-06-15',
          time: '18:30',
          seating: 'booths'
        },
        {
          name: 'Liam Henderson',
          email: 'liam@techcorp.io',
          phone: '+1 (206) 555-1029',
          guests: '4',
          date: '2026-06-14',
          time: '12:30',
          seating: 'patio'
        }
      ]);
      console.log("Seeded default customer reservations.");
    }

  } catch (err) {
    console.error("Error during database seeding: ", err);
  }
}

// --- REST API Endpoints ---

// 1. Auth Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.json({
          name: user.name,
          email: user.email,
          role: user.role
        });
      }
    }
    res.status(401).json({ error: 'Invalid email or password.' });
  } catch (err) {
    res.status(500).json({ error: 'Database authentication error.' });
  }
});

// 2. Orders Endpoints
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save order.' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

// 3. Reservations Endpoints
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reservations.' });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const newRes = new Reservation(req.body);
    await newRes.save();
    res.status(201).json(newRes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save reservation.' });
  }
});

app.delete('/api/reservations/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation cancelled successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete reservation.' });
  }
});

// 4. Vacancy Endpoints
app.get('/api/vacancy', async (req, res) => {
  try {
    const vacancy = await Vacancy.find();
    // Convert array of documents to a map object { booths: [...], window: [...] }
    const map = {};
    vacancy.forEach(v => {
      map[v.zone] = v.tables;
    });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vacancies.' });
  }
});

app.put('/api/vacancy', async (req, res) => {
  const { zone, tableId, occupied } = req.body;
  try {
    const zoneDoc = await Vacancy.findOne({ zone });
    if (zoneDoc) {
      zoneDoc.tables = zoneDoc.tables.map(t => 
        t.id === tableId ? { ...t, occupied } : t
      );
      await zoneDoc.save();
      
      // Send back the updated map object
      const allVacancy = await Vacancy.find();
      const map = {};
      allVacancy.forEach(v => {
        map[v.zone] = v.tables;
      });
      res.json(map);
    } else {
      res.status(404).json({ error: 'Zone not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle table state.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running in production mode on port ${PORT}`);
});
