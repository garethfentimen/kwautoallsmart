'use strict';
var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');

app.engine('hbs', expressHbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = express.Router();

routes = require("./app/appRoutes.js")(routes);

// redirect for non-www
app.all('/.*/', function(req, res, next) {
  	var host = req.headers("host");
  	if (host !== null && host.match(/^www\..*/i)) {
		next();
  	} else {
		res.redirect(301, "http://www." + host);
  	}
});

// register all our routes
app.use('/', routes);

// START THE SERVER
// =============================================================================
app.listen(app.get('port'));