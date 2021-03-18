var express = require('express');
var CourseModel = require('../models/course'); 
var messRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');
const messController = require('../controller/mess.controller');
const add_chat = require('../controller/add_chat');




messRoute.get('/:slug', messController.list)
messRoute.get('/teacher/:slug', messController.listTeacher)

messRoute.get('/all/:email', messController.detail)
messRoute.get("/send_message/:cookiesemail/:user", messController.get);

messRoute.post("/send_message/:cookiesemail/:user/up_file", async (req,res)=>{
    await res.redirect('back');
});

messRoute.post('/add_chat/:email', add_chat.post);

module.exports = messRoute