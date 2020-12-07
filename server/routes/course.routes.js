const express = require('express')
const courseCtrl = require('../controllers/course.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/courses/all')
   .get(courseCtrl.list)

router.route('/api/courses/new')
   .post(courseCtrl.create)

router.route('/api/courses/update/:courseId')
   .put(courseCtrl.update)

router.route('/api/courses/:courseId')
   .delete(courseCtrl.remove)

router.param('courseId',courseCtrl.courseByID)

module.exports = router;