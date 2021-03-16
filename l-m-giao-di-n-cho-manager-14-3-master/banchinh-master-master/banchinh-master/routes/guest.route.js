var express = require('express');
var CourseModel = require('../models/course'); 
var guestRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');
const guestController = require('../controller/guest.controller');

guestRoute.use('/uploads', express.static('uploads'));
guestRoute.use('/public', express.static('public'));

//hiển thị các khoa 
guestRoute.get('/danhsachsvien:slug', guestController.allcontribution)

//xem các bài đăng từ các khoa 
guestRoute.get('/danhgiabaibao:id', guestController.readcontribution)
module.exports = guestRoute