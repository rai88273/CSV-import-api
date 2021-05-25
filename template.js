// ******************************
// Importing required modules
// ******************************

var json2csv = require('json2csv');

// ******************************
// Creating Get function for template download purpose
// ******************************

exports.get = function(req, res) {

	// var fields = Object.keys(Author.schema.obj);  can be used for dynamic field import from created schema
	// Defining csv format

	var fields = [
		'name.firstName',
		'name.lastName',
		'biography',
		'twitter',
		'facebook',
		'linkedin'
	];

	// Parsing object to csv

	var csv = json2csv({ data: '', fields: fields });

	// Setting up parameters to download template file on user's PC

	res.set("Content-Disposition", "attachment;filename=authors.csv");
	res.set("Content-Type", "application/octet-stream");

	// Sending the created csv template file in response

	res.send(csv);

};