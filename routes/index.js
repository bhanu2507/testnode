var express = require('express');
var router = express.Router();

var blist;
/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('restaurants');
    collection.distinct(("borough"),function(e,docs){
       res.render('index', {
            "blist" : docs,
            title: 'testnode',
           "restlist" : ''
        });
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('restaurants');
        collection.find({borough: id},{},function(e,docs){
/**        res.append('index', {
            "restlist" : docs,
            title: id
        }); **/
        console.log(docs);
        collection.distinct(("borough"),function(e,docs1){
/**            res.render('index', {
                "blist" : docs1,
                title: 'testnode'
            });**/
        res.render('index', { "restlist" : docs, "blist" : docs1, title : id});
            console.log(docs1);
        });
    });
    //res.render('index', { title: 'Express' });
});

module.exports = router;
