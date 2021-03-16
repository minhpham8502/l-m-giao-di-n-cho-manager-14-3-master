var express = require('express');
var CourseModel = require('../models/course'); 
var manageRoute = express.Router();
// let {checkAuth,checkAdmin } = require('../middleware/index')
// const { isEmail } = require('../middleware/index');
const manageController = require('../controller/manager.controller');

manageRoute.use('/uploads', express.static('uploads'));
manageRoute.use('/public', express.static('public'));

//cài đặt dealine nộp bài
manageRoute.post('/settime', manageController.settime)

//xem bài báo
manageRoute.get('/allfaculity', manageController.allfaculity)
manageRoute.get('/allcontribution:slug', manageController.allcontribution)
manageRoute.get('/viewStatistical:slug', manageController.allstatistical)

manageRoute.get('/readcontribution:id', manageController.readcontribution)

//downloadfilezip
manageRoute.get('/allcoursemanager', manageController.allcoursemanager)

module.exports = manageRoute    