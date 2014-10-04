chrome.tabs.onCreated.addListener(function() {
    console.log('Setting icon');
    chrome.browserAction.setIcon({path:'images/icon.png'});
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

  if(typeof(Storage) !== "undefined") {

    var bookmarks = JSON.parse(localStorage.getItem("dcp-gist"));
    if(dcpGist.isUndefined(bookmarks) && dcpGist.isNull(bookmarks)){
      bookmarks = [];
      bookmarks[0] = tab.url;
      dcpGist.markPage(tab, 'bookmark');
      chrome.browserAction.setIcon({path:'images/icon_active.png'});
      localStorage.setItem("dcp-gist", JSON.stringify(bookmarks));

    } else {
      if(dcpGist.isBookmarked(bookmarks, tab.url)){
        dcpGist.removeBookmark(bookmarks, tab.url);
        dcpGist.markPage(tab, 'unbookmark');
        chrome.browserAction.setIcon({path:'images/icon.png'});
      }else{
        bookmarks[bookmarks.length] = tab.url;
        dcpGist.markPage(tab, 'bookmark');
        chrome.browserAction.setIcon({path:'images/icon_active.png'});
        localStorage.setItem("dcp-gist", JSON.stringify(bookmarks));
      }
    }



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
            gistBookmarkUrl: 'http://mighty-woodland-8571.herokuapp.com/articles',
            voteBookmarkUrl: 'http://mighty-woodland-8571.herokuapp.com/vote',
            serviceBaseUrl: 'http://localhost:8080/chromeextension/'/*,
            //gistBookmarkUrl: 'http://localhost:3000/add',
            urlParams:{}*/
        };

  },

  isBookmarked: function(bookmarks, url) {
    if(dcpGist.isUndefined(bookmarks) && dcpGist.isNull(bookmarks)){
      return false;
    } else {
      if(dcpGist.getBookmarkIndex(bookmarks, url) == -1){
        return false;
      }
      else{
        return true;
      }
    }
  },

  getBookmarkIndex: function(bookmarks, url) {
    var bookmarkIndex = bookmarks.indexOf(url);
    return bookmarkIndex;
  },

  getBookmarks: function() {
    var bookmarks = JSON.parse(localStorage.getItem("dcp-gist"));
    return bookmarks;
  },

  storeBookmarksToLocalStorage: function(bookmarks) {
    localStorage.setItem("dcp-gist", JSON.stringify(bookmarks));
  },

  removeBookmark: function(bookmarks, url) {
    var bookmarkIndex = bookmarks.indexOf(url);
    bookmarks.splice(bookmarkIndex, 1);
    dcpGist.storeBookmarksToLocalStorage(bookmarks);
  },

  setIcon: function(tab) {
    var bookmarks = JSON.parse(localStorage.getItem("dcp-gist"));
    if(!dcpGist.isUndefined(bookmarks) && !dcpGist.isNull(bookmarks)){
      var bookmarkIndex = bookmarks.indexOf(tab.url);
      if(dcpGist.pageNotBookmarked(bookmarkIndex)){
        chrome.browserAction.setIcon({path:'images/icon.png'});
      } else {
        chrome.browserAction.setIcon({path:'images/icon_active.png'});
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
                "&gist[content]=" + encodeURIComponent(obj.gistContent) +
                "&gist[unvote]=" + encodeURIComponent(obj.unvote));
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

  markPage: function(tab, action) {
    var self = this;
    var unvote = 'false';
    var endpoint = dcpGist.vars.gistBookmarkUrl;
    var gistName = tab.title;
    var gistPath = tab.url;
    if(action == 'unbookmark'){
      unvote = 'true';
      endpoint = dcpGist.vars.voteBookmarkUrl;
    }
    var gistContent = "Placeholder";
    //var params = "gist[name]=name&gist[path]="+ url + "&gist[content]=''";
    var response = dcpGist.makePostRequest({url:endpoint,
                                              gistName: gistName,
                                              gistPath: gistPath,
                                              unvote: unvote,
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
