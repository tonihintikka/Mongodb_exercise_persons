const express = require('express') 
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')

const app = express()
const port = 3000

//middleware
// Use JSON parser
app.use(express.json())

//use person model
const Person = require('./models/Persons')




/*
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})*/
//Routes

app.get('/person', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

/*
app.get('/person/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
})*/

app.get('/person/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      //console.log(error)
      response.status(400).send({ error: 'MongoDB id is malformatted!' })
    })
})

app.get('/', (request, response) => {
  response.send('Hello Express!')
})

app.post('/person', async (request, response) => {
  // get request body with JSON
  const body = request.body

  // name is required
  if (body.name === undefined) {
    return response.status(400).json({ error: 'Name missing' })
  }
  // email is required
  if (body.email === undefined) {
    return response.status(400).json({ error: 'Email missing' })
  }

  // Note: you don't need above ones, 
  // if you use more details in your personSchema
  // and catch ValidationError exceptions

  // Create a new person
  const person = new Person({
    name: body.name,
    age: body.age || 0,
    email: body.email
  })

  // Save to db and send back to caller
  const savedPerson = await person.save()
  response.json(savedPerson)  

})
app.delete('/person/:id', async (request, response, next) => {
  // use try-catch to detect possible Malformatted MongoDB id
  try { 
    const deletedPerson = await Person.findByIdAndRemove(request.params.id)
    if (deletedPerson) response.json(deletedPerson)
    else response.status(404).end()
  } catch (exception) {
    response.status(400).send({ error: 'MongoDB id is malformatted!' })
  }
})
    

app.put('/person/:id', async (request, response, next) => {
  // get id and new person data
  const id = request.params.id
  const body = request.body

  // create a normal JavaScript object
  const person = {
    name: body.name,
    age: body.age,
    email: body.email
  }

  // Use new : true to get updated object back
  const updatedPerson = 
    await Person.findByIdAndUpdate(id, person, { new: true })

  if (updatedPerson ) response.json(updatedPerson)
  else response.status(404).end()
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => { 
  console.log('Example app listening on port 3000') 
})


app.listen(port, () => {
  console.log('Example app listening on port 3000')
})