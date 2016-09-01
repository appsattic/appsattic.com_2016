Yesterday I introduced [Imagelicious](introducing-imagelicious) to the world. (See the main website at
[imagelicious.org](https://imagelicious.org/) for more details). It runs on Firebase which isn't open source and for
some people this isn't correct for a company who claims it is an open source company. But let's talk about why, as the
first Open Source Web App from [AppsAttic](/) it makes sense for me to use this particular platform.

## Image Galleries ##

For a number of years, I have played around with creating image galleries on the web. I've made a static site gallery
creator in Perl, a dynamic one in Node.js and various others along the way.

However, they've all been abandoned at one stage or other. Why? Because of upkeep.

I'm not talking about the code itself because code just sits there, I mean about keeping it running. Having had
bare-metal servers co-located in data centres, moved to cloud VMs and installed programs, set up servers at PaaS
hosting, buckets at IaaS providers and still had various other things to juggle and sort out. All in all I didn't have
the time or energy to keep things up to date or migrate servers/providers along the way.

Until now. And why? Because Firebase does it all.

It keeps your data in the datastore, your files in storage and your site on it's built-in CDN. It allows you to map a
custom domain to your app (for free) and also gives you a free SSL/TLS certificate too. Overall this means that now my
app is live, I don't have to do any maintenance or upkeep to it as time goes on. No DevOps, no System Administration,
no nothing. Overall, Firebase keeps the lights on.

## Small Companies ##

My job in all of this is to create code, fix code, maintain code, accept code and push code. And at each of these steps
I am adding value to the project at every turn. My time isn't being spent (wasted?) making sure the server is ticking
over, isn't running out of memory, isn't using up too much disk space and isn't the victim of a DDOS attack.

As a small company, [AppsAttic](/about) needs to rely on other providers for the heavy lifting. We specialise in using
various cloud providers to solve the hard infrastructure problems so that we can get on with new features, updating old
ones and being creative.

If you'd like to talk to us, please get in touch with [chilts@appsattic.com](mailto:chilts@appsattic.com) or ping us on
Twitter [@AppsAtticLtd](https://twitter.com/AppsAtticLtd). Feel free to poke around our other [projects](/projects/)
too and see if you like anything there. Thanks.
