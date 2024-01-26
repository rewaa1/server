const express = require('express');
const {
    createNewWorkout,
    getWorkouts,
    getworkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const reqAuth = require('../middleware/reqAuth')


const router = express.Router()

// require auth to all workout routes
router.use(reqAuth)

router.get('/',getWorkouts)

router.get('/:id',getworkout)

router.post('/', createNewWorkout )

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router;