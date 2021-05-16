var express = require("express");
var empModel= require('../models/registers');
var router = express.Router();
var registers=empModel.find({});
/* home Page */
router.get('/', function(req,res,next){
res.render('index', {title: 'Data Form' });
});

module.exports = router;
