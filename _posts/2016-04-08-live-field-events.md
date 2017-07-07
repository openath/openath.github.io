---
layout: post
title: Live field events display
author: Andy Robinson
cover_image: http://file.opentrack.run/img/2017/shot_demo1.jpg
---

A big thanks to Chris Dack for our first major open-source contribution.  <a href="/shotdemo/">Click here</a>, or the picture below, to check out how he presents the Shot Put results from last year's UK finals!

[![Shot demo](http://file.opentrack.run/img/2017/shot_demo1.jpg)](http://file.opentrack.run/img/2017/shot_demo1.jpg)

<div class="row">
    <div class="col-md-12">
        <a href="/shotdemo/">
        <img class="img-rounded" 
            style="border: 1px solid; width:100%" 
            src="https://raceresults.reportlab.com/media/pix/RLIMG_10e802eb8c7922ce2b22d5ee7bdd27d7.png" 
            alt="Old style"/>
        </a>
    </div>
</div>


This is a demonstration of how we can display field event results, live, so that spectators can follow the action. We're "replaying" a competition in a loop for demo purposes. For an event in progress, an official with a phone or tablet would input the throws, and anyone watching - parents and friends at trackside, or anywhere in the world - can follow the state of the match easily. Try viewing this on multiple devices, the updates should arrive on each device simultaneously.

We think this will really help people to follow field events.

This is also a great demonstration of what people can do when we have a standard way to represent results.    The results of all the throws, long jump and triple jump can be represented in a simple format, usually with up to six results per person.  If we can capture this and serve it up, then Chris's code can produce this kind of display.   And it's Open Source, so if you're a developer and want to help adding more modes to visualise things, more options and so on, you can roll your sleeves up and help.

We're hoping to prototype the actual data capture on tablets or phones in May.  So an assistant at a field event can record the performamces, and the public can watch.

Disclaimer:  all of this is in its earliest stages.  This is not something you club can use right away.  If you're interested, the <a href="https://github.com/openath/">code is here</a>, and discussion and feedback are welcome
    <a href="http://forum.opentrack.run">on our forum</a>

We'll post up the suggested standard data after the weekend.

- Andy
