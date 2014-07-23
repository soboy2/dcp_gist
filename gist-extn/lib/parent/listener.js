//"use strict";
//this is waiting for messages from other parts of the extension
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	console.log("Listener got called");
});
