module.exports = function(router) {

    var postmark = require("postmark");
    
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
            // Example request
            var client = new postmark.Client("2949cc1f-72cb-438d-b166-95bf2d9fd823");
    
            client.sendEmail({
                "From": "donotreply@kwautoallsmart.com",
                "To": "garethfentimen@gmail.com",
                "Subject": "Test", 
                "TextBody": "Hello from Postmark!"
            }, function(error, success) {
                if (!success) {
                    console.log(error);
                }
                res.json('{ result: { Success : true } }');
            });
            
        } else {
            res.json('{ result: { Success : false } }');    
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