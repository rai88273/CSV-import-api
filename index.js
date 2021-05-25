// ******************************
// ******$$    HOW TO START THE SERVER    $$******
// step1 - open your console and navigate to the folder 'csvimport-master'
// step2 - run 'npm install' to install all dependencies from package.json or install them one at a time by npm
// step3 - Now run 'node index.js' in console to start the server
// *******$$    TO STOP SERVER     $$*******
// open the console where server is running and press 'Ctrl + c'
// *******************************


// ******************************
// Importing required modules
// ******************************

var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');

// var bodyParser   =  require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));


// ******************************
// Configuring App to use fileupload function
// ******************************

app.use(fileUpload());

// ******************************
// Establishing connection with the database
// ******************************

mongoose.connect('mongodb://localhost/csvimport');

// ******************************
// Setting up the get route on root url
// ******************************

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');   // Sending index.html file consisting of a basic multipart form for file upload.
});


// ******************************
// Importing template.js file
// Setting get route on /template url and calling get function from template.js file
// ******************************

var template = require('./template.js');    
app.get('/template', isLoggedIn, template.get); 

// ******************************
// Importing upload.js file
// Setting post route on / url and calling post function from upload.js file
// ******************************

var upload = require('./upload.js');
app.post('/', isLoggedIn, upload.post);

// ******************************
// CRUD Routes
// ******************************
var crud = require('./crud.js');
// ******************************
// Create Route
// ******************************

app.post("/author", isLoggedIn, crud.create);

// ******************************
// Read Route
// ******************************

app.get("/author/edit", isLoggedIn, crud.read);  //search by author bio

// ******************************
// Update Route
// ******************************

app.put("/author", isLoggedIn, crud.update);

// ******************************
// Delete Route
// ******************************

app.delete("/author", isLoggedIn, crud.delete);

// ******************************
// Defining middleware to check if user is logged in
// For now this function always says user logged in
// ******************************

function isLoggedIn(req, res, next) {
  
  var loggedIn = true;
  if(loggedIn) {
      return next();
  }
  console.log("login to continue");
  res.redirect("/");
}


// ******************************
// Configuring server to listen on port 3000
// ******************************

app.listen(3000, function() {
  console.log("Server is now running !!");
});