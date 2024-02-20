// Import required libraries
require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
const { ApplicantSchema } = require('./models/applicant'); // Import the applicant schema

// Initialize Express application
const app = express();

// Set the port to listen on, defaulting to 3000 if not provided in environment variables
const PORT = process.env.PORT || 3000;


// Disable strict mode for MongoDB queries
mongoose.set('strictQuery', false);

// Use middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
// Create a Mongoose model for the applicant schema
const Applicant = mongoose.model('Applicant', ApplicantSchema);

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
    res.render(`index`);
});

// Route handler to add a new applicant
app.post('/add-applicant', async (req, res) => {
    try {
        // Create a new applicant instance using the form data
        const newApplicant = new Applicant({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            videoURL: req.body.videoURL,
            interestedCategories: req.body.interestedCategories,
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
