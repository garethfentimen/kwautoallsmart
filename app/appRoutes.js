module.exports = function(router) {
    
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
        // Require
        var postmark = require("postmark");

        // Example request
        var client = new postmark.Client("2949cc1f-72cb-438d-b166-95bf2d9fd823");

        client.sendEmail({
            "From": "mail@kwautoallsmart.com",
            "To": "garethfentimen@gmail.com",
            "Subject": "Test", 
            "TextBody": "Hello from Postmark!"
        });
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