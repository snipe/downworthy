[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=snipe&url=http://github.com/snipe/downworthy&title=Downworthy&language=&tags=github&category=software)

Downworthy Chrome Extension
==========
This is a very rough version right now, not quite ready for prime-time, but the general 
gist is that of a Chrome extension (Safari and maybe FF coming soon) that replaces the absurd hyberbole of clickbait viral content sites like Buzzfeed, ViralNova, Upworthy, etc with more realistic headlines. 

Examples from Real ViralNova Articles:
====

![Alt text](/images/article.png?raw=true "Sample Screenshot") 

Original text: Nothing Could Prepare Me For What’s Revealed When This Glacier Lake Melts. OMG
![Original Title: Nothing Could Prepare Me For What’s Revealed When This Glacier Lake Melts. OMG](/images/lake.png?raw=true "Nothing Could Prepare Me For What’s Revealed When This Glacier Lake Melts. OMG") 

To Do:
====
The code I have right now is very basic, working mostly from the fantastic Cloud-to-Butt extension, but I'll be adding in some smarter logic later to handle slightly more sophistcated English constructs. 

I also need to better handle infinite scroll and progressive loading. Right now, it fires when the DOM is finished loading, and then it doesn't fire again, which means when you're stuck on one of these websites (that of course uses infinte scroll), the stuff that hasn't appeared on the page at the time of page load completetion and prior to additional content being revealed won't be transformed. 

I'll also be adding a toggle icon, so you can turn it off when you need to actually see the real content. 

And finally, I'm going to have the actual string replacement library pulling from S3, so that it updates automatically, so when I update the goods, you get them the next time you start your browser.
