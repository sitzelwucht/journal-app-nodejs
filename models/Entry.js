const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Entry', EntrySchema)