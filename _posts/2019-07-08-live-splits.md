---
layout: post
title: Live splits at Night of 10,000m PB's
author: Andy Robinson
cover_image: /assets/img/screenshots/salpeter.png
---

On Saturday night, we broadcast live splits directly to the phones and web browsers of over 1000 people, as well as TV titles .  

For the last few years, we have been happy to work with Ben Pochee to take the club entries, and to put the results up as quickly as possible.  We've been able to automatically upload the results as soon as they are recorded for some years.  The challenge now was to get the next level of information out.  After all, if you're watching a 10,000, you want to know how the runners are doing, and who's where in the pack.  

The number of connected phones and screens grew gradually from about 50 at the start of the first race, to over 1000 during the Mens' A Race.  At the same time, the number of hits per minute on our web server grew to about 3,000, and about 600,000 on the day.  So, quite a lot of people were watching!

A big thanks to Phil James and Steve Marshall at Seiko Timing (UK), who worked with us to find an easy way to get their transponder times up to our web servers, as well as operating it all on the day; and Mark and Sally Delgado who did a great job confirming the results.  As soon as a race was recorded and checked, we clicked something to change the dislay from 'provisonal' to 'official' on the web site, and printed and circulated to the Technical Information Centre.

At the same time, our Competition Management System created TV overlays for start lists and results.  Thanks to Matt Quine at Vinco, who worked with us to devise this a year ago; if you go to the live stream at www.runjumpthrow.com, you can see these on screen.

Finally, we were tasked with working out the combined scores for the European Cup 10,000m.  This is based on the best 3 times, across two races.  As soon as the race was marked official, a web page and a PDF report were available for prizegiving.

<h2>How we did it - for geeks only!</h2>
From here on down it gets technical - if that's not for you, feel free to tune out now!

1. Seiko and UKA laid two wire loops under the track at the 200m and 400m points.
2. Athletes wore active transponders on their shoes, which basically encode their bib number
3. Seiko have a console showing lap times, and crucially, allowing accurate lap counting, in addition to the PhotoFinish package
4. They kindly developed a file format to contain the bib, elapsed distance and elapsed time each time someone crosses a mat, and wrote this out to disk, in the same directory which hold the photofinish files.
5. We already have a windows program which syncs this directory to our web server every time a file is changes.
6. The web server updates the race record on our system with the new splits, every 5 seconds or so.  So any new spectators loading a page at that point will see splits up until about ten seconds ago.
7. We use a web service (pusher.com) which allows every open web page to listen for new data, and we send out the 'state of the race' every time we save.  This took some clever compression to get up to 50 splits x 40 runners into a 10k message packet limit.
8. The pages were created with Vue.js, and redraw smoothly every time new data is received.  So, if you were watching, you would see smoothly scrolling lists of times.   (We do the same for field events in a much simpler way).




