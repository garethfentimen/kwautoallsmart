module.exports = function(router) {

    var quoteFormCommand = require("./tasks/commands/quoteFormCommand.js");
    
    // home page route (http://localhost:3000)
    router.get('/', function(req, res) {
        var data = { title: 'Kieron Williams AutoAllSmart' };
        res.render('home', data);
    });

    router.get('/home', function(req, res) {
        var data = { title: 'Kieron Williams AutoAllSmart' };
        res.render('home', data);
    });

    router.post('/quote', function(req, res) {
        
        var quoteFormData = req.body;

        if (quoteFormData !== null)
        {
            console.log(quoteFormData);
            quoteFormCommand.handle(quoteFormData);
            
            if (quoteFormCommand.hasError())
            {
                console.log("Has error" + quoteFormCommand.getErrorMessage());
                res.json('{ "Success" : "false", "Error": "' + quoteFormCommand.getErrorMessage() + '" }');
            }
            
            res.json('{ "Success" : true }');
        } else {
            res.json('{ Success" : "false", Error: "No Form Data" }');    
        }
    });
    
    router.get('/contact', function(req, res) {
        var data = { title: 'Kieron Williams AutoAllSmart' };
        res.render('contact', data);
    });
    
    router.get('/gallery', function(req, res) {
        var data = { title: 'AutoAllSmart Gallery' };
        res.render('gallery', data);
    });
    
    return router;
};