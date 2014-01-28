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
			regex = new RegExp('\\b' + original + '\\b', "gi");
			v = v.replace(regex, replacements[original]);
		}

		// TODO: Allow for more complicated regexes in the dictionary file?
		v = v.replace(/\b(?:Top )?((?:(?:\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|Thirty|Forty|Fourty|Fifty|Sixty|Seventy|Eighty|Ninety|Hundred)(?: |-)?)+) Things/g, "Inane Listicle of $1 Things You've Already Seen Somewhere Else");
		v = v.replace(/\b[Rr]estored [Mm]y [Ff]aith [Ii]n [Hh]umanity\b/g, "Affected Me In No Meaningful Way Whatsoever");
		v = v.replace(/\b[Rr]estored [Oo]ur [Ff]aith [Ii]n [Hh]umanity\b/g, "Affected Us In No Meaningful Way Whatsoever");
		v = v.replace(/\b(?:Top )?((?:(?:\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|Thirty|Forty|Fourty|Fifty|Sixty|Seventy|Eighty|Ninety|Hundred)(?: |-)?)+) Weird/g, "$1 Boring");
		v = v.replace(/\b^(Is|Can|Do|Will) (.*)\?\B/g, "$1 $2? Maybe, but Most Likely Not.");
		v = v.replace(/\b^([Rr]easons\s|[Ww]hy\s|[Hh]ow\s|[Ww]hat\s[Yy]ou\s[Ss]hould\s[Kk]now\s[Aa]bout\s)(.*)\b$/g, "$2");
			
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

		if(!isPaused) {
			getDictionary(function() {
				walk(document.body);
			});
		}
	});

})();
