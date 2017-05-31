---
title:  Project Plan
layout: default
permalink: /plan/
tags: plan
---

# PLAN

## Project Plan

This is an outline project plan, covering roughly October to May 2015-16 (our funded period).  We're fleshing it out in October.  We aim to produce public requirements documents on which anyone can comment.

## FIWARE obligations and phases
The programme we have been accepted into has strict timescales and targets to secure continued funding.

Phase 2 is to deliver a technical design and business plan by 22nd November.  We then hope to 'get the nod' to continue into development from 1st December.

Phase 3 is the main build, December to April.  We aim to build most aspects of the system, while running events almost weekly. 

Phase 4, if we get that far, is for "market testing and tuning"

## Key architectural building blocks

### Security and access control
The FIWARE ecosystem will give us tools based on OAuth2, to centrally manage thousands of user and offer a "login with Facebook"-style experience.  There will be many different sites - specific ones for events, for clubs and so on - but we want to centrally manage users, password resets etc.


### Open Data:  Database
A hosted database will manage reference and athlete data.  This will be browseable, searchable and support various download and export formats, but will limit what you see based on who you are.  

We aim to have open reference data, with unique IDs, on at least
 - athletic organisations and race-organising bodies
 - clubs
 - venues

 We will also build up a database of athletes, with some data open, and other items as-needed.  This will try to cross reference to other systems (Trinity, other NGBs, masters ranking sites).

 The system must have a process for vetting and matching incoming data.  Some items wil be obviously new, some possibly duplicates that go in a 'holding area'.

In future, the database should be crodwsourced, letting people contribute local information.  It should be possible to delegate the work of adding data to specific teams or volunteers.

 The database can be seeded with Surrey and BMAF athletes.

### Open Source: Libraries
We aim to share release useful building blocks for anyone building systems in the sport.  This may include quite a lot of web front end elements, as most of the action these days is in Javascript.  We'll set up a separate page of useful components.   Data can also be made available in Github pages.

### Open Standards:  JSON and Excel
We will suggest open ways of representing the various packets of data which could be stored and moved between systems:  clubs, membership lists, start lists, results of meetings.   We will provide example files, and tools online to check their validity.

For each agreed JSON file format, we'll try to offer a common-sense Excel equivalent, so people can prepare data in a spreadsheet, paste it into a tool, and check its validity.

This depends on agreeing common codes for disciplines, organising bodies and venues.

## Services we will build
All of this exists to build better athletics systems.  We can break these into roughly three areas:

### Online entries
The online entry system(s) should be able to understand team entries, relay teams, and a lot of what goes on in serious athletics.  

It will rely on data.  Team managers and club secretaries will add athletes as needed, then pick them when it's time to enter an event.  This will save them time, and give validated data to race organisers.

We should charge for this, as everyone else does.  There is no pressing need to earn large sums, but we want to establish if we are building something people could pay for.

### Event management - prepare, time, record

This is the most complex aspect.  An ambitious goal is a real-time, connected system for managing track and field events across multiple stadia.   

I accept there will never be one "winning system", because every event and league has its own way of doing things.  It's probably more sensible to help people build their own, tapping into the OpenTrack ecosystem, and setting up one-off sites for events.  They can still use a readymade system for gathering entries, and publish to a results server

### Results 
We will offer a standard format for results (in flavours for races, relays, and T&F), and a hosted results service which accepts it.  Anyone preparing results in the right way can upload them and we will give back a nice link they can embed in their web site as an IFrame.

## Events we hope to support
We aim to develop with regular cycles, learning from real events.  A precursor system has aready handled one cross country season and a year of entries for county-level events.  The following events are in our calendar:

Surrey League Cross Country (using somewhat legacy system, but feeding our new database).  This is critical as it gets us relationships with 40+ clubs.
- Oct 10th, Nov 7th, Jan 16, Feb 13

Surrey County events:  full year already, but key ones in the period are

- 10 January:  County Cross Country
- 20-21 Feb: Indoor athletics
- 2x May??: 

Local club events:  Thames Hare and Hounds Dash-for-the-Splash (Feb), Alumni Race (Dec), KCS Run2Rio fun run; Thames Second Sunday races.  Simple, low-key events that let us practice timing and results

British Masters events:  handle entries and results display.  Possibly some on-the-day management

- 14 Feb : 10 Mile championships - entries and results
- 13 Mar : BMAF Cross Country, Bath
- 02 Apr: BMAF 10k Championships, Queen Elizabeth Olympic Park
- 14 May:  BMAF Road Relay Championships, Sutton Park

European Masters:  aim to have some involvement and spread the word, maybe real-time results display?

- 29 Mar to 3 Apr - Ancona  
- 20-22 May - nob-stadia champs, Faro, Algarve

The question, of course, is WHAT we can do for each of these while still developing solid software.  
