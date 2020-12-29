const mongoose = require('mongoose')
const User = require('./User')

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

    //TODO: add logged-in user's id here
})


module.exports = mongoose.model('Entry', EntrySchema)