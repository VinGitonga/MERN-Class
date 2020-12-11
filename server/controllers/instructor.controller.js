const express = require('express')
const {Instructor} = require('../models/instructor.model')
const router = express.Router()
const {Course} = require('../models/course.model')
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')
const extend = require('lodash/extend')


/**
 * Get all Instructors
 */

exports.list = async(req,res)=>{
    try {
        let instructors = await Instructor.find()
        res.json(instructors)
    } catch (err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * Add New Instructor into the system
 */

exports.create = async(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err, fields)=>{
        if(err){
            return ''
        }

        let instructor = new Instructor(fields)

        try {
            let result = await instructor.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
            console.log(err)
        }
    })
}


exports.listCourses = async(req,res)=>{
    try {
        let courses = req.course
        res.json(courses)
    } catch (err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * Update the details of Instructor and also append inst to req.inst
 */


exports.update = async(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err, fields)=>{
        if(err){
            return ''
        }

        let instructor = req.instructor
        instructor = extend(instructor, fields)

        try {
            await instructor.save()
            res.json(instructor)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
        }
    })
}

exports.remove = async(req,res)=>{
    try {
        let instructor = req.instructor
        let delInstructor = await instructor.remove()
        res.json(delInstructor)
    } catch (err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

exports.instructorByID = async(req,res,next,id)=>{
    try {
        let instructor = await Instructor.findById(id)
        if(!instructor)
           return res.status(400).json({
               error:'Instructor is MIA'
           })
        req.instructor = instructor
        next()
    } catch (err) {
        return res.status('400').json({
            error:'Could not retrieve instructor'
        })
    }
}

exports.intsName = async(req,res,next,name)=>{
    try {
        let course = await Course.findOne({instructorName:name})
        if(!course){
            return res.status(400).json({
                error:'Courses MIA'
            })
        req.course = course
        next()
        }
    } catch (err) {
        return res.status(400).json({
            error:"Could not retrieve courses"
        })
    }
}