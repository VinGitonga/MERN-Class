const express = require('express')
const userCtrl = require('../controllers/user.controller')
//const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/api/users')
   .get(userCtrl.list)

router.route('/api/users/new')
   .post(userCtrl.create)


router.route('/api/users/:userId')
   .put(userCtrl.update)
   .delete(userCtrl.remove)

router.param('userId',userCtrl.userByID)

module.exports = router;