var express = require('express');
var router = express.Router();
var numberService = require('./numberService');

router.get('/get', function (req, res){
    let numbers = numberService._get();
    res.status(200).send({number:numbers});
});

router.get('/set', function (req, res){
    console.log(numberService.getLength()+1);
    res.status(200).send({number: numberService._set(req.query.number)});
});


module.exports = router;