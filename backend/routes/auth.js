const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); //install express/vaidator
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchuser = require('../midleware/fetchuser')

const JWT_SECRET = "thi$ismy@pi"

// ROUTE1: POST:/api/auth/createuser This creates a user
router.post('/createuser',
        [body('email','enter a valid email').isEmail(),
        body('name','enter your name').isLength({min:2}),
        body('password','password should have minimum 8 characters').isLength({min:8})],
        
        //creating async function so validation is done first
        async (req,res)=>{
            const errors = validationResult(req);
            let success=false
            //checking if there are any errors and returnign BAD req
            if (!errors.isEmpty()) {
              return res.status(400).json({ success,errors: errors.array() });
            }
            
            //no errors then checking if email is taken, if not then user is created
            try{
                let user = await User.findOne({email:req.body.email}) //waits till validation is done 
                if(user){
                    success = false
                    return res.status(400).json({success,errors:"email already taken"})
                }
                const salt = await bcrypt.genSalt(10)
                const safePswd = await bcrypt.hash(req.body.password,salt)
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: safePswd
                })

                const data = {
                    user:{
                        id: user.id
                    }
                }

                const authToken = jwt.sign(data,JWT_SECRET)
                success = true
                res.json({success,authToken})
            }catch(error){ //catching any other errors
                console.error(error.message)
                res.status(500).send("Internal server occured!")

            }
            
              
        })

//ROUTE 2: POST /api/auth/login authentication(login) of user
router.post('/login',
            [body('email','enter a valid email').isEmail(),body('password','password incorrect').isLength({min:8})],
            async (req,res)=> {
                const errors = validationResult(req)
                let success = false
                if(!errors.isEmpty()){
                    return res.status(400).json({success,error:errors.array()})
                }
                const {email,password} = req.body
                try{
                    const user = await User.findOne({email:req.body.email})
                    const {name} = user
                    if(!user){
                        return res.status(400).json({success,error:"Please try to login with correct credentials"})
                    }
                    const pswdCompare = await bcrypt.compare(password,user.password)
                    if(!pswdCompare) {
                        return res.status(400).json({success,error:"Please try to login with correct credentials"})
                    }
                    //if passes all the checks then returning user id
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    const authToken = jwt.sign(data,JWT_SECRET)
                    success= true
                    res.json({success,authToken,name})

                }catch(error){

                    console.error(error.message)
                    res.status(500).send("Internal server occured!")
                }
            })
//ROUTER 3: Login required endpoints
router.post('/getuser',fetchuser,
async (req,res)=> {
    try{
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})


module.exports = router
