const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async(req, res) => {
  res.send('get all jobs')
}

const getJob = async(req, res) => {
  res.send('get job')
}

const createJob = async (req, res) => {
  // console.log(req.user)
  try {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
  } catch (error) {
    console.log(req.user)
    console.log(error)
    res.status(500).send(error)
  }
  // res.status(200).send('hello')

}

const updateJob = async(req, res) => {
  res.send('update job')
}

const deleteJob = async(req, res) => {
  res.send('delete job')
}


module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}