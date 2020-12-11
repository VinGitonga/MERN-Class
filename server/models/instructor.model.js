const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phoneno:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
})

const Instructor = mongoose.model('Instructor',InstructorSchema)
exports.Instructor = Instructor