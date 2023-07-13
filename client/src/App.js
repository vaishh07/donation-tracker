import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [donations, setDonations] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('/donations');
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch donations', error);
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/donations', { name, amount });
      setName('');
      setAmount('');
      fetchDonations();
    } catch (error) {
      console.error('Failed to add donation', error);
    }
  };

  return (
    <div>
      <h1>Donation Tracker</h1>

      <form onSubmit={handleDonationSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Donation</button>
      </form>

      <h2>Donations</h2>
      {donations.map((donation) => (
        <div key={donation._id}>
          <p>Name: {donation.name}</p>
          <p>Amount: {donation.amount}</p>
          <p>Date: {new Date(donation.date).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
