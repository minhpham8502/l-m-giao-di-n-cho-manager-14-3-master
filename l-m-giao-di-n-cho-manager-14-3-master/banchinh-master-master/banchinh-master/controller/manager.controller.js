const CourseModel = require('../models/course')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var fileModel = require('../models/file')
var DashboardtModel = require('../models/Dashboard')

class manageController {
    
    settime(req,res,next){
        let date = req.body.date;
        let time = req.body.time;
        let deadline = date + " " + time;
        AccountModel.findOneAndUpdate({role: "admin"},{deadline:deadline})
        .then(data=>{
            res.json(data)
        }) 
    }

    //hiển thị tất cả các khoa
    allfaculity(req,res){
        CourseModel.find({})
        .then(data=>{
            res.render('./marketingmanager/allfaculity',{course:data})
        })
        .catch(err=>{
            res.json("loi sever")
        })
    }

    //hiển thị tất cả bài viết của khoa đã chọn
    allcontribution(req,res){
        let slug = req.params.slug;
        fileModel.find({slug:slug},function(err,result){
            if(err){
                console.log(err) }else{
                res.render('marketingmanager/allcontribution',{data:result})
            }
        })            
    }
    // xem thong ke
    allstatistical = async (req,res)=>{
        // await fileModel.find({slug: req.params.coursename}, function(data){})
        // .then(data=>{
        //     fileModel.find({
        //         status : "ok"

        //     })
        //     .then(data1=>{
        //         let a = data.length
        //         let b = data1.length
        //         let phantramtong = 100
        //         let phantramnop = (100/a) * b
        //         res.render('./marketingmanager/thongke',{account : phantramtong, account1 :phantramnop})
        //     })
        // })
        let cout = 0;

    AccountModel.find({slug: req.params.slug, role : "student"})
    .then(data=>{
        console.log("sohocsinhcuakhoa",data.length )
        DashboardtModel.findOneAndUpdate({slug: req.params.slug},{hocsinhcuakhoa:data.length},function(err,data){
            if(err){
                res.json("loivl")
            }
        })

        for(var i = 0;i<data.length;i++){
            // console.log(data[i].email)
            fileModel.find({
                slug: req.params.slug,
                studentemail: data[i].email
            }).then(data2=>{
                cout = cout + 1;
  
                DashboardtModel.findOneAndUpdate({slug: req.params.slug},{soHocsinhnopbai:cout},function(err,data){
                })
            })
        }
    })

    fileModel.find({slug: req.params.slug}, function(data){})
        .then(data=>{
            fileModel.find({
                status : "Pass"
            })
            .then(data1=>{
                let Tongsobaidanop = data.length
                let sobaidapass = data1.length
                console.log("Tongsobaidanop",Tongsobaidanop)
                console.log("sobaidapass",sobaidapass)

                // let phantramtong = 100
                // let phantramnop = (100/a) * b
                
                DashboardtModel.findOneAndUpdate({slug: req.params.slug},{tongbaidanop:Tongsobaidanop, sobaidapass:sobaidapass},function(err,data){
                })
            })
        })
    res.json("lol")
    }    
    //đọc bài viết vừa chọn
    readcontribution(req,res){
        let id = req.params.id
        fileModel.find({_id:id},(err,data)=>{
            if(err){
                console.log(err)
            }else if(data.length>0){
                res.render('marketingmanager/readcontribution',{data:data})
            }else{
            res.render('guest/readcontribution',{data:data})
            }
        })
    }

    allcoursemanager(req,res ){
        CourseModel.find({})
        .then(data=>{
            res.render('./marketingmanager/allcoursemanager',{course: data})
        })
        .catch(err=>{
            res.json("loi sever")
        })
    }

    // allstatistical = async (req,res)=>{
    //     AccountModel.findById({_id : "60503607b8ce7e2b080906a3"}).then((data)=>{
    //         console.log(data.fileSubmit.length)
    //         console.log("================")
    //     }
    // )}
}
module.exports = new manageController;