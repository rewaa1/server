const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// static signup method

userSchema.statics.signup =async function(email, password)  {



    if(!email || !password){
        throw Error('All feilds needs to filled')
    }
    if(!validator.isEmail(email)){
        throw Error('the email is invalid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('this is not a strong')
    }

    const exist = await this.findOne({email})

    if(exist){
        throw Error('email already exists')
    }
 
    const salt = await bcrypt.genSalt(10)
    const hash =await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})

    return user 
}

// static login method 

userSchema.statics.login =async function(email, password){
    if(!email || !password){
        throw Error('All feilds needs to filled')
    }
    if(!validator.isEmail(email)){
        throw Error('the email is invalid')
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('email doesn\'t exists in our accounts sign up fisrt')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('password is incorrect')
    }
    
    return user
}


module.exports = mongoose.model('User', userSchema)