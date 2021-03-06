/*
* This is Noor
* Fernando Martin Garcia Del Angel
*/ 

/* Web Server Libraries */
const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const fs = require('fs')
const PORT = process.env.PORT || 3000

/* Database Libraries */
const MongoClient = require('mongodb').MongoClient
const app = express();
var db

/* Input sanitizers */
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/* Use middleware */
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(helmet())
app.set('view engine', 'ejs')
app.use(express.static('public'))

/* Run the server */
MongoClient.connect(fs.readFileSync('serverpassword.txt', 'utf8'), (err, client) => {
  if (err) return console.log(err)
  db = client.db('noor') // whatever your database name is
  app.listen(PORT, () => {
    console.log('listening on 3000...')
  })
})

/* Receive the homepage petition */
app.get('/', (req, res) => {
    db.collection('portfolio').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {projects: result})
    })
})

app.get('/portfolio',(req,res) => {
  db.collection('portfolio').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('portfolio.ejs', {projects: result})
  })
})

app.get('/contact',(req,res) => {
  res.redirect("/soon")
})

app.get('/thanks',(req,res)=>{
  res.redirect("/soon")
})

app.get('/404',(req,res)=>{
  res.redirect("/soon")
})

app.get('/soon',(req,res) => {
  res.render("soon.ejs")
})

app.get('/about',(req,res)=>{
  res.redirect("/soon")
})

app.get('/portfolio/:name',(req,res) => {
  console.log(req.params.name)
    db.collection('portfolio').find({'name':req.params.name}).toArray((err,result)=>{
        if(err) return console.log(err)
        if (result[0].serve == "design"){
          res.render("project-graphic.ejs",{project:result})
        }else{
          res.render("project-programming.ejs",{project:result})
        }
    })
})

app.get('*', function(req, res) {
  res.redirect('/404');
});

app.post('/send',(req,res)=>{

  db.collection('interested').insertOne({
    name: req.body.name,
    email: req.body.email,
    message: req.body.textarea
  },function(error,response){
    if(error) return console.log(error)
    res.redirect('/');
  })
})

