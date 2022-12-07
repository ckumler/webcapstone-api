//start

require('dotenv').config()

const cors = require('cors')
const express = require('express')
let app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// Add the cors middleware to your API
app.options('*', cors());

const inventoryRouter = require('./routes/inventory')
app.use('/inventory', inventoryRouter)

app.listen(3000, () => console.log('Server Started'))