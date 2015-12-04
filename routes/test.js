var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var json = req.body;
    for (var i = 0; i < json.length; i++) {
        if (json[i].roll == 'true') {
            json[i].src = 'images/' + Math.floor((Math.random()*6)+1) + '.png';
        }
    }
    res.json(json);
});

module.exports = router;
