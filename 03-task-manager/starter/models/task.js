const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required:   [true, 'Must provide name'],
    trim:       true,
    maxlength:  [20, 'Name cannot be more than 20 characters'],
    minlength:  [4, 'Name must be at least 4 characters']
  }, 
  completed: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Task', TaskSchema);