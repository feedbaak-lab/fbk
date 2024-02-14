// Importing the Mongoose library
const mongoose = require('mongoose');

// Creating a schema object using Mongoose
const Schema = mongoose.Schema;

// Define the list of possible categories
const categoryEnum = ['Storefront', 'Service', 'Restaurant', 'Website', 'Application', 'Video', 'Social Media', 'Tinder'];

// Define the list of possible locations
const locationEnum = ['US', 'Non-US'];

// Defining the schema for the job applicants collection
const ApplicantSchema = new Schema({
    // First name of the applicant, a required string field
    firstName:{
        type: String,
        required: true,
    },
    // Last name of the applicant, a required string field
    lastName:{
        type: String,
        required: true,
    },
    // Email of the applicant, a required string field
    email: {
        type: String,
        required: true,
    },
    // Phone number of the applicant, a required string field
    phone: {
        type: String,
        required: true,
    },
    // Video URL provided by the applicant, a required string field
    videoURL: {
        type: String,
        required: true,
    },
    // Date of application, a Date field with default value set to the current date
    applicationDate: {
        type: Date,
        default: Date.now
    },
    // List of interested categories, an array of strings
    interestedCategories: [{
        type: String,
        enum: categoryEnum // ensuring the category value is from the defined list
    }],
    // Location of the applicant, a string field with options 'US' or 'Non-US'
    location: {
        type: String,
        enum: locationEnum, // ensuring the location value is from the defined list
        required: true
    }
});

// Creating a Mongoose model named 'Applicant' based on the defined schema
// This model will correspond to a MongoDB collection named 'applicants'
const ApplicantModel = mongoose.model('Applicant', ApplicantSchema);

// Exporting the 'Applicant' model for use in other parts of the application
module.exports = ApplicantModel;
