const express = require('express')
const studCtrl = require('../controllers/student.controller')


const router = express.Router()

router.route('/api/students/all')
  .get(studCtrl.list)

router.route('/api/students/new')
  .post(studCtrl.create)

router.route('/api/students/update/:studentId')
  .put(studCtrl.update)

router.route('/api/students/:studentId')
  .delete(studCtrl.remove)

router.param('studentId',studCtrl.studentByID)

module.exports = router;