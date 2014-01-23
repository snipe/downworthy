function updateBadge(paused){
    if (paused){
        chrome.browserAction.setBadgeText({text:"OFF"});
    } else {
        chrome.browserAction.setBadgeText({text:""});
    }
}

chrome.browserAction.onClicked.addListener(
    function(tab){
        localStorage.setItem("lastChangedAt", now());
        if (localStorage.getItem('paused') == 'true'){
           localStorage.setItem('paused', false);
           updateBadge(false);
        } else {
           localStorage.setItem('paused', true);
           updateBadge(true);
        }
        chrome.tabs.update(tab.id, {url: tab.url});
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.name == "isPaused?")
            sendResponse({value: localStorage.getItem('paused')});
        else if (request.name == "setOptions") {
            localStorage.setItem('options', request.options);
            checkForRandomSwap();
            handleNewOptions(JSON.parse(request.options));
        }
});

var ONE_DAY = 1000 * 60 * 60 * 24;
//returns the current time in millis since epoch
function now() {
  return +new Date();
}

var alreadyQueued = false;
function checkForRandomSwap() {
    var options = JSON.parse(localStorage.getItem('options'));
    if (!options.checkDaily) return;
    var lastChangedAt = parseInt(localStorage.getItem("lastChangedAt"), 10);
    //if we've never changed it, or if it's been over a day since it was changed
    if (isNaN(lastChangedAt) || lastChangedAt + ONE_DAY < now()) {
        lastChangedAt = now();
        var paused = Math.random() > 0.5;
        updateBadge(paused);
        localStorage.setItem('paused', paused);
        localStorage.setItem("lastChangedAt", lastChangedAt);
    }
    if (!alreadyQueued) {
        var time_until_next_check = (lastChangedAt + ONE_DAY) - now();
        alreadyQueued = true;
        setTimeout(function() {
            alreadyQueued = false;
            checkForRandomSwap();
        }, time_until_next_check);
    }
}

updateBadge(localStorage.getItem('paused') == true);
checkForRandomSwap();