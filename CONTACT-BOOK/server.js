const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB

mongoose.connect("mongodb+srv://amagbaugochukwu:tNGFBoZKclidj2J1@cluster0.jyrip2b.mongodb.net/")
.then( () =>{
    console.log("connection to the database is successful");
})

// Create Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware for parsing JSON data
app.use(express.json());

// Routes
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});
// create contacts
app.post('/contacts', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// updating contacts
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// deleting contacts
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Contact.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Start the server
app.listen(PORT, (req, res) =>{
    console.log(`Listening to server on port: ${PORT}`);
});