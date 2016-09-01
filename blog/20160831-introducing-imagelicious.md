[Imagelicious](https://imagelicious.org/) is an [open source](https://github.com/appsattic/imagelicious.org), personal
photo gallery hosted entirely on [Firebase](https://firebase.google.com/). We have constrained the number of features
we wanted to add to this first version so that we could draw a line underneath it and send it out there. However, we're
also happy to accept pull requests for new features too.

## Using Imagelicious ##

The first thing to realise is that you can't do much on the site if you're not logged in. If you're not logged in, you
may view images if you know the URL but if you don't know any image URLs, then you won't be able to see anything. An
example of one image is:

* https://imagelicious.org/#img/-KQKxex-DBy26PS_mL8i

Once you've viewed the image above, why not click 'Sign in using Google' in the top-right corner. Once you have
authenticated with Google you'll be redirected back to the site and shown you're gallery page. From here you can upload
one or more images to your gallery.

### The Gallery ###

When uploading you can easily select an image from your standard dialog. However, you can also select multiple images
at the same time too. Try it and watch as all image placeholders appear and update to show every bit of progress as it
happens in real time.

As you can see, there is only one 'gallery' but it is a powerful one. You may sort it chronologically ascending or
descending so that you can see which pictures are the oldest or newest ones you have added.

Once you can see your thumbnails, go ahead and click on one to view the image page, just like the one above. Click back
on the browser to go back to your gallery. Once you have more than 20 images, you can also click forwards or backwards
on the pagination buttons to view the previous/next set of images.

### Tag Filtering ###

Finally, to add more power, you may filter your view on any of the tags that you have added to your images. To edit an image, just click the 'Pencil' icon that shows up when you hover over a thumbnail. You'll see a dialog pop up and from here you can edit the images title, description and tags (a comma separated list).

And of course, if you want to share an image with family or friends, either copy the URL from right-clicking one of the
thumbnails or from the address bar when viewing one.

## Technical Specifications ##

Imagelicious contains a wealth of nice features even though the application is relatively small. To support these
features, we've used some technologies to help us along.

* ability to select and upload multiple files at the same time - all progress is updated directly in the browser
* image resize to thumbnails all performed in the browser, uses [pica](https://www.npmjs.com/package/pica)
* hash-based routing using [hashirouter](https://www.npmjs.com/package/hashirouter) (we decided not to use the browser's `pushState()` for this project)
* a single-page app written in Node-like JavaScript, compiled into a bundle using [Browserify](http://browserify.org/)
* all data is stored on Firebase Datastore - data updates propagated in real-time
* files stored and served from Firebase Storage
* served securely using SSL from Firebase's CDN Hosting

## More Info ##

Please see the following resources for more information related to Imagelicious, and feel free to fork it for your own
use.

* Website : [imagelicious.org](https://imagelicious.org/)
* GitHub : [appsattic/imagelicious.org](https://github.com/appsattic/imagelicious.org)
* Project Page : [Imagelicious](/project/imagelicious)

Imagelicious is the first official open source web app created by [AppsAttic](/) but we can asure you it is not the
last. We specialise in JavaScript applications, which mostly means either Node.js on the server, or ReactJS in the
client, but we also write some GoLang for the server too.

All source code in Imagelicious is license [ISC](https://opensource.org/licenses/ISC).
