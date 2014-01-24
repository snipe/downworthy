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
		var v = textNode.nodeValue;

		var regex, original;

		for(original in replacements) {
			regex = new RegExp('\\b' + original + '\\b', 'g');
			v = v.replace(regex, replacements[original]);
		}

		// TODO: Allow for more complicated regexes in the dictionary file?
		v = v.replace(/\b(?:Top )?((?:(?:\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|Thirty|Forty|Fourty|Fifty|Sixty|Seventy|Eighty|Ninety|Hundred)(?: |-)?)+) Things/g, "Inane Listicle of $1 Things You've Already Seen Somewhere Else");
			
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
		console.log('isPaused is ' + isPaused);

		if(isPaused != 'true') {
			getDictionary(function() {
				walk(document.body);
			});
		}
	});

})();
