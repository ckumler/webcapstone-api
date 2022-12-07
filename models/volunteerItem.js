const mongoose = require('mongoose')

const volunteeritemSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {collection: 'Volunteer', timestamps: true})

module.exports = mongoose.model('VolunteerItem', volunteeritemSchema)