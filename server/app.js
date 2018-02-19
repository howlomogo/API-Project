const Hapi = require('hapi')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/taskdb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

// Create User Model
const User = mongoose.model('User', {
  firstname: String,
  lastname: String
})

// Init Server
const server = new Hapi.Server()

// Add Connection
server.connection({
  port: 3000,
  host:'localhost',
  routes: {cors: true} // Need to allow cors
})

// Dynamic Route
server.route({
  method: 'GET',
  path: '/user/{name}',
  handler: (request, reply) => {
    reply('Hello, ' + request.params.name)
  }
})

// Get All users from the mongo database, this is used in Users.jsx axios request
server.route({
  method: 'GET',
  path: '/api/users/view',
  handler: (request, reply) => {
    let users = User.find((err, users) => {
      reply(users)
    })
  }
})

// Post Users Route - listen for the form post request to /users
server.route({
  method: 'POST',
  path: '/api/users/add',
  handler: (request, reply) => {
    console.log('---request', request)
    let newUser = new User({
      firstname:request.payload.data.firstname,
      lastname:request.payload.data.lastname
    })
    newUser.save((err, user) => {
      if(err) {
        return console.log(err)
      } else {
        reply('User Added')
      }
    })
  }
})

// Delete Users Route - listen for the form post request to /users
server.route({
  method: 'DELETE',
  path: '/api/users/remove',
  handler: (request, reply) => {
    User.findOneAndRemove({ _id: request.payload.userId }, (err, user) => {
      if(user === null) {
        reply('No user to remove') // Only really need reply() here, but you can reply with something like this if we wanna check the delete was successful
      } else {
        reply('User Removed')
      }
      if(err) {
        throw err
      }
    })
  }
})

// Update User Route
server.route({
  method: 'PUT',
  path: '/api/users/update',
  handler: (request, reply) => {
    User.findOneAndUpdate(
      { _id: request.payload.data.userId },
      {
        firstname: request.payload.data.firstname,
        lastname: request.payload.data.lastname
      }, (err, user) => {
      if(err) {
        throw err
      }
      reply('User Updated')
    })
  }
})

// Start Server
server.start((err) => {
  if(err){
    throw err
  }
  console.log(`Server started at: ${server.info.uri}`)
})
