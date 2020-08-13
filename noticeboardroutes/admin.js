var express=require('express');
var adminRoutes=express.Router();
var mongodb=require('mongodb');

var initdb=require("../mongodb/onlinenoticedbConfig").intialisedb;
var getdbo=require("../mongodb/onlinenoticedbConfig").getdbo;
initdb();

adminRoutes.get('/read',(req,res)=>{
    
    var dbo=getdbo();

    dbo.collection('noticeboard').find({releam:'student'}).toArray((err,data)=>{
        if(err)throw err;
           res.send(data);
   
      
    })
});


adminRoutes.put('/update',(req,res)=>{
  
    var dbo=getdbo();
    let id = req.body._id;
    delete req.body._id;

    dbo.collection('noticeboard').updateOne({_id:{$eq:new mongodb.ObjectID(id)}},{$set:{status:req.body.status}},req.body,(err,result)=>{
        if(err)throw err;
        res.json({'msg':result});
    })
  
});



adminRoutes.delete('/remove/:id',(req,res)=>{ 
 
    var dbo=getdbo();
    dbo.collection('noticeboard').deleteOne({_id:{$eq:new mongodb.ObjectID(req.params.id)}},(err,result)=>{
        if(err)throw err;
        res.json(result);
    
    });
 
});


adminRoutes.post('/new',(req,res)=>{
    var dbo=getdbo();
    dbo.collection('notifications').insertOne(req.body,(err,result)=>{
        if(err)throw err;
        res.json({'msg':'done'});
    })
});

adminRoutes.get('/msgblog',(req,res)=>{
    var dbo=getdbo();
    dbo.collection('notifications').find().toArray((err,data)=>{
        if(err) throw err;
    
        res.send(data);
    })
});

adminRoutes.delete('/removenotice/:id',(req,res)=>{
    var dbo=getdbo();
    dbo.collection('notifications').deleteOne({_id:{$eq: new mongodb.ObjectID(req.params.id)}},(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})




adminRoutes.put('/updatenotice',(req,res)=>{
 
    var dbo=getdbo();
    let id = req.body._id;
    delete req.body._id;
 
    dbo.collection('notifications').updateOne({_id:{$eq:new mongodb.ObjectID(id)}},{$set:req.body},req.body,(err,result)=>{
        if(err)throw err;
        res.json({'msg':result});
    })

});

module.exports=adminRoutes;