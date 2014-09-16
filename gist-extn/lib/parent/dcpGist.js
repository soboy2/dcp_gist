var dcpGist = {};

dcpGist.init = function() {
  'use strict';
  var dg = this;

  dg.vars = {
      gistBookmarkUrl:'http://mighty-woodland-8571.herokuapp.com/articles'
  };

};

dcpGist.makePostRequest = function() {

};

dcpGist.pageNotBookmarked = function(marked) {
  if(marked == -1){
    return true;
  }else{
    return false;
  }
};

dcpGist.isUndefined = function(obj) {
  if(typeof obj !== 'undefined') {
    return false;
  } else {
    return true;
  }
};

dcpGist.isNull = function(obj) {
  if(obj !== null) {
    return false;
  } else {
    return true;
  }
};

dcpGist.init();

module.exports = dcpGist;
