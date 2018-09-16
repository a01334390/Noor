/* Noor Homepage */
const express = require("express")
const helmet = require("helmet")

/* Port */
const PORT = process.env.PORT || 3000
const app = express()

/* Customs */
app.use(express.static(__dirname+"/public"))
app.use(helmet())

app.get("/",function(req,res){
    res.send("Hello world!")
})

/* App listen */
app.listen(PORT,()=>{
    console.log("Listening on ${PORT}...")
})

module.exports = app