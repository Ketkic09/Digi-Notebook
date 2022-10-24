const jwt = require('jsonwebtoken')

const JWT_SECRET = "thi$ismy@pi"

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
        res.status(401).send({error:"Please authenticate with a valide token in catch"})
    }
}

module.exports = fetchuser;