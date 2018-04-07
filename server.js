const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials/');
app.use(express.static(__dirname+'/public'));
//custom middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('unable to open or write to server.log');
    }
  });
  next();
});

app.set('view engine','hbs');
//registers function to be available inside of HBS template
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

//Routes

app.get('/',function(req, res){
res.render('home',{title:'Home Page',
 welcomeMessage: 'Welcome to Home Page'
});
});

app.get('/about',function(req, res){
// res.send('<h1>Hello Express!</h1>');
res.render('about',{
  pageTitle: 'About Page'
});
});





app.listen(3000, ()=>{
  console.log('server listens on port 3000');
});
