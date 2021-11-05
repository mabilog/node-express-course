// Creating a REST API
// REST - REpresentational State Transfer
const Task = require('../models/task.js')
const asyncWrapper = require('../middleware/async.js')
const { createCustomError } = require('../errors/custom-error.js')


// Mongoose provides queries for CRUD operation
// can be used as a promise - can use await. 
// ARE NOT PROMISES

// .find({}) finds all the tasks
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

// create() creates new task using json object
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

// .findOne({ [parameter] : [condition]})
const getTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findOne({ _id: req.params.id})
    if(!task){
      return next(createCustomError(`No task with id: ${req.params.id}`, 404))
      // return next(error)
      // if id has proper syntax, 404 will print out
      // return res.status(404).json({ msg: `No task with id : ${req.params.id}`})
    }
    res.status(200).json({ task })
})

// .findOneAndDelete()
const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id })
  if(!task){
    return next(createCustomError(`No task with id: ${req.params.id}`, 404))
  }
  // when you delete an item, page should display new updated list of tasks
  // res.status(200).json({ task })
  // res.status(200).send()
  res.status(200).json({ task: null, status: 'success' })
})

// .put vs .patch
// .put     - replaces the whole resource
// .patch   - for partial update

// .findOneAndUpdate({ _id: req.params.id}, req.body, [options])
const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  })
  if(!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`, 404))
  }
  res.status(200).json({ task })
})

module.exports = { 
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
 }