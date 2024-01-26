const Workout = require('../modules/workoutModels');
const mongoose =require('mongoose');

// get all 

const getWorkouts = async (req, res) => {
    const user_id = req.user._id
  
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
  
    res.status(200).json(workouts)
  }

// get single workut

const getworkout = async ( req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'there is no such workout saved'})
    }
    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'no such workout'}) 
    }
    res.status(200).json(workout)
}

// post new one
 


const createNewWorkout = async (req, res)  => {
    const {title, load, reps} = req.body
    let emptyFeild = []
    if(!title){
        emptyFeild.push('title')
    }
    if(!reps){
        emptyFeild.push('reps')
    }
    if(!load){
        emptyFeild.push('load')
    }
    if(emptyFeild > 0) {
        return res.status(400).json({error: 'please fill all the feilds', emptyFeild})
    }
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, reps , user_id }) 
        res.status(200).json(workout)
        console.log(user_id)
         
    }catch(error){
        res.status(400).json({error: error})
    }
}

//delete post 

const deleteWorkout = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'there is no such workout saved'})
    }
    const workout = await Workout.findOneAndDelete({ _id: id})
    !workout ? (
        res.status(404).json({error: 'no such workout'}) 
    ) :
    (
        res.status(200).json(workout)
    )
}

// update post  

const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'there is no such workout'})
    }
     const workout = await Workout.findByIdAndUpdate(id,{
        ...req.body
     })
    
    !workout ? (
        res.status(404).json({error: 'no such workout'}) 
    ) :
    (
        res.status(200).json(workout)
    )
}

module.exports = {

    createNewWorkout,
    getWorkouts,
    getworkout,
    deleteWorkout,
    updateWorkout

}