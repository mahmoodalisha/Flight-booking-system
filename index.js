const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();


mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/customers', customerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
