var express = require('express');
var router = express.Router();
var Users = require('../models/users_schema');
var bodyParser = require('body-parser');

router.use(bodyParser.json())

/* GET users listing. */
router.route('/')
.get(function (req, res, next) {
    Users.find({}, function (err, item) {
        console.log('Find users');
        if (err) throw err;
        res.json(item);
    });
})
.post(function (req, res, next) {
    console.log('Post function!');
    //var currentDate = new Date();
    //console.log('current data '+currentDate);
    //req.body.date_of_birth = currentDate;
    console.log('body '+req.body.date_of_birth);
    
    Users.create(req.body, function (err, item) {
        if (err) throw err;
        console.log('User added!');
        var id = item._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})
.delete(function (req, res, next) {
    Users.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

router.route('/:user_id')
.get(function (req, res, next) {
    Users.findById(req.params.user_id, function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})
.put(function (req, res, next) {
    Users.findByIdAndUpdate(req.params.user_id, {
        $set: req.body
    }, {
        new: true
    }, function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})
.delete(function (req, res, next) {
    Users.findByIdAndRemove(req.params.user_id, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = router;
