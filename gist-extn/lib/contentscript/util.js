var util = {

    init: function(){

        var kgUtil = this;

        // set iframe vars
        kgUtil.iframeVars = {
            id:'kgIframeContainer',
            minHeight:35,
            height:56,
            iframeDomain:'https://localhost:8443',
            body:document.getElementsByTagName("body")[0]
        };

    },

    buildIframeWithWrapper: function(url, data) {
        //alert(data[0].discount_price);
        var kgUtil = this,
            iframe = document.createElement("iframe"),
            div = document.createElement("div");

        if(document.contains(kgUtil.iframeVars.id)){
            var oldElement = this.document.getElementById(kgUtil.iframeVars.id);
            oldElement.parentNode.removeChild(oldElement);
        }

        iframe.src = url;
        iframe.id = kgUtil.iframeVars.id;
        iframe.width = "100%";
        iframe.height = kgUtil.iframeVars.height + "px";
        iframe.border = "none";
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.style.left = 0;
        iframe.style.height = kgUtil.iframeVars.height + "px";
        iframe.style.border = "none";

        div.id = "kgDivContainer";
        div.style.width = "100%";
        div.style.height = kgUtil.iframeVars.height + "px";
        div.style.top = 0;
        div.style.right = 0;
        div.style.cssFloat = "right";
        div.style.position = "fixed";
        div.style.zIndex = "1000000";
        //div.style.visibility = "hidden";

         div.appendChild(iframe);

        return {
            div:div
        };
    },

    //helper function to inject iframe
    injectIframe: function(url, data) {
        var self = this,
            el = self.buildIframe(url);
        document.body.insertBefore(el.div, document.body.firstChild);

        el.iframe.onload = function() {
            var discount_price = data[0].discount_price;


            var fullMessagePayloadString = "This product " + discount_price + "% discount";

            /*var doc = el.iframe.contentWindow.document || el.iframe.contentDocument.document;

            doc.open();
            doc.write(fullMessagePayloadString);
            doc.close();*/

            self.injectScript(fullMessagePayloadString);
        }
    },

    buildIframe: function(url) {
        var self = this,
            iframe = document.createElement("iframe"),
            div = document.createElement("div");

        iframe.src = url ;
        iframe.id = self.iframeVars.id;
        iframe.width = "100%";
        iframe.height = self.iframeVars.height + "px";
        iframe.border = "none";
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        iframe.style.left = 0;
        iframe.style.height = self.iframeVars.height + "px";
        iframe.style.border = "none";

        div.id = "kgDivContainer";
        div.style.width = "100%";
        div.style.height = self.iframeVars.height + "px";
        div.style.top = 0;
        div.style.right = 0;
        div.style.cssFloat = "right";
        div.style.position = "fixed";
        div.style.zIndex = "1000000";

        //self.iframeVars.body.style.cssText = "margin-top:" + self.iframeVars.body.style.marginTop + self.iframeVars.height + "px !important";
        div.appendChild(iframe);

        return {
            div:div,
            iframe:iframe
        };
    },
    injectScript: function(msg) {
        //iframe.contentWindow.postMessage(msg, '*');
        var self = this,
            script = document.createElement("script"),
            head = document.getElementsByTagName("head").item(0);

        script.type = "text/javascript";
        script.text = "var saIframe=document.getElementById('" + self.iframeVars.id + "'); saIframe.contentWindow.postMessage('" + msg + "', '*');";

        head.appendChild(script);
        head.removeChild(script);
    },
    addIframeListener: function() {
        var pf = this;

        //helper.sendMessage({method:'debug', payload: {msg:'Content script: begin addIframeListener...'}});

        var parentReceiveMessage = function(e) {
            if(e.origin!='https://localhost:8443'){return;}
             //var data = JSON.parse(e.data),
                var data = e.data,
                body = document.getElementsByTagName("body")[0],
                saIframe = document.getElementById('kgIframeContainer'),
                saDiv = document.getElementById('kgDivContainer');

                if (data == 'openDropdown') {
                    saIframe.style.height = saDiv.style.height = '100%';

                } else if (data == 'removeNotifBar') {
                    document.body.removeChild(saDiv);

                } else if (data == 'minimizeNotifBar') {
                    saIframe.style.height = saDiv.style.height = helper.iframeVars.minHeight + 'px';
                    saIframe.style.width = saDiv.style.width = '115px';
                    body.style.cssText = "margin-top:" + helper.iframeVars.minHeight + "px !important";

                }
            };

        window.addEventListener('message', parentReceiveMessage, false);

        //helper.sendMessage({method:'debug', payload: {msg:'Content script: end addIframeListener...'}});
    }
};
