// Load environment variables from a .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const mongoose = require('mongoose');

// Import the Mongoose schema for the applicant
const { ApplicantSchema } = require('./models/applicant');

// Import the enums if necessary
const { categoryEnum, locationEnum } = require('./enums');

// Create a Mongoose model for the applicant schema
const Applicant = mongoose.model('Applicant', ApplicantSchema);

// Initialize Express application
const app = express();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Route handler for the index page
app.get('/', (req, res) => {
    res.send(`
        <form action="/add-applicant" method="post">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required><br><br>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required><br><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="phone">Phone:</label>
            <input type="text" id="phone" name="phone" required><br><br>
            <label for="videoURL">Video URL:</label>
            <input type="text" id="videoURL" name="videoURL" required><br><br>
            <label for="interestedCategories">Interested Categories:</label>
            <input type="text" id="interestedCategories" name="interestedCategories" required><br><br>
            <label for="location">Location:</label>
            <select id="location" name="location" required>
                <option value="US">US</option>
                <option value="Non-US">Non-US</option>
            </select><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Route handler to add a new applicant
app.post('/add-applicant', async (req, res) => {
    try {
        // Create a new applicant instance using the form data
        const newApplicant = new Applicant({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            videoURL: req.body.videoURL,
            interestedCategories: req.body.interestedCategories.split(',').map(category => category.trim()),
            location: req.body.location
        });

        // Save the new applicant to the database
        const savedApplicant = await newApplicant.save();
        res.send('Applicant added successfully');
    } catch (error) {
        console.error('Error adding applicant:', error);
        res.status(500).send('Error adding applicant');
    }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
