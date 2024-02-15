const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// HTML form
const formHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Submission Form</title>
    </head>
    <body>
        <h1>Email Submission Form</h1>
        <form action="/send-email" method="post">
            <label for="from">From:</label>
            <input type="email" id="from" name="from" required><br><br>

            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required><br><br>

            <label for="message">Message:</label><br>
            <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>

            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
`;

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(formHtml);
});

// Handle form submission and send email
app.post('/send-email', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport();

        const mailOptions = {
            from: req.body.from,
            to: 'info@feedbaak.com',
            subject: req.body.subject,
            text: req.body.message
        };

        await transporter.sendMail(mailOptions);
        
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
