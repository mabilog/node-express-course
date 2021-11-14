const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 24,
  },
  email:{
    type: String,
    required: [true, 'Please provide email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
    unique: true,
  },
  password:{
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
  },
})

// this saves and encrypts the password right when creating a new user in the mongoose middleware
// this function runs then passes ( next() ) the data onto the next middleware
UserSchema.pre('save', async function(){ // function(next)
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  // next()
})

// **** mongoose instance methods ****
UserSchema.methods.createJWT = function() {
  return jwt.sign({ 
    userId: this._id, 
    name: this.name 
  }, 
  process.env.JWT_SECRET, 
  { 
    expiresIn: process.env.JWT_LIFETIME
  })
}
UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
} 

module.exports = mongoose.model('User', UserSchema)