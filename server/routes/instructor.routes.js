const express = require('express')
const instructorCtrl = require('../controllers/instructor.controller')

const router = express.Router()

router.route('/api/instructors/all')
   .get(instructorCtrl.list)

router.route('/api/instructors/new')
   .post(instructorCtrl.create)

//router.param('name',instructorCtrl.listCourses)
router.route('/api/instructors/update/:instructorId')
   .put(instructorCtrl.update)

router.route('/api/instructors/:instructorId')
   .delete(instructorCtrl.remove)

router.route('/api/instructors/courses/:name')
    .get(instructorCtrl.listCourses)

router.param('instructorId',instructorCtrl.instructorByID)
router.param('name',instructorCtrl.intsName)

module.exports = router;