var express = require('express');
var router = express.Router();
var db = require('./db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home',function(req,res,next){
res.render('home');
});

router.get('/stud',function(req,res,next){
  res.render('studregister');
});

router.post('/add',function(req,res,next){
var name = req.body.name;
var password = req.body.password;
var cpassword = req.body.cpassword;
var clg = req.body.clg;
if(password == cpassword){

var insert = `insert into studregister(name,password,clg)
values('${name}','${password}','${clg}')`;
db.query(insert,function(err,result){
if(err) throw (err);
console.log("inserted");
});
 
}else{
  console.log("wrong pass");
}
});

router.get('/clg',function(req,res,next){
res.render('clgregister');
});

router.post('/addclg',function(req,res,next){
  var clgname = req.body.clg;
  var password = req.body.password;
  var address = req.body.address;
  var street = req.body.street;
  var city = req.body.city;
  var zip = req.body.zip;
  var insertclg = `insert into clgregister(clgname,password,address,street,city,zip)
  values('${clgname}','${password}','${address}','${street}','${city}','${zip}')`;
  db.query(insertclg,function(err,result){
  if(err) throw (err);
  console.log("inserted");
  });
  });

router.get('/studlogin',function(req,res,next){
  res.render('studlogin');
});

router.post('/loginstud',function(req,res,next){
var name = req.body.name;
var password = req.body.password;
var selectstud = `select count(*) as cnt from studregister where name='${name}' 
and password='${password}'`;
db.query(selectstud,function(err,rows,fields){
if(err) throw err
console.log(rows[0].cnt);
if(rows[0].cnt > 0)
{
  var getData = `select * from studregister where name='${name}' 
and password='${password}'`;
db.query(getData,function(err,rows,fields){
if(err) throw err

res.render('home',{username : rows[0].name});
});
}
else
{
  res.redirect('/studlogin');
}
})
});


module.exports = router;
