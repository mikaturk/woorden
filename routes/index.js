var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser').json();

/* POST method for getting the descs */
router.post('/data', function(req, res, next) {
  desclist = []
  console.log(req.body)
  req.body.woorden.forEach(function(word, ind){
    url = "http://www.woorden.org/woord/" + word
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var desc
        $('.span8').filter(function(){
          var data = $(this);
          desc = data.eq(2).eq(0).index('font').eq(0).text();
          desclist.push(desc);
        })
      }
    })
  });
  res.send(desclist);
});

module.exports = router;
