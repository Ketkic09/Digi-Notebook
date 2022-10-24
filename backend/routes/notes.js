const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    const obj ={
        a:"this obj is returned by api/notes",
        np:35
    }

    res.json(obj)
})

module.exports = router