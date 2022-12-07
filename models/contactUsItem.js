const mongoose = require('mongoose')

const contactUsItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {collection: 'ContactUs', timestamps: true})

module.exports = mongoose.model('ContactUsItem', contactUsItemSchema)