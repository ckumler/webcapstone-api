const express = require('express')
const router = express.Router()
const ContactUsItem = require('../models/contactUsItem')

//get all
router.get('/', async (req, res) => {
    try {
        const contactUs = await ContactUsItem.find()
        res.json(contactUs)
    } catch (error) {
        res.status(500).json({message: err.message})
        console.log(error)
    }
})

//get one
router.get('/:id', getContactUsItem, (req, res) => {
    res.json(res.contactUsItem)
})

//create one
router.post('/', async (req, res) => {
    const contactUsItem = new ContactUsItem({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    try {
        const newContactUsItem = await contactUsItem.save()
        res.status(201).json(newContactUsItem)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//update one
router.patch('/:id', getContactUsItem, async (req, res) => {
    if (req.body.name != null) {
        res.contactUsItem.name = req.body.name
    }
    if (req.body.email != null) {
        res.contactUsItem.email = req.body.email
    }
    if (req.body.message != null) {
        res.contactUsItem.message = req.body.message
    }

    try {
        const updatedContactUsItem = await res.contactUsItem.save()
        res.json(updatedContactUsItem)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id', getContactUsItem, async (req, res) => {
    try {
        await res.contactUsItem.remove()
        res.json({message: 'Deleted ContactUs Item'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getContactUsItem(req,res,next) {
    let contactUsItem
    try {
        contactUsItem = await ContactUsItem.findById(req.params.id)
        if (contactUsItem == null) {
            return res.status(404).json({message: 'Can not find contactUs item'})
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    res.contactUsItem = contactUsItem
    next()
}

module.exports = router