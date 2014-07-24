"use strict";

$(function(){

  var iframe = $('#popup_search');

  //alert(iframe[0].contentWindow.document.body.scrollHeight + 'px');

  //resizeIframe(iframe[0]);

  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    //obj.style.height = '151' + 'px';
  }

});


/*
    $(function(){
    
        var iFrames = $('iframe');
      
      function iResize() {
      
        for (var i = 0, j = iFrames.length; i < j; i++) {
          iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';}
          }
          
          if ($.browser.safari || $.browser.opera) { 
          
             iFrames.load(function(){
                 setTimeout(iResize, 0);
               });
            
             for (var i = 0, j = iFrames.length; i < j; i++) {
              var iSource = iFrames[i].src;
              iFrames[i].src = '';
              iFrames[i].src = iSource;
               }
               
          } else {
             iFrames.load(function() { 
                 this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
             });
          }
        
        });*/
