const mongoose = require('mongoose')

const signinTemplate = new mongoose.Schema({
    userName:{
        type:String,
        required: [true,'REQUIRED'],
        minlength: [6,'Minimum lenght is: 6'],
        unique: [true,'Username already taken']     
    },
    Password:{
        type:String,
        required: [true,'REQUIRED'],
        minlength: [6,'Minimum lenght is: 6'],
        unique: [true,'Password already taken']
    }
})

module.exports = mongoose.model('users',signinTemplate)