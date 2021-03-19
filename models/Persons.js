
// 1. Import the mongoose module
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const url = process.env.DB_CONNECTION
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB : ', error.message)
  })

// 2. Define a schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
})

// 3. Export Model
module.exports = mongoose.model('Person', personSchema, 'persons')