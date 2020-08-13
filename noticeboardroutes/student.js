var express = require('express');
var studentRoutes = express.Router();
var mongodb = require('mongodb');
var bcrypt = require('bcryptjs');

var initdb = require("../mongodb/onlinenoticedbConfig").intialisedb;
var getdbo = require("../mongodb/onlinenoticedbConfig").getdbo;

initdb();



studentRoutes.get('/viewnotice/:batchnumber', (req, res) => {
   
    var dbo = getdbo();
 
    dbo.collection('notifications').find({ batchnumber: { $eq: parseInt(req.params.batchnumber) } }).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    })
});

studentRoutes.get('/viewprofile/:username', (req, res) => {

    var dbo = getdbo();

    dbo.collection('noticeboard').find({ emailid: { $eq: (req.params.username) } }).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    });
});


studentRoutes.put('/updateprofile', (req, res) => {

    var dbo = getdbo();
    let id = req.body._id;
    delete req.body._id;

    dbo.collection('noticeboard').updateOne({ _id: { $eq: new mongodb.ObjectID(id) } }, { $set: req.body }, (err, result) => {
        if (err) throw err;
        res.json({ 'msg': result });
    })
 
});



studentRoutes.put('/editpwd/:username', (req, res) => {

    var dbo = getdbo();
    console.log(req.body);
    console.log(req.params);
    dbo.collection('noticeboard').find({ emailid: { $eq: req.params.username } }).toArray((err, data) => {
        if (err) throw err;
      
        bcrypt.compare(req.body.currentpassword, data[0].password, (err, result) => {
         
            if (err) throw err;
            if (result == false) {
                res.json({ 'msg': "error" });

            } else {
                bcrypt.hash(req.body.newpassword, 10, (err, hashcode) => {
                    if (err) throw err;
                    req.body.newpassword = hashcode;
                    dbo.collection('noticeboard').updateOne({ emailid: { $eq: req.params.username } }, { $set: { password: hashcode } }, (err, result) => {
                        if (err) throw err;
                        res.json({ 'msg': 'done' })
                    })
                })
            }
        })
    });
});

module.exports = studentRoutes;