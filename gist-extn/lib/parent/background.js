chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Bookmarking ' + tab.url);

  dcpGist.bookmarkPage(tab.url);
  // chrome.tabs.executeScript({
  //   code: 'document.body.style.backgroundColor="red"'
  // });
});


var dcpGist = {
  init: function(){

    var dg = this;

    if (typeof chrome !== 'undefined') {
            dg.isChrome = true;
    }

        dg.vars = {
            url:'https://localhost:8443/KSAService/',
            gistBookmarkUrl: 'http://localhost:3000/add',
            serviceBaseUrl: 'http://localhost:8080/chromeextension/'/*,
            urlParams:{}*/
        };

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

  bookmarkPage: function(url) {
    var self = this;
    var endpoint = dcpGist.vars.gistBookmarkUrl;
    var gistName = "bookMark test";
    var gistPath = url;
    var gistContent = "Placeholder";
    //var params = "gist[name]=name&gist[path]="+ url + "&gist[content]=''";
    var response = dcpGist.makePostRequest({url:endpoint,
                                              gistName: gistName,
                                              gistPath: gistPath,
                                              gistContent: gistContent,
                                                overrideMimeType: "application/json",
                                                onComplete: function(response){
                                                  var result = self.parseJson(response)
                                                  //self.displayBadgeInfo(result.fuel_points + "day");
                                                }
                                              });
  }
};



dcpGist.init();
