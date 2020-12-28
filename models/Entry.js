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
    tag: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Entry', EntrySchema)