const express = require('express')
const router = express.Router()
const DonationItem = require('../models/donationItem')

//get all
router.get('/', async (req, res) => {
    try {
        const donation = await DonationItem.find()
        res.json(donation)
    } catch (error) {
        res.status(500).json({message: err.message})
        console.log(error)
    }
})

//get one
router.get('/:id', getDonationItem, (req, res) => {
    res.json(res.donationItem)
})

//create one
router.post('/', async (req, res) => {
    const donationItem = new DonationItem({
        amount: req.body.amount,
        note: req.body.note,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isVolunteer: req.body.isVolunteer
    })

    try {
        const newDonationItem = await donationItem.save()
        res.status(201).json(newDonationItem)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//update one
router.patch('/:id', getDonationItem, async (req, res) => {
    if (req.body.amount != null) {
        res.donationItem.amount = req.body.amount
    }
    if (req.body.note != null) {
        res.donationItem.note = req.body.note
    }
    if (req.body.firstName != null) {
        res.donationItem.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.donationItem.lastName = req.body.lastName
    }
    if (req.body.isVolunteer != null) {
        res.donationItem.isVolunteer = req.body.isVolunteer
    }

    try {
        const updatedDonationItem = await res.donationItem.save()
        res.json(updatedDonationItem)
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})

//delete one
router.delete('/:id', getDonationItem, async (req, res) => {
    try {
        await res.donationItem.remove()
        res.json({message: 'Deleted Donation Item'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getDonationItem(req,res,next) {
    let donationItem
    try {
        donationItem = await DonationItem.findById(req.params.id)
        if (donationItem == null) {
            return res.status(404).json({message: 'Can not find donation item'})
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    res.donationItem = donationItem
    next()
}

module.exports = router