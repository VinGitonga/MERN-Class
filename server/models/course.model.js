const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    department:{
        type:String,
        trim:true
    },
    intake:{
        type:Number,
        required:'Course Intake is required'
    }
});

const Course = mongoose.model('Course', courseSchema)
exports.Course = Course;