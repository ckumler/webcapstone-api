const mongoose = require('mongoose')

const inventoryitemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {collection: 'Inventory', timestamps: true})

module.exports = mongoose.model('InventoryItem', inventoryitemSchema)