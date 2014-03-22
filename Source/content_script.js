(function() {
	var _self = this;
	var _dictionary;

	function getDictionary(callback) {
		chrome.extension.sendRequest({id: "getDictionary"}, function(response) {
			_dictionary = response; // Store the dictionary for later use.
			callback.apply(_self, arguments);
		});
	}

	function handleText(textNode) {
		var replacements = _dictionary.replacements;
    var expressions = _dictionary.expressions;
		var v = textNode.nodeValue;
		var matchFound = false;

		var regex, original;

		//text replacements
		for(original in replacements) {
			original_escaped = original;

			regex_for_question_mark = /\?/g
			regex_for_period = /\./g

			original_escaped = original_escaped.replace(regex_for_question_mark, "\\?");
			original_escaped = original_escaped.replace(regex_for_period, "\\.");
		    
			regex = new RegExp('\\b' + original_escaped + '\\b', "gi");
			if (v.match(regex)) {
				v = v.replace(regex, replacements[original]);	
				matchFound = true;
			}
			
		}
        
		// regex replacements
		for(original in expressions) {
			regex = new RegExp(original, "g");
			if (v.match(regex)) {
				v = v.replace(regex, expressions[original]);
				matchFound = true;	
			}
			
		}
		
		// Only change the node if there was any actual text change
		if (matchFound) {
			textNode.nodeValue = v;	
		}	
		
	}

	function walk(node) {

		// I stole this function from here: - ZW
		// And I stole it from ZW - AG
		// http://is.gd/mwZp7E
		
		var child, next;

		switch(node.nodeType) {
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;
				while(child) {
					next = child.nextSibling;
					walk(child);
					child = next;
				}
				break;
			case 3: // Text node
				handleText(node);
				break;
		}
	}



	// Flag to prevent multiple triggering of DOMSubtreeModified
	// set it to true initially so that the DOMSubtreeModified event
	// does not trigger work until the two chrome.extension requests
	// have been handled
	var running = true;


	// Function that calls walk() but makes sure that it only is called once
	// the first call has finished. Any changes that we make to the DOM in walk()
	// will trigget DOMSubtreeModified, so we handle this by using the running flag
	function work() {
		// Set running to true to prevent more calls until the first one is done
		running = true;
		
		// Go through the DOM
		walk(document.body);

		// Set running to false to allow additional calls
		running = false;
	}



	chrome.extension.sendRequest({id: 'isPaused?'}, function(response) {
		var isPaused = response.value;

		// If the extension is paused, no need to try to call getExcluded
		if(isPaused) {
        return;
    }
    
    chrome.extension.sendRequest({id: 'getExcluded'}, function (r2) {
        
        var ex = r2.value;
        for (x in ex) { 
            if (window.location.href.indexOf(ex[x]) != -1) {
                return;
            }
        }

        getDictionary(function() {
            work();
        });
    });

	});




	/**
		The below solution to handle dynamically added content
		is borrowed from http://stackoverflow.com/a/7326468
		*/

	// Add a timer to prevent instant triggering on each DOM change
	var timeout = null;

	// Add an eventlistener for changes to the DOM, e.g. new content has been loaded via AJAX or similar
	// Any changes that we do to the DOM will trigger this event, so we need to prevent infinite looping
	// by checking the running flag first. 
	document.addEventListener('DOMSubtreeModified', function(){
		if (running) {
			return;
		}

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(work, 500);
	}, false);

})();
