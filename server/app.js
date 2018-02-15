const Hapi = require('hapi')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/taskdb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err))

// Create Task Model
const Task = mongoose.model('Task', {text:String})

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

// Get All tasks from the mongo database, this is used in Tasks.jsx axios request
server.route({
  method: 'GET',
  path: '/tasks',
  handler: (request, reply) => {
    let tasks = Task.find((err, tasks) => {
      reply(tasks)
    })
  }
})

// Post Tasks Route - listen for the form post request to /tasks
server.route({
  method: 'POST',
  path: '/tasks',
  handler: (request, reply) => {
    // Get the text coming from the form with payload - name = text
    let text = request.payload.somerandomtext
    let newTask = new Task({
      text:text
    })
    newTask.save((err, task) => {
      if(err) {
        return console.log(err)
      }
      // redirect to homepage if successful
      return reply.redirect().location('http://localhost:8080')
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
