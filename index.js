// Load environment variables from a .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const Applicant = require('./models/applicant'); // Import the applicant model

// Initialize Express application
const app = express();

// Set the port to listen on, defaulting to 3000 if not provided in environment variables
const PORT = process.env.PORT || 3000;

// Disable strict mode for MongoDB queries
mongoose.set('strictQuery', false);

// Function to connect to MongoDB database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the URI from environment variables
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection
    } catch (error) {
        console.log(error); // Log any errors that occur during connection
        process.exit(1); // Exit the process with an error code
    }
}

// Define routes and start server after successful database connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`); // Log the port the server is listening on
    })
});


// Route to retrieve all applicants from the database
app.get('/applicants', async(req,res)=> {
    const applicant = await Applicant.find(); // Find all applicants in the database

    if(applicant){
        res.json(applicant) // Send the retrieved applicants as a JSON response
    } else{
        res.send("Something went wrong."); // Send an error message if something goes wrong during retrieval
    }

});



