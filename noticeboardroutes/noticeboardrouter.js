var express=require('express');
var router=express.Router();

var admin=require('./admin');
var student=require('./student');
var home=require('./home');
router.use('/student',student);
router.use('/admin',admin);
router.use('/home',home);
module.exports=router;