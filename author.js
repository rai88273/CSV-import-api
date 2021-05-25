// ******************************
// Importing required modules
// ******************************

var mongoose = require('mongoose');

// ******************************
// Defining the schema of author collection
// ******************************

var authorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,    // Defining id parameter to be of type monodb objectID
    name: {
		firstName: {						// Defining first name to of String type
			type: String,					// Setting field required to true
			required: true
		},
		lastName: String					// Defining last name to of String type
	},
	biography: String,						// Defining biography name to of String type
	twitter: {								// Defining twitter link to of String type
		type: String,
		validate: {							// Setting up validation parameters
			validator: function(text) {
				if (text !== null && text.length > 0)
					return text.indexOf('https://twitter.com/') === 0;
				
				return true;
			},
			message: 'Twitter handle must start with https://twitter.com/'         // Generating error message on validation fail
		}
	},
	facebook: {
		type: String,						// Defining facebook link to of String type
		validate: {							// Setting up validation parameters
			validator: function(text) {
				if (text !== null && text.length > 0)
					return text.indexOf('https://www.facebook.com/') === 0;
				
				return true;
			},
			message: 'Facebook Page must start with https://www.facebook.com/'      // Generating error message on validation fail
		}
	},
	linkedin: {
		type: String,						// Defining linkedin link to of String type
		validate: {							// Setting up validation parameters
			validator: function(text) {
				if (text !== null && text.length > 0)
					return text.indexOf('https://www.linkedin.com/') === 0;
				
				return true;
			},
			message: 'LinkedIn must start with https://www.linkedin.com/'    // Generating error message on validation fail
		}
	},
	
	created: { 
		type: Date,					// Generating TimeStamp
		default: Date.now
	}
});

// ******************************
// Constructing Mongoose model from defined author schema and storing in variable
// ******************************

var Author = mongoose.model('Author', authorSchema);

// ******************************
// Exporting the Author model
// ******************************

module.exports = Author;