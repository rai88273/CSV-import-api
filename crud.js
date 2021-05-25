// ******************************
// Importing required modules
// ******************************

var mongoose = require('mongoose');
var Author = require('./author');

// ******************************
// Create function
// ******************************

exports.create = function (req, res) {
    req.query['_id'] = new mongoose.Types.ObjectId();           //Creating id of type mongodb objectID
    Author.create(req.query, function(err, createdAuthor) {		
        if (err) {
            console.log(err);                                   //checking for errors
            res.redirect("/");
        } else {
            res.send("create successfull" + createdAuthor);     //Displaying sccess message
        }
    });
}

// ******************************
// Read function
// ******************************


exports.read = function(req, res) {
    
    Author.find(req.query , function(err, foundAuthor) {
        
        if (err) {
            console.log(err);
            res.redirect("/");                                  //checking for errors
        } else {
            res.send(foundAuthor);                          //Displaying search results
        }
        
    });
}

// ******************************
// Update function
// ******************************

exports.update = function(req, res) {
    var searchKey = req.query.searchKey;                //Storing reference to search parameter in variable
    var updateKey = req.query.updateKey;                //Storing reference to update parameter in variable
    var searchParams = {[searchKey]: req.query.keyValue};
    var updateParams = {[updateKey]: req.query.newValue};
    Author.findOneAndUpdate(searchParams, updateParams, function(err, updatedAuthor) {
        if(err) {                                           //checking for errors
            console.log(err);
            res.redirect("/");
        } else {
            res.send("update successfull" + updatedAuthor);         ////Displaying updated results
        }
    });
}


// ******************************
// Delete function
// ******************************


exports.delete = function(req, res) {
    Author.deleteOne(req.query, function(err, re) {
        if(err) {                                       //checking for errors
            console.log(err);
            res.redirect("/");
        } else {
            res.send("delete successfull");                // Displaying success message
        }
    });
}