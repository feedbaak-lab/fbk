const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BooksSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model ('Book', BooksSchema);