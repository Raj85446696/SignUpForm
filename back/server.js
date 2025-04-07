const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
PORT = 5000;


//middleware -> It is bridge b/w two different system 
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }));
  
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/signupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Mongoose Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is working ✅');
  });
  
// start server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});