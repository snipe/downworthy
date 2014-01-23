walk(document.body);

function walk(node) 
{
	// I stole this function from here: - ZW
	// And I stole it from ZW
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
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

function handleText(textNode) 
{
	if (localStorage.getItem('paused') != 'true'){
	var v = textNode.nodeValue;

	v = v.replace(/\bAbsolutely\b/g, "Moderately");
	v = v.replace(/\bAmazing\b/g, "Barely Noticeable");
	v = v.replace(/\bamazing\b/g, "pretty commonplace");
	v = v.replace(/\bAwesome\b/g, "Probably Slightly Less Boring Than Working");
	v = v.replace(/\bcan change your life\b/g, "Will Not Change Your Life in ANY Meaningful Way");
	v = v.replace(/\bCan't Even Handle\b/g, "Can Totally Handle Without Any Significant Issue");
	v = v.replace(/\bcan't even handle\b/g, "can totally probably handle");
	v = v.replace(/\bcan't handle\b/g, "can totally handle without any significant issue");
	v = v.replace(/\bCan't Handle\b/g, "Can Totally Handle");
	v = v.replace(/\bcannot even handle\b/g, "Can Probably Totally Handle");
	v = v.replace(/\bCannot Even Handle\b/g, "Can Probably Totally Handle");
	v = v.replace(/\bDoesn't want you to see\b/g, "Doesn't Really Care If You See");
	v = v.replace(/\bepic\b/g, "mundane");
	v = v.replace(/\bEpic\b/g, "Mundane");
	v = v.replace(/\bGo Viral\b/g, "Be Overused So Much That You'll Silently Pray for the Sweet Release of Death to Make it Stop");
	v = v.replace(/\bgreatest\b/g, "average");
	v = v.replace(/\bGreatest\b/g, "Average");
	v = v.replace(/\bIncredible\b/g, "Painfully Ordinary");
	v = v.replace(/\bInfuriate\b/g, "Mildly Annoy");
	v = v.replace(/\bliterally\b/g, "figuratively");
	v = v.replace(/\bLiterally\b/g, "Figuratively");
	v = v.replace(/\bMind Blowing\b/g, "Mind-Numbingly Ordinary");
	v = v.replace(/\bMind-Blowing\b/g, "Painfully Ordinary");
	v = v.replace(/\bNothing Could Prepare Me For\b/g, "Does ANYONE Fucking Care About");
	v = v.replace(/\bof all time\b/g, "for now");
	v = v.replace(/\bOf All Time\b/g, "For Now");
	v = v.replace(/\bOf All Time\b/g, "Of The Last 30 Seconds");
	v = v.replace(/\bof all-time\b/g, "for now");
	v = v.replace(/\bOf All-Time\b/g, "For Now");
	v = v.replace(/\bOMG\b/g, "*yawn*");
	v = v.replace(/\bOMG\b/g, "No One Cares. At All");
	v = v.replace(/\bOne Weird Trick\b/g, "One Piece of Completely Anecdotal Horseshit");
	v = v.replace(/\bone weird trick\b/g, "one piece of nonsensical folklore bullshit");
	v = v.replace(/\bpriceless\b/g, "painfully ordinary");
	v = v.replace(/\bPriceless\b/g, "Painfully Ordinary");
	v = v.replace(/\bRight Now\b/g, "Eventually");
	v = v.replace(/\bScientific Reasons\b/g, "Vaguely Science-y Reasons");
	v = v.replace(/\bShocked\b/g, "Vaguely Surprised");
	v = v.replace(/\bShocking\b/g, "Barely Noticeable");
	v = v.replace(/\bSimple Lessons\b/g, "Inane Pieces of Bullshit Advice");
	v = v.replace(/\bStop What You're Doing\b/g, "Bookmark Now and Later Completely Forget About");
	v = v.replace(/\bStop What You’re Doing\b/g, "Bookmark Now and Later Completely Forget About");
	v = v.replace(/\bStop What You&#8217;re Doing\b/g, "Bookmark Now and Later Completely Forget About");
	v = v.replace(/\bThat Will Make You Rethink\b/g, "That You May Find Vaguely Interesting But Won't Change Your Life in Any Way");
	v = v.replace(/\bThis Is What Happens\b/g, "This Is Our Bullshit Clickbait Version Of What Happens");
	v = v.replace(/\bUnbelievable\b/g, "Painfully Ordinary");
	v = v.replace(/\bUnimaginable\b/g, "Actually Kind of Droll");
	v = v.replace(/\bWHAT\?\b/g, "Some Other Crap");
	v = v.replace(/\bWhoa\b/g, "*yawn*");
	v = v.replace(/\bWHOA\b/g, "Zzzzzzzzzzz");
	v = v.replace(/\bWhoah\b/g, "*yawn*");
	v = v.replace(/\bWill Blow Your Mind\b/g, "Might Perhaps Mildly Entertain You For a Moment");
	v = v.replace(/\bWill Change Your Life Forever\b/g, "Will Not Change Your Life in ANY Meaningful or Lasting Way");
	v = v.replace(/\bwon the internet\b/g, "seems alright");
	v = v.replace(/\bWon the Internet\b/g, "Seemed Pretty Cool");
	v = v.replace(/\bWorst\b/g, "Vaguely Unpleasant");
	v = v.replace(/\bWow\b/g, "Oh GOD This is SO Boring. Please Kill Me");
	v = v.replace(/\bWOW\b/g, "Zzzzzzzzzzz");
	v = v.replace(/\bYou Didn't Know Exist\b/g, "No One Gives a Shit About");
	v = v.replace(/\bYou Didn't Know Existed\b/g, "No One Gives a Shit About");
	v = v.replace(/\bYou Didn’t Know Exist\b/g, "No One Gives a Shit About");
	v = v.replace(/\bYou Didn’t Know Existed\b/g, "No One Gives a Shit About");
	v = v.replace(/\bYou Didn&#8217;t Know Exist\b/g, "No One Gives a Shit About");
	v = v.replace(/\bYou Didn&#8217;t Know Existed\b/g, "No One Gives a Shit About");
	v = v.replace(/\bYou Won't Believe\b/g, "In All Likelihood, You'll Believe");
	v = v.replace(/\bYou Won’t Believe\b/g, "In All Likelihood, You'll Believe");	
	v = v.replace(/\bYou Won&#8217;t Believe\b/g, "In All Likelihood, You'll Believe");
	v = v.replace(/\bYou Wont Believe\b/g, "In All Likelihood, You'll Believe");

	v = v.replace(/\b(?:Top )?((?:(?:\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Fourteen|Fifteen|Sixteen|Seventeen|Eighteen|Nineteen|Twenty|Thirty|Forty|Fourty|Fifty|Sixty|Seventy|Eighty|Ninety|Hundred)(?: |-)?)+) Things/g, "Inane Listicle of $1 Things You've Already Seen Somewhere Else");
	}
			
	textNode.nodeValue = v;
	
}





chrome.extension.sendRequest({name: "isPaused?"}, function(response) {
  if (response.value != 'true') {
    handleText(document.body);

    document.body.addEventListener('DOMNodeInserted', function(event) {
        handleText(event.target);
    });
  }
});
