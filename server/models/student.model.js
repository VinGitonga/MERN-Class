const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    //personal
    name:{
        type:String,
        trim:true,
        required:true
    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
    religion:{
        type:String,
        trim:true,
        required:true
    },
    dob:{
        type:Date,
        trim:true,
        required:true
    },
    // contact
    email:{
        type:String,
        trim:true,
        required:true
    },
    phoneno:{
        type:String,
        trim:true,
        required:true
    },
    guardianname:{
        type:String,
        trim:true,
        required:true
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    //academic
    course:{
        type:String,
        trim:true,
        required:true
    },
    instructor:{
        type:String,
        trim:true,
        required:true
    },
    dateofadmission:{
        type:Date,
        trim:true,
        required:true
    }

})

const Student = mongoose.model('Student',studentSchema)

exports.Student = Student;