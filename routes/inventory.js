const express = require('express')
const router = express.Router()
const InventoryItem = require('../models/inventoryItem')

//get all
router.get('/', async (req, res) => {
    try {
        const inventory = await InventoryItem.find()
        res.json(inventory)
    } catch (error) {
        res.status(500).json({message: err.message})
        console.log(error)
    }
})

//get one
router.get('/:id', getInventoryItem, (req, res) => {
    res.json(res.inventoryItem)
})

//create one
router.post('/', async (req, res) => {
    const inventoryItem = new InventoryItem({
        text: req.body.text,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        quantity: req.body.quantity
    })

    try {
        const newInventoryItem = await inventoryItem.save()
        res.status(201).json(newInventoryItem)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//update one
router.patch('/:id', getInventoryItem, async (req, res) => {
    if (req.body.text != null) {
        res.inventoryItem.text = req.body.text
    }
    if (req.body.description != null) {
        res.inventoryItem.description = req.body.description
    }
    if (req.body.price != null) {
        res.inventoryItem.price = req.body.price
    }
    if (req.body.image != null) {
        res.inventoryItem.image = req.body.image
    }
    if (req.body.quantity != null) {
        res.inventoryItem.quantity = req.body.quantity
    }

    try {
        const updatedInventoryItem = await res.inventoryItem.save()
        res.json(updatedInventoryItem)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id', getInventoryItem, async (req, res) => {
    try {
        await res.inventoryItem.remove()
        res.json({message: 'Deleted Inventory Item'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getInventoryItem(req,res,next) {
    let inventoryItem
    try {
        inventoryItem = await InventoryItem.findById(req.params.id)
        if (inventoryItem == null) {
            return res.status(404).json({message: 'Can not find inventory item'})
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    res.inventoryItem = inventoryItem
    next()
}

module.exports = router