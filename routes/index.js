//'use strict'

var express = require('express');
var router = express.Router();

// database
// var pg = require('pg');
// const Pool = require('pg-pool');

//var config = {
//  user: 'Mateo', //env var: PGUSER
//  database: 'LumanoteDB', //env var: PGDATABASE
//  password: 'ct1WBGS&v)!ADD', //env var: PGPASSWORD
//  host: 'localhost', // Server hosting the postgres database
//  port: 5432, //env var: PGPORT
//  max: 10, // max number of clients in the pool
//  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//};
//var pool = new pg.Pool(config);
//var pool = new Pool(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lumanote' });
});

//router.get('/login', function(req, res, next) {
//  res.render('login', { title: 'Lumanote' });
//});

//router.get('/signup', function(req, res, next) {
//  res.render('signup', { title: 'Lumanote' });
//});

/*
router.post('/signing-up', function(req, res){

  pool.connect(function(err, client, done){
    if (err) {
      // res.redirect('/signup');
      res.render('signup', {error: 'true'});
      return console.error("error fetching client from pool", err);
    }
    else {
      console.log(req.body.username);
      console.log(req.body.email);
      console.log(req.body.password);
      //client.query('INSERT INTO users(email,uname,uid,pass) VALUES ($1,$2,$3,$4)',
      //[req.body.email, req.body.unam, req.body.uid, req.body.pass]);
      pool.query('INSERT INTO public."User"(username, email, password) VALUES ($1, $2, $3);', [req.body.username, req.body.email, req.body.password]);
      // disconnect the client
      done();
      if(err) {
        return console.error('error running query', err);
      }

      // res.redirect('/login');
      res.render('login', {signupRedirect: 'true'});
    }
  });

});
*/
module.exports = router;
