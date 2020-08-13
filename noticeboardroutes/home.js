var express = require('express');
var homeRoutes = express.Router();
var bcrypt = require('bcryptjs');

var initdb = require("../mongodb/onlinenoticedbConfig").intialisedb;
var getdbo = require("../mongodb/onlinenoticedbConfig").getdbo;
initdb();


homeRoutes.post('/signin', (req, res) => {
  
    var dbo = getdbo();
  
    dbo.collection('noticeboard').find({ emailid: { $eq: req.body.username } }).toArray((err, data) => {
        if (err) throw err;
        if (data.length == 1) {
       
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
             
                if (err) throw err;
     
                if (result == false) {
                    res.json({ 'msg': 'wrong password' });
                } 
                else {
                    if(data[0].status==true){
                    res.json({ 'msg': data[0].releam,'username':data[0].emailid,'batchnumber':data[0].batchnumber,'firstname':data[0].firstname});
                              
                }else{
                    res.json({'msg':'access denied'})
                }
            }
            });
        } else {

            res.json({ 'msg': 'student not existed' });
        }

    });
});



homeRoutes.post('/signup', (req, res) => {
  
    var dbo = getdbo();
    dbo.collection('noticeboard').find({ emailid: { $eq: req.body.emailid } }).toArray((err, data) => {
      
        if (err) throw err;
        if (data.length == 0) {
           
            bcrypt.hash(req.body.password, 10, (err, hashcode) => {
   
                if (err) throw err;
                req.body.password = hashcode;
                dbo.collection('noticeboard').insertOne(req.body, (err, result) => {
                  
                    if (err) throw err;
                   
                    res.json({ 'msg': 'done' });
                })

            })
        } else {
 
            res.json({ 'msg': 'error' });
        }
    });
});







module.exports = homeRoutes;