[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=snipe&url=http://github.com/snipe/downworthy&title=Downworthy&language=&tags=github&category=software)

Downworthy Chrome Extension
==========
This is a very rough version right now, not quite ready for prime-time, but the general 
gist is that of a Chrome extension (Safari and maybe FF coming soon) that replaces the absurd hyberbole of viral content sites like Buzzfeed, ViralNova, Upworthy, etc with more realistic headlines.  

Here are some samples, although not all have been implemented yet:

	"Literally" => figuratively
	"Will blow your mind" => may be of moderate interest to you
	"Will change your life forever"
	"Doesn't want you to see"
	"Is turned upside down"
	"Might/will/may make(s) you $foo"
	"One weird trick"
	"WATCH:" 
	"Actually" => "probably"
	"Unconventional" 
	"What if"
	"Infinitely"
	"Embarrassingly"
	"Here's a 5-minute video that will make you rethink our entire news media circus"
	"You won't believe"
	"Can't even handle"
	"Can't handle"
	"Shocking"
	"Incredible"
	"Truly shocking"
	"READ:"
	"Stop what you're doing"
	"Right now"
	"$x $adjective $nouns" => "another fucking listicle"
	"All you need today"
	"You'll never need another $foo"
	"Greatest blah of all time"
	"Flawless"
	"Owns the Internet"
	"Ruled the Internet"
	"Won the Internet"
	"The $x adjective nouns"
	"That caused one"
	- add "nobody cares"
	- prepend + append
	“Only $foo will understand”
	“only people with $foo understand”
	“that will make you rethink”
	“$blah simple lessons"

The code I have right now is very basic, working mostly from the fantastic Cloud-to-Butt extension, but I'll be adding in some smarter logic later to handle slightly more sophistcated English constructs. 

I also need to better handle infinite scroll and progressive loading. Right now, it fires when the DOM is finished loading, and then it doesn't fire again, which means when you're stuck on one of these websites (that of course uses infinte scroll), the stuff that hasn't appeared on the page at the time of page load completetion and prior to additional content being revealed won't be transformed.
