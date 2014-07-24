chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "insertIframe":
            //var resp = JSON.parse(message;
            var kg = this;    
            var url = message.context;
            //var iframeUrl = "https://productsiframe.invisiblehandlabs.com/?tracking_code=ih";

            // Check to see if we are running securely or not
            if (document.location.href.indexOf("https://") === 0) {
               var iframeUrl = "https://localhost:8443/KSAService/iframe.html";
                //var iframeUrl = "https://10.143.24.194:8443/KSAService/iframe.html";
            } else {
                var iframeUrl = "http://localhost:8080/KSAService/iframe.html";
                //var iframeUrl = "http://10.143.24.194:8080/KSAService/iframe.html";
            }


            util.injectIframe(iframeUrl, message.data);
            util.addIframeListener();

            /*var topBarElements = util.buildIframeWithWrapper(iframeUrl, message.data);
            document.body.insertBefore(topBarElements.div, document.body.firstChild);*/

        break;
    }
});

var content = {

    init: function(){
        var kg = this;

        util.init();
    }

};

content.init();