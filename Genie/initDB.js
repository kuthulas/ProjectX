var mysql      = require('mysql');
var connection1 = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
});

//connection1.connect();

//connection1.query('drop schema if exists hcs', function(err, rows, fields) {if (err) throw err;});
//connection1.query('create schema hcs', function(err, rows, fields) {if (err) throw err;});

//connection1.end(function(){goon();});

//var goon = function(){
var connection2 = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hcs',
});

connection2.connect();
//connection2.query('create table model (requestkey VARCHAR(1000), instruction VARCHAR(1000), p1 VARCHAR(1000), p2 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
connection2.query('insert into model values("AddReseller","AddPartition","CUCM","#Name#-PT","blah","","","","")', function(err, rows, fields) {if (err) throw err;});
connection2.query('insert into model values("AddReseller","AddCSS","CUCM","#Name#-CSS","blah","","","","")', function(err, rows, fields) {if (err) throw err;});
//connection2.query('create table Provider (Name VARCHAR(1000), CC VARCHAR(1000), Dialplan VARCHAR(1000), Other VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
//connection2.query('create table Reseller (Name VARCHAR(1000), CC VARCHAR(1000), Service VARCHAR(1000), Number VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
//connection2.query('create table Customer (Name VARCHAR(1000), CC VARCHAR(1000), p2 VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
//connection2.query('create table Division (Type VARCHAR(1000), p1 VARCHAR(1000), p2 VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
//connection2.query('create table Location (Type VARCHAR(1000), SLCEXT VARCHAR(1000), LID VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});

connection2.query('create table Partition (Type VARCHAR(1000), SLCEXT VARCHAR(1000), LID VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
connection2.query('create table CSS (Type VARCHAR(1000), SLCEXT VARCHAR(1000), LID VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
connection2.query('create table TP (Type VARCHAR(1000), SLCEXT VARCHAR(1000), LID VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
connection2.query('create table RP (Type VARCHAR(1000), SLCEXT VARCHAR(1000), LID VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});
connection2.query('create table CSS-PT (Type VARCHAR(1000), SLCEXT VARCHAR(1000), LID VARCHAR(1000), p3 VARCHAR(1000))', function(err, rows, fields) {if (err) throw err;});

connection2.query('insert into model values("AddProvider","AddPartition","CUCM","#Name#-PT","blah","","","","")', function(err, rows, fields) {if (err) throw err;});
connection2.query('insert into model values("AddProvider","AddCSS","CUCM","#Name#-CSS","blah","","","","")', function(err, rows, fields) {if (err) throw err;});

connection2.end();
//}