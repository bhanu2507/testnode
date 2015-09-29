var express = require('express');
var router = express.Router();

var totalrests = '';
    pageSize = 100;
    pageCount = '';
    currentPage = 1;
    rests = [];
    restsArrays = [];
    restsList = [];

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



router.param('locname', function(req, res, next, locname) {

    // save name to the request
    req.locname = locname;

    next();
});
router.get('/:locname/', function(req, res, next) {
    var id = req.locname;
    var db = req.db;

    var collection = db.get('restaurants');
        collection.find({borough: id},{},function(e,docs){
            totalrests = docs.slice();
            pageCount = (docs.length)/pageSize;

        //set current page if specifed as get variable (eg: /?page=2)
        if (typeof req.query.page !== 'undefined') {
            currentPage = +req.query.page;
        }
        else
        {
            restsArrays = [];
            currentPage = 1;
        }

        //split list into groups
        while (totalrests.length > 0) {
            restsArrays.push(totalrests.splice(0, pageSize));
        }

        //show list of students from group
        restsList = restsArrays[+currentPage - 1];

        collection.distinct(("borough"),function(e,docs1){
        res.render('index', { "restlist" : docs,
            "blist" : docs1,
            title : id,
            rests : restsList,
            pageSize : pageSize,
            totalrests : docs.length,
            pageCount : Math.round(pageCount),
            currentPage : currentPage
        });
        console.log("rests" + totalrests.length);
        });
    });
});

module.exports = router;
