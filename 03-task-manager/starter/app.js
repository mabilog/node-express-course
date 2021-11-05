const express = require('express')
const app = express()

const tasks = require('./routes/task')
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

const PORT = 3001;

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)
app.use(notFound) // 404
app.use(errorHandlerMiddleware)

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server running on port ${PORT}`))

  } catch (error) {
    console.log(error)
  }
}

 start();