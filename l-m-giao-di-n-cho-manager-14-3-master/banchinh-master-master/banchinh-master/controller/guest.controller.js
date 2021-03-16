const CourseModel = require('../models/course')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');

var fileModel = require('../models/file')

class guestController {
    
    allcontribution(req,res){
        let slug = req.params.slug;
        fileModel.find({slug:slug},function(err,result){
            if(err){
                console.log(err) }else{
                res.render('guest/baocuahocsinh',{data:result})
            }
        })            
    }

    readcontribution(req,res){
                let id = req.params.id
                fileModel.find({_id:id},(err,data)=>{
                    if(err){
                        console.log(err)
                    }
                    else if(data.length>0){
                        res.render('guest/danhgia',{data:data})
                    }
                    else{
                        res.render('guest/danhgia',{data:data})
                    }
                })
    }
}
module.exports = new guestController;