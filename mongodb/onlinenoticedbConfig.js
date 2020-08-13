var mongoclient = require('mongodb').MongoClient;
const mongourl = "mongodb://127.0.0.1:27017/";
var dbo;
console.log(123);

    var intialisedb=()=>{
    mongoclient.connect(mongourl, (err, studentdbs) => {
        if (err) throw err;
        dbo = studentdbs.db('noticeboarddb');
        console.log(`database connected.`);
    })
}


    var getdbo=()=>{
    return dbo;
}
module.exports = {intialisedb, getdbo}