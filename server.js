const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://0.0.0.0:27018';
//const uri = 'mongodb://0.0.0.0:27017'; // to use local mongoDB

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27018/donation_tracker', { //change the port to 27017 to use local mongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });


// Routes
app.get('/donations', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('donation_tracker');
    const donations = await db.collection('donations').find().toArray();

    res.json(donations);
    client.close();
  } catch (err) {
    console.error('Failed to fetch donations', err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

app.post('/donations', async (req, res) => {
  const { name, amount } = req.body;

  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('donation_tracker');
    await db.collection('donations').insertOne({ name, amount });

    res.json({ message: 'Donation added successfully' });
    client.close();
  } catch (err) {
    console.error('Failed to add donation', err);
    res.status(500).json({ error: 'Failed to add donation' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
