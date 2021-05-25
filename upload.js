// ******************************
// Importing required modules
// ******************************

var csv = require('fast-csv');
var mongoose = require('mongoose');
var Author = require('./author');

// ******************************
// Creating post function to handle the file upload
// ******************************

exports.post = function (req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');  // Checking if any file was selected to be uploaded by user
	
	var authorFile = req.files.file;   		// reference to the uploaded file is saved to a variable called authorFile

	var authors = [];    // Creating empty array to store extracted data from csv file
		
	csv
	 .fromString(authorFile.data.toString(), {  // Extracting data from csv as string
		 headers: true,			// Telling library the first line contain headers
		 ignoreEmpty: true		// Telling library to ignore empty rows
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();   // Assigning row an Id 
		 
		 authors.push(data);  							// Storing the data in authors array
	 })
	 .on("end", function(){
		 Author.create(authors, function(err, documents) {		// Creating the author collection and inserting data from authors array
			if (err) throw err;
			
			res.send(authors.length + ' authors have been successfully uploaded.');  // Sending back in response the number of rows created
		 });
	 });
};