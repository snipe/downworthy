(function() {

    // TODO: Abstract localStorage key strings

    var ONE_DAY = 1000 * 60 * 60 * 24;

    var _alreadyQueued = false;
    var _dictionary;

    function now() {
        return new Date().getTime();
    }

    function checkForRandomSwap() {
        var lastChangedAt, pollTimeout;
        var options = JSON.parse(localStorage.getItem('options'));

        // FIXME: Options is apparently not being set?
        if(options.checkDaily) {
            lastChangedAt = parseInt(localStorage.getItem('lastChangedAt'), 10);

            // If it's never been changed, or if it's been over a day since it was changed...
            if(isNaN(lastChangedAt) || lastChangedAt + ONE_DAY < now()) {
                var pause = Math.random() > 0.5; // Flip a coin!
                lastChangedAt = setPaused(pause);
            }

            // Set up the next check.
            if(!_alreadyQueued) {
                pollTimeout = (lastChangedAt + ONE_DAY) - now();

                setTimeout(function() {
                    _alreadyQueued = false;
                    checkForRandomSwap();
                }, pollTimeout);
                
                _alreadyQueued = true;
            }
        }
    }

    // TODO: Embed a default dictionary in case the JSON doesn't load properly?

    function loadDictionary() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                _dictionary = JSON.parse(xhr.responseText);
            }
        };
        // TODO: Select the JSON file from a setting.
        xhr.open("GET", chrome.extension.getURL('dictionaries/original.json'), true);
        xhr.send();
    }

    function updateBadge(paused) {
        var badgeText = paused ? "OFF" : "";
        chrome.browserAction.setBadgeText( { text: badgeText } );
    }

    function setPaused(paused) {
        var lastChangedAt = now();

        localStorage.setItem('paused', paused);
        chrome.storage.sync.set( { 'paused': paused } );
        updateBadge(paused);

        localStorage.setItem('lastChangedAt', lastChangedAt);
        return lastChangedAt;
    }

    function togglePause(tab) {
        var currentlyPaused = localStorage.getItem('paused') == 'true';

        setPaused(!currentlyPaused);

        // Reload the current tab.
        chrome.tabs.update(tab.id, {url: tab.url});
    }

    function onMessage(request, sender, sendResponse) {
        var requestId = request.id;

        if(requestId == 'isPaused?') {
            // TODO: Convert to boolean.
            sendResponse({value: localStorage.getItem('paused')});
        }
        else if(requestId == 'setOptions') {
            localStorage.setItem('options', request.options);
        }
        else if(requestId == 'getDictionary') {
            sendResponse(_dictionary);
        }
    }

    chrome.browserAction.onClicked.addListener(togglePause);
    chrome.extension.onRequest.addListener(onMessage);

    loadDictionary();

    updateBadge(localStorage.getItem('paused') == 'true');

    checkForRandomSwap();

})();
