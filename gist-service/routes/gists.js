// var gists = [];

// gists.push({
//   name: 'Node.js Logo',
//   path: 'http://nodejs.org/images/logos/nodejs-green.png'
// });
//
// gists.push({
//   name: 'Ryan Speaking',
//   path: 'http://nodejs.org/images/ryan-speaker.jpg'
// });


var Gist = require('../models/Gist');
var path = require('path');
var fs = require('fs');
var join = path.join;


exports.list = function(req, res) {
  Gist.find({}, function(err, gists){
    if(err) {
      return next(err);
    }
    res.render('gists', {
        title: 'DCP Gists',
        gists: gists
    });
  });
};


exports.form = function(req, res) {
  res.render('gists/create', {
    title: 'Gist Create'
  });
};

exports.submit = function(dir) {
  return function(req, res, next) {
    var img = req.files.gist.image;
    var name = req.body.gist.name || img.name;
    var path = join(dir, img.name);
    var type = 'tweet';
    var content = req.body.gist.content;

    fs.rename(img.path, path, function(err) {
      if(err){
        return next(err);
      }

      Gist.create({
          name: name,
          path: img.name,
          type: type,
          content: content

      }, function(err) {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    });

  };
};

exports.add = function(){
  return function(req, res, next){
    var name = req.body.gist.name;
    var path = req.body.gist.path;
    var type = 'bookmark';
    var content = req.body.gist.content;

    Gist.create({
        name: name,
        path: path,
        type: type,
        content: content

    }, function(err) {
      if(err) {
        return next(err);
      }
    });

    res.json(200, {bookmark: "successful"});
  };
};
