const {Student} = require('../models/student.model')
const formidable = require('formidable')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')

exports.create = async(req,res)=>{

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err,fields)=>{
        if (err){
            return ''
        }

        let student = new Student(fields)

        try {
            let result = await student.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    })
}

exports.list = async(req,res)=>{
    try {
        let students = await Student.find()
        res.json(students)
    } catch (err) {
        res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}


exports.update = async(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err,fields)=>{
        if(err){
            return ''
        }

        let student = req.student
        student = extend(student,fields)

        try {
            await student.save()
            res.json(student)
        } catch (err) {
            res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    })
}


exports.remove = async(req,res)=>{
    try {
        let student = req.student
        let delStudent = await student.remove()
        res.json(delStudent)
    } catch (err) {
        res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

exports.studentByID = async(req,res,next,id)=>{
    try {
        let student = await Student.findById(id)

        if(!student){
            res.status(400).json({
                error:'Student not found'
            })
        }
        req.student = student
        next()
    } catch (err) {
        res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}