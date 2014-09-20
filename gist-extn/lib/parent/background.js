chrome.tabs.onCreated.addListener(function() {
    console.log('Setting icon');
    chrome.browserAction.setIcon({path:'images/icon_kroger.png'});
});

chrome.tabs.onActivated.addListener(function(info) {
  var tab = chrome.tabs.get(info.tabId, function(tab) {
    dcpGist.setIcon(tab);

  });

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  dcpGist.setIcon(tab);

});



chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Bookmarking ' + tab.url);

  dcpGist.bookmarkPage(tab);

  chrome.browserAction.setIcon({path:'images/icon_kroger_active.png'});

  if(typeof(Storage) !== "undefined") {

    var bookmarks = JSON.parse(localStorage.getItem("dcp-gist"));
    if(dcpGist.isUndefined(bookmarks) && dcpGist.isNull(bookmarks)){
      bookmarks[bookmarks.length] = tab.url;
    } else {
      bookmarks = [];
      bookmarks[0] = tab.url;
    }

    localStorage.setItem("dcp-gist", JSON.stringify(bookmarks));

  } else {
    // Sorry! No Web Storage support..
  }

});


var dcpGist = {
  init: function(){

    var dg = this;

    if (typeof chrome !== 'undefined') {
            dg.isChrome = true;
    }

        dg.vars = {
            url:'https://localhost:8443/KSAService/',
            gistBookmarkUrl:'http://mighty-woodland-8571.herokuapp.com/articles',
            serviceBaseUrl: 'http://localhost:8080/chromeextension/'/*,
            //gistBookmarkUrl: 'http://localhost:3000/add',
            urlParams:{}*/
        };

  },

  isBookmarked: function(url) {
    var bookmarks = JSON.parse(localStorage.getItem("dcp-gist"));
    if(dcpGist.isUndefined(bookmarks) && dcpGist.isNull(bookmarks)){
      var marked = bookmarks.indexOf(tab.url);
      if(dcpGist.pageNotBookmarked(marked)){
        return false;
      }
    }

    return false;
  },

  setIcon: function(tab) {
    var bookmarks = JSON.parse(localStorage.getItem("dcp-gist"));
    if(dcpGist.isUndefined(bookmarks) && dcpGist.isNull(bookmarks)){
      var marked = bookmarks.indexOf(tab.url);
      if(dcpGist.pageNotBookmarked(marked)){
        chrome.browserAction.setIcon({path:'images/icon_kroger.png'});
      } else {
        chrome.browserAction.setIcon({path:'images/icon_kroger_active.png'});
      }
    }
  },

  parseJson: function(str) {
    if (this.isChrome || this.isFirefox) {
      return JSON.parse(str);
    } else {
      return null;
    }
  },

  displayBadgeInfo: function(info){
    chrome.tabs.getSelected(null, function(tab){
      chrome.browserAction.setBadgeText({text: info});
    });
  },

  makePostRequest: function(obj) {
    var xhr,
    self = this;

    if (self.isChrome) {
      xhr = new XMLHttpRequest();

      xhr.open("POST", obj.url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("gist[name]=" + encodeURIComponent(obj.gistName) +
                "&gist[path]=" + encodeURIComponent(obj.gistPath) +
                "&gist[content]=" + encodeURIComponent(obj.gistContent));
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var status = xhr.status;
          if ((status >= 200 && status < 300) || status === 304) {
              if (obj.onComplete) {
                  obj.onComplete(xhr.responseText);
              }
          } else {
              self.debug("ended with error...status="+status);
          }
        }
      };
    }

  },

  makeGetRequest: function(obj) {
    // var timestamp = new Date().getTime();
    var xhr,
      self = this;

    if (self.isChrome) {
      xhr = new XMLHttpRequest();

      xhr.open("GET", obj.url, true);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var status = xhr.status;
          if ((status >= 200 && status < 300) || status === 304) {
            if (obj.onComplete) {
              obj.onComplete(xhr.responseText);
            }
          } else {
              //self.debug("ended with error...status="+status);
          }
        }
      };
    }
  },

  bookmarkPage: function(tab) {
    var self = this;
    var endpoint = dcpGist.vars.gistBookmarkUrl;
    var gistName = tab.title;
    var gistPath = tab.url;
    var gistContent = "Placeholder";
    //var params = "gist[name]=name&gist[path]="+ url + "&gist[content]=''";
    var response = dcpGist.makePostRequest({url:endpoint,
                                              gistName: gistName,
                                              gistPath: gistPath,
                                              gistContent: gistContent,
                                                overrideMimeType: "application/json",
                                                onComplete: function(response){
                                                  //var result = self.parseJson(response)

                                                }
                                              });
  },

  pageNotBookmarked: function(marked) {
    if(marked == -1){
      return true;
    }else{
      return false;
    }
  },

  isUndefined: function(obj) {
    if(typeof obj !== 'undefined') {
      return false;
    } else {
      return true;
    }
  },

  isNull: function(obj) {
    if(obj !== null) {
      return false;
    } else {
      return true;
    }
  }

};



dcpGist.init();
