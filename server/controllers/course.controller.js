const {Course} = require('../models/course.model')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')


exports.create = async(req,res)=>{
    
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err, fields)=>{
        if(err){
            return ''
        }

        let course = new Course(fields)

        try {
            let result = await course.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error:errorHandler.getErrorMessage(err)
            })
            console.log(err)
        }
    })
    /*
    let newCourse = new Course(req.body)

    newCourse.save()
    .then(course=>{
        res.status(200).json({
            course:"Adding course success"
        })
    }).catch(err =>{
        res.status(400).send('Adding course failed')
    })*/
    
}

/**
 * Load course and append to req
 */

exports.courseByID = async(req,res,next,id)=>{
    try {
        let course = await Course.findById(id)
        if(!course)
           return res.status('400').json({
               error:'Course not found'
           })
        req.course = course
        next()
    } catch (err) {
        return res.status('400').json({
            error:'Could not retrieve course'
        })
    }
}


exports.list = async(req,res) =>{
    try {
        let courses = await Course.find()
        res.json(courses)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


exports.update = async(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async(err, fields)=>{
        if(err){
            return ''
        }
        let course = req.course
        course = extend(course, fields)

        try {
            await course.save()
            res.json(course)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}


exports.remove = async(req,res)=>{
    try {
        let course = req.course
        let deleteCourse = await course.remove()
        res.json(deleteCourse)
    } catch (err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
