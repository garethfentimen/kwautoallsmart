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
    
    router.get('/contact', function(req, res) {
        var data = { title: 'Kieron Williams AutoAllSmart' };
        res.render('contact', data);
    });
    
    return router;
};