require('dotenv').config();
require('express-async-errors');
const express = require('express')
const app = express();

const PORT = process.env.PORT || 3001;

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// routes

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)
// product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async() => {
  try {
    // connect db
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start();