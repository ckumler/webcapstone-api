const express = require('express')
const router = express.Router()
const VolunteerItem = require('../models/volunteerItem')

//get all
router.get('/', async (req, res) => {
    try {
        const volunteer = await VolunteerItem.find()
        res.json(volunteer)
    } catch (error) {
        res.status(500).json({message: err.message})
        console.log(error)
    }
})

//get one
router.get('/:id', getVolunteerItem, (req, res) => {
    res.json(res.volunteerItem)
})

//create one
router.post('/', async (req, res) => {
    const volunteerItem = new VolunteerItem({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone
    })

    try {
        const newVolunteerItem = await volunteerItem.save()
        res.status(201).json(newVolunteerItem)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//update one
router.patch('/:id', getVolunteerItem, async (req, res) => {
    if (req.body.firstName != null) {
        res.volunteerItem.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.volunteerItem.lastName = req.body.lastName
    }
    if (req.body.street != null) {
        res.volunteerItem.street = req.body.street
    }
    if (req.body.city != null) {
        res.volunteerItem.city = req.body.city
    }
    if (req.body.state != null) {
        res.volunteerItem.state = req.body.state
    }
    if (req.body.zip != null) {
        res.volunteerItem.zip = req.body.zip
    }
    if (req.body.phone != null) {
        res.volunteerItem.phone = req.body.phone
    }

    try {
        const updatedVolunteerItem = await res.volunteerItem.save()
        res.json(updatedVolunteerItem)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id', getVolunteerItem, async (req, res) => {
    try {
        await res.volunteerItem.remove()
        res.json({message: 'Deleted Volunteer Item'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getVolunteerItem(req,res,next) {
    let volunteerItem
    try {
        volunteerItem = await VolunteerItem.findById(req.params.id)
        if (volunteerItem == null) {
            return res.status(404).json({message: 'Can not find volunteer item'})
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    res.volunteerItem = volunteerItem
    next()
}

module.exports = router