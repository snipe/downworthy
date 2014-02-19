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

		var regex, original;

		//text replacements
        for(original in replacements) {
            original_escaped = original;
            
            regex_for_question_mark = /\?/g
            regex_for_period = /\./g
            
            original_escaped = original_escaped.replace(regex_for_question_mark, "\\?");
            original_escaped = original_escaped.replace(regex_for_period, "\\.");
            
			regex = new RegExp('\\b' + original_escaped + '\\b', "gi");
            v = v.replace(regex, replacements[original]);
		}
        
        // regex replacements
        for(original in expressions) {
			regex = new RegExp(original, "g");
			v = v.replace(regex, expressions[original]);
		}
			
		textNode.nodeValue = v;
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

	chrome.extension.sendRequest({id: 'isPaused?'}, function(response) {
		var isPaused = response.value;

        chrome.extension.sendRequest({id: 'getExcluded'}, function (r2) {
            if(isPaused) {
                return;
            }
            
            var ex = r2.value;
            for (x in ex) { 
                if (window.location.href.indexOf(ex[x]) != -1) {
                    return;
                }
            }

            getDictionary(function() {
                walk(document.body);
            });
        });

	});

})();
