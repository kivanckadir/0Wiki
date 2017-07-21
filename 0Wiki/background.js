var redirect = function(details){
        var actualUrl = details.url;
        var actualUrlParts = actualUrl.split("/");
        var stub = actualUrlParts[2];
        var stubParts = stub.split("\.");
        var domainIndex = stubParts.length - 2;
        if (stubParts[domainIndex] == "wikipedia")
        {
            stubParts.splice(domainIndex, 1, "0wikipedia");
            stub = stubParts.join(".");
            actualUrlParts.splice(2, 1, stub);
            var newUrl = actualUrlParts.join("/");
            return {redirectUrl: newUrl};
        }
	}
	
//Initiliaze (Active)
chrome.webRequest.onBeforeRequest.addListener(redirect, {urls: ["*://*.wikipedia.org/*"]}, ["blocking"]);
chrome.browserAction.setIcon({path:"icon16ON.png"});

chrome.runtime.onMessage.addListener(
	function (response, sender, sendResponse){
		if (response === "uncensored"){
			chrome.webRequest.onBeforeRequest.addListener(redirect, {urls: ["*://*.wikipedia.org/*"]}, ["blocking"]);
			chrome.browserAction.setIcon({path:"icon16ON.png"});
		}
				
		else if (response === "censored"){  
			chrome.webRequest.onBeforeRequest.removeListener(redirect);
			chrome.browserAction.setIcon({path:"icon16OFF.png"});
		}
		
		else if (response === "wikipedia"){  
				chrome.tabs.create({ url: "https://www.wikipedia.org" })
		}
	}
);
