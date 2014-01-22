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
	var v = textNode.nodeValue;

	v = v.replace(/\bLiterally\b/g, "Figuratively");
	v = v.replace(/\bliterally\b/g, "figuratively");
	v = v.replace(/\bWill Blow Your Mind\b/g, "Might Perhaps Mildly Entertain You For a Moment");
	v = v.replace(/\bWill Change Your Life Forever\b/g, "Will Not Change Your Life in ANY Way");
	v = v.replace(/\bDoesn't want you to see\b/g, "Doesn't Really Care If You See");
	v = v.replace(/\bOne Weird Trick\b/g, "One Piece of Completely Anecdotal Horsehit");
	v = v.replace(/\bYou Wont Believe\b/g, "In All Likelihood, You'll Believe");
	v = v.replace(/\bYou Won&#8217;t Believe\b/g, "In All Likelihood, You'll Believe");
	v = v.replace(/\bYou Won’t Believe\b/g, "In All Likelihood, You'll Believe");	
	v = v.replace(/\bYou Won't Believe\b/g, "In All Likelihood, You'll Believe");
	v = v.replace(/\bCan't Handle\b/g, "Can Totally Handle");
	v = v.replace(/\bcan't handle\b/g, "can totally handle");
	v = v.replace(/\bCan't Even Handle\b/g, "Can Totally Handle");
	v = v.replace(/\bCannot Even Handle\b/g, "Can Probably Totally Handle");
	v = v.replace(/\bcannot even handle\b/g, "Can Probably Totally Handle");
	v = v.replace(/\bcan't even handle\b/g, "can totally probably handle");
	v = v.replace(/\bWon the Internet\b/g, "Seemed Pretty Cool");
	v = v.replace(/\bwon the internet\b/g, "seemed pretty cool");
	v = v.replace(/\bScientific Reasons\b/g, "Vaguely Science-y Reasons");
	v = v.replace(/\bThis Is What Happens\b/g, "This Is Our Bullshit Clickbait Version Of What Happens");
	v = v.replace(/\bOne Weird Trick\b/g, "One Piece of Nonsensical Folklore Bullshit ");
	
	
	textNode.nodeValue = v;
}


