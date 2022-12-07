const mongoose = require('mongoose')

const donationitemSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isVolunteer: {
        type: String,
        required: true
    }
}, {collection: 'Donation', timestamps: true})

module.exports = mongoose.model('DonationItem', donationitemSchema)