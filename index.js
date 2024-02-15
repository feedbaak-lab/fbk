// Import required libraries
const express = require('express');
const nodemailer = require('nodemailer'); // Import nodemailer library

// Initialize Express application
const app = express();

// Set the port to listen on, defaulting to 3000 if not provided in environment variables
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route handler for serving the HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Applicant Form</title>
        </head>
        <body>
            <h1>New Applicant Form</h1>
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

            <script>
                // Show confirmation message when the form is submitted
                document.querySelector('form').addEventListener('submit', function() {
                    alert('Thank you for submitting the form!');
                });
            </script>
        </body>
        </html>
    `);
});

// Route handler to add a new applicant and send the data to an email address
app.post('/add-applicant', async (req, res) => {
    try {
        // Create the email body with the form data
        const emailBody = `
            First Name: ${req.body.firstName}
            Last Name: ${req.body.lastName}
            Email: ${req.body.email}
            Phone: ${req.body.phone}
            Video URL: ${req.body.videoURL}
            Interested Categories: ${req.body.interestedCategories}
            Location: ${req.body.location}
        `;

      // Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Zoho Mail SMTP hostname
    port: 465, // Zoho Mail SMTP port (465 for SSL)
    secure: true, // Use SSL/TLS
    auth: {
        user: 'royrajputpm@gmail.com', // Your Zoho Mail email address
        pass: 'No1spaces!?' // Your Zoho Mail password
    }
});


        // Define email options
        const mailOptions = {
            from: req.body.email, // Use the user's email address as the sender
            to: 'info@feedbaak.com', // Set the recipient email address
            subject: 'New Applicant Submission',
            text: emailBody
        };


// Send email
await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    } else {
        console.log('Email sent:', info.response);
        res.send('Applicant added successfully. Email sent.');
    }
});


// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
