const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 24,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status:{
    type: String,
    enum:['interview', 'declined', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId, 
    // *** we're tying the job model to the User model
    ref: 'User', // the model we are referencing
    required: [true, 'Please provide user']
  }
}, {timestamps: true})

module.exports = mongoose.model('Job', JobSchema)