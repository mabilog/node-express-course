const express = require('express')
const router = express.Router()

const { 
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob } = require('../controllers/jobs')

// router.route('/').post(createJob).get(getAllJobs)
// router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)
router.get('/', getAllJobs)
router.post('/', createJob)
router.get('/:id', getJob)
router.delete('/:id', deleteJob)
router.patch('/:id', updateJob)

module.exports = router