var url = require('url');

module.exports = function(app){
    app.get('/',function(req,res){
        res.render('../views/index.html');
        console.log('Portfolio Website displayed')
    })
}