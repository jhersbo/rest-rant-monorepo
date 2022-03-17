const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.get('/profile', async (req, res)=>{
    try{
        let user = await User.findOne({
            where: {
                userID: req.session.userId
            }
        })
        res.json(user)
    }catch{
        res.json(null)
    }
})

router.post('/', async (req, res)=>{
    let user = await User.findOne({
        where:{
            email: req.body.email
        }
    })
    if(!user || !await bcrypt.compare(req.body.password, user.passwordDigest)){
        res.status(400).json({
            message: 'No work'
        })
    }else{
        req.session.userId = user.userId
        res.json({ user }) 
    }
})

module.exports = router