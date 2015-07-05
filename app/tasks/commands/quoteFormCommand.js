var sendEmail = function(quoteData) {
	
	var api_key = 'key-700aee1b3637902eb54ee10c448ddcad';
	var domain = 'kwautoallsmart.co.uk';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
	
	var br = ", ";
	var data = {
		  from : "donotreply@kwautoallsmart.co.uk",
		  to : ["kieron1963williams@gmail.com", "kieronpwilliams@btinternet.com" ],
		  subject : "A potential customer has filled out the request quote form",
		  text : "Name: " + quoteData.clientFullName + br + 
		  "Email: " + quoteData.clientEmailAddress + br + 
		  "Number: " + quoteData.clientContactNumber + br + 
		  "Address: " + quoteData.clientAddress + br + 
		  "Postcode: " + quoteData.clientPostcode  
	};
	
	mailgun.messages().send(data, function (error, body) {
	  	if (!error && body.message == "Queued. Thank you.") {
		    if (body !== undefined)
			{
		    	console.log(body);	
			}
		} else {
			errorLog += error + " " + body.message;
		}
	});		
};

var errorLog = "";

module.exports = {
	handle : function(quoteData) {	
		sendEmail(quoteData);
	},
	hasError : function() {
		return errorLog !== "";
	},
	getErrorMessage : function() {
		return errorLog;
	}
};