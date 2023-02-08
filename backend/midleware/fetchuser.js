const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.SECRET

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token')
    if (!token){
        res.status(401).send({error:"Please authenticate with a valide token"})
    }

    try{
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    }catch(error){
        console.error(error.message)
        res.status(401).send({error:"[catch] Please authenticate with a valid token"})

    }
}

module.exports = fetchuser;