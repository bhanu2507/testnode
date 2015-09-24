var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('restaurants');
    collection.distinct(("borough"),function(e,docs){
        res.render('index', {
            "restlist" : docs,
              title: 'Express'
        });
    });
  //res.render('index', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('restaurants');
    collection.find({borough: id},{},function(e,docs){
        res.render('list', {
            "restlist" : docs,
            title: id
        });
    });
    //res.render('index', { title: 'Express' });
});


module.exports = router;
