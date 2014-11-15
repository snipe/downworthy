(function() {
    var _self = this;
    var _dictionary = {
        "replacements": {
            "A Single" : "A",
    "Absolutely" : "Moderately",
    "Amazing" : "Barely Noticeable",
    "Awesome" : "Probably Slightly Less Boring Than Working",
    "Best" : "Most Unexceptional",
    "Breathtaking" : "Fleetingly Inspirational",
    "But what happened next" : "And As You Expect It",
    "Can change your life" : "Will Not Change Your Life in ANY Meaningful Way",
    "Can't Even Handle" : "Can Totally Handle Without Any Significant Issue",
    "Can't Handle" : "Can Totally Handle Without Any Significant Issue",
    "Cannot Even Handle" : "Can Probably Totally Handle",
    "Doesn't want you to see" : "Doesn't Really Care If You See",
    "Epic" : "Mundane",
    "Everything You Need To Know" : "Something You Don't Need To Know",
    "Gasp-Worthy" : "Yawn-Worthy",
    "Go Viral" : "Be Overused So Much That You'll Silently Pray for the Sweet Release of Death to Make it Stop",
    "Greatest" : "Average",
    "Incredible" : "Painfully Ordinary",
    "Infuriate" : "Mildly Annoy",
    "Literally" : "Figuratively",
    "Mind Blowing" : "Mind-Numbingly Ordinary",
    "Mind-Blowing" : "Painfully Ordinary",
    "Mind BLOWN" : "Meh",
    "Mind Blown" : "Meh",
    "Need To Visit Before You Die" : "May Enjoy If You Get Around To It",
    "Nothing Could Prepare Me For" : "Does ANYONE Fucking Care About",
    "Of All Time" : "For Now",
    "Of All Time" : "Of The Last 30 Seconds",
    "Of All-Time" : "For Now",
    "OMG" : "*yawn*",
    "OMG" : "No One Cares. At All",
    "One Weird Trick" : "One Piece of Completely Anecdotal Horseshit",
    "Perfection" : "Mediocrity",
    "Priceless" : "Painfully Ordinary",
    "Prove" : "Suggest",
    "Right Now" : "Eventually",
    "Scientific Reasons" : "Vaguely Science-y Reasons",
    "Shocked" : "Vaguely Surprised",
    "Shocking" : "Barely Noticeable",
    "Simple Lessons" : "Inane Pieces of Bullshit Advice",
    "Stop What You're Doing" : "Bookmark Now and Later Completely Forget About",
    "Stop What You’re Doing" : "Bookmark Now and Later Completely Forget About",
    "Stop What You&#8217;re Doing" : "Bookmark Now and Later Completely Forget About",
    "TERRIFYING" : "MODERATELY UNCOMFORTABLE",
    "Terrifying" : "Thoroughly Banal",
    "That Will Make You Rethink" : "That You May Find Vaguely Interesting But Won't Change Your Life in Any Way",
    "The World's Best" : "An Adequate",
    "This Is What Happens" : "This Is Our Bullshit Clickbait Version Of What Happens",
    "Totally blew my mind" : "Bored Me To Tears",
    "Unbelievable" : "Painfully Ordinary",
    "Unimaginable" : "Actually Kind of Droll",
    "WHAT?" : "Some Other Crap",
    "Whoa" : "*yawn*",
    "WHOA" : "Zzzzzzzzzzz",
    "Whoah" : "*yawn*",
    "Will Blow Your Mind" : "Might Perhaps Mildly Entertain You For a Moment",
    "Will Change Your Life Forever" : "Will Not Change Your Life in ANY Meaningful or Lasting Way",
    "Won the Internet" : "Seemed Pretty Cool",
    "Wonderful" : "Mildly Decent",
    "Worst" : "Vaguely Unpleasant",
    "Wow" : "Oh GOD This is SO Boring. Please Kill Me",
    "WOW" : "Zzzzzzzzzzz",
    "You Didn't Know Exist" : "No One Gives a Shit About",
    "You Didn't Know Existed" : "No One Gives a Shit About",
    "You Didn’t Know Exist" : "No One Gives a Shit About",
    "You Didn’t Know Existed" : "No One Gives a Shit About",
    "You Didn&#8217;t Know Exist" : "No One Gives a Shit About",
    "You Didn&#8217;t Know Existed" : "No One Gives a Shit About",
    "You Won't Believe" : "In All Likelihood, You'll Believe",
    "You Won’t Believe" : "In All Likelihood, You'll Believe",
    "You Won&#8217;t Believe" : "In All Likelihood, You'll Believe",
    "You Wont Believe" : "In All Likelihood, You'll Believe"
        },

        "expressions": {
            "\\b(?:Top )?((?:(?:\\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|Thirty|Forty|Fourty|Fifty|Sixty|Seventy|Eighty|Ninety|Hundred)(?: |-)?)+) Things" : "Inane Listicle of $1 Things You've Already Seen Somewhere Else",
            "\\b[Rr]estored [Mm]y [Ff]aith [Ii]n [Hh]umanity\\b" : "Affected Me In No Meaningful Way Whatsoever",
            "\\b[Rr]estored [Oo]ur [Ff]aith [Ii]n [Hh]umanity\\b" : "Affected Us In No Meaningful Way Whatsoever",
            "\\b(?:Top )?((?:(?:\\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|Thirty|Forty|Fourty|Fifty|Sixty|Seventy|Eighty|Ninety|Hundred)(?: |-)?)+) Weird" : "$1 Boring",
            "\\b^(Is|Can|Do|Will) (.*)\\?\\B" : "$1 $2? Maybe, but Most Likely Not.",
            "\\b^([Rr]easons\\s|[Ww]hy\\s|[Hh]ow\\s|[Ww]hat\\s[Yy]ou\\s[Ss]hould\\s[Kk]now\\s[Aa]bout\\s)(.*)\\b$":"$2"
        }
    };

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
    var running = false;


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

