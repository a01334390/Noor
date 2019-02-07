/*
* This is Noor
* Fernando Martin Garcia Del Angel
*/ 

/* Web Server Libraries */
const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet')
const fs = require('fs')

/* Database Libraries */
const MongoClient = require('mongodb').MongoClient
const app = express();
var db

/* Use middleware */
app.use(bodyParser.urlencoded({extended:true}))
app.use(helmet())
app.set('view engine', 'ejs')
app.use(express.static('public'))

/* Run the server */
MongoClient.connect(fs.readFileSync('serverpassword.txt', 'utf8'), (err, client) => {
  if (err) return console.log(err)
  db = client.db('noor') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

/* Receive the homepage petition */
app.get('/', (req, res) => {
    db.collection('portfolio').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {projects: result})
    })
})

app.get('/portfolio',(req,res)=>{
  res.send("<h2>Portfolio</h2>")
})

app.get('/project',function(req,res){
  console.log(req.query.name)
    db.collection('portfolio').find({'name':req.query.name}).toArray((err,result)=>{
        if(err) return console.log(err)
        console.log(result)
        res.render("project.ejs",{project:result})
    })
})

