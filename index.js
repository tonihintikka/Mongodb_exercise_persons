const express = require('express') 
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()
const port = 3000

//use person model
const Person = require('./models/Persons')



/*
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})*/


app.get('/person', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})



app.get('/', (request, response) => {
  response.send('Hello Express!')
})

app.listen(port, () => {
  console.log('Example app listening on port 3000')
})