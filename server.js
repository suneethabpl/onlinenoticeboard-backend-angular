var express = require('express');
var bodyparser=require('body-parser');
var router=require("./noticeboardroutes/noticeboardrouter");

var cors=require('cors');

var expressapp=express();
expressapp.use(cors());
expressapp.use(bodyparser.json());
expressapp.use("/api",router)
var db=require('./mongodb/onlinenoticedbConfig')
expressapp.listen(3000,(err)=>{
    if(err) throw err;
    console.log(`server started at 3000`)
})
