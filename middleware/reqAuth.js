const jwt = require('jsonwebtoken')
const User = require('../modules/userModule')

const reqAuth = async ( req, res, next ) => {
    
    // verifing  the user authintication via token 
    
    const {authorization} = req.headers

    if(!authorization) {
        res.status(401).json({error: 'Authorization token required'})
    }
 
    
    const token = authorization.split(' ')[1]

    try{
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'request un authorized'})
    }

}
module.exports = reqAuth;