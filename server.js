/*
* This is Noor
* Fernando Martin Garcia Del Angel
*/ 

/* Web Server Libraries */
const express = require('express');
const bodyParser = require('body-parser')
const helmet = require('helmet')

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
MongoClient.connect('mongodb://a01334390:ReyKenobi2603@cluster0-shard-00-00-7fixv.mongodb.net:27017,cluster0-shard-00-01-7fixv.mongodb.net:27017,cluster0-shard-00-02-7fixv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', (err, client) => {
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

app.get('/project/:id',function(req,res){
    db.collection('portfolio').find({'id':req.query.id}).toArray((err,result)=>{
        if(err) return console.log(err)
        console.log(result)
        res.render("project.ejs",{project:result})
    })
})

