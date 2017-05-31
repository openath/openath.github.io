---
title: Open Standards
layout: default
permalink: /standards/
tags: standards
---

# STANDARDS

## The importance of open standards

Lots of people are building systems to manage parts of the sport.  No one system will ever do it all.  It would be a huge step forward if we could agree common interchange formats.    

We'd like to evolve agreed standards for interchange between systems.  This will hopefully involve both system-to-system standards (e.g JSON document formats), and human-friendly ones. The human-friendly ones will largely relate to what headings and values to use in spreadsheets; we can provide tools to check these and convert to JSON.

This document is not aiming for the levels of precision of an ISO or Internet standard.  In the words of the Internet Engineering Task Force, we want "rough consensus and running code".  To this end we do NOT need to agree now exactly how to represent unusual or historic events such as the six mile track record, or quibble too much about recording the exact weight of the javelin used; these are important, but we can achieve other things while these are being discussed.   We DO need to start representing the common events in the same ways.

If you disagree with the standards, join the forum (coming soon) and argue, or make counter-suggestions, so we can reach the best solution quickly.  The OpenTrack project wants to set its standards quickly.   If yu are happy to follow these standards, let us know and we'll add your name to a list to put pressure on others.

The process will likely work at two levels

 - codes and representations: what we put in fields
 - commn reference data:  how do we all refer to a particular club or team, or a venue?
 - example documents to represent things like athletes, start lists, fixtures and results
 

## Codes and representation

We want to set unambiguous codes for the "things" use to build databases and systems.  It is useful if these codes are safe for use in URL parameters (avoiding '?' and '/'), markup ('<, & and &'), and in filenames.  It is also useful if they are not case-sensitive.  There are workarounds for all of these things, but let's just avoid as many as we can.  


### Gender 

Let's warm up with something simple:

    M = Male
    F = Female

If the 1976 Olympic Decathlon champion decides to make a comeback, we can discuss complicating things then.

Thus, if exchanging athlete data, we might have a JSON document like this...

    {"firstName": "Fred", "lastName": "Bloggs", "gender": "M"}

..and in a spreadsheet, we would have a column with "M" or "F"

Unfortunately nothing is so simple.  There is an issue with using F=Female in that usually the age categories are derived from the gender e.g. M40.  Masters athletics from the world level downwards has however adopted age categories of W35, W40 etc. On the other hand W=Women would not work very well for the young athletes. We will have to take this into account when linking gender and age category. 

### Countries

Three letter ISO codes are preferred:

    GBR
    FRA
    ESP

Great Britain has some "history" here to make life more complex, so we allow for some "pseudo-countries":

    ENG
    SCO
    WAL
    NIR




### Dates

We aim to be guided by <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>

Databases have rich ways to store dates, date-times and times, complete with time zone information.  In athletics this can be troublesome, unless you are very careful.  For example, you set up your county championships timetable in some detail in March, then the clocks change, and you find the computer assumed GMT when you entered in, and everyone shows up an hour off; or that you are advertising the wrong start time for an early-autumn cross country race.  (Yes, this has happened!)

    "2015-10-17"  - use for dates, the ISO standard.  (Excel will differ)
    "14:35"       - use for the start time of an event, for historic or programme purposes

When describing programmes or sets of results, we recommend separating the dates and times. 

#### Dates in Excel and user interfaces
Pasting or importing of dates and times from Excel is risky.  Spreadsheets understand dates, but if you go via a clipboard or to CSV/text, there is the risk of muddling days and months.   Within a spreadsheet, dates should be proper dates.

User input is however best done in the format that users are familiar with, even though the date is stored internally in a proper, unambiguous format. Thus UK users would prefer 25/12/2014.  This could be made configurable by taking the date format from their international settings.  System output is also prescribed sometimes e.g. consistency with external sources. In this case the date format should be configurable according to the purpose of the output.  

### Performances, time and distance

In results, we need to record the time or distance.  This is different from recording the start time of an event.  

Times should be passed in a decimalized text format and interpreted as a number of seconds, so we know the precision that was given. If one colon is present, it denotes minutes and seconds; two colons are hours/minutes/seconds.  Ultra runners going beyond 24 hours will have to count in hours to keep life simple for the rest of us!

    9.58
    58.5
    63.5
    1:03.5   - equivalent to 63.5, first digit assumed to be minutes
    2:03     - assumed to be an 800m time of 2 minutes, and not a Marathon, because only one colon
    2:02:57  - the marathon world record, two colons so contains hours
    73:15    - a half marathon time, equivalent to 1:03:15

Distances for jumps and throws can be stored as decimal numbers.

There are some standard suffixes which are commonly used in results and rankings:  10.3i to denote indoors, 10.3w to suggest wind-assisted. We see this as a presentation layer problem; a good database or rankings system would decompose this to have an 'indoor' or 'wind-assisted' flag.



### Event Codes
If we are exporting the data from an online entry system, or the results of a meeting, we want to use common codes, so that the 400m is always represented the same way.

A wise computer scientist once said "There are only two hard problems in computer science - cache invalidation and naming things".  Never mind the first one - it's really hard to pick names. Especially, it's hard to pin down the word "Event".  BY popular consensus we are calling these things "event codes".  

If you are looking at a programme, the "U13 Girls High Jump first round, Sat 10:35" is more of an "event", in the sense of "something that happens at a point in time".  We might call the latter 'CompEvent' or 'ProgEvent' (to be discussed)

Our "first stab" is based on the codes from Power of Ten, which appear in the URL search parameters. However, we have introduced some slight changes.  In particular, we don't want the interpretation to depend on the case of a letter.  So 'm' meaning both Metre and Mile is dangerous.


    HJ, PV, LJ, TJ, SP, DT, HT, JT, WT               - field events
    60, 100, 200, 400, 800, 1500, 3000, 5000, 10000  - track (and other distances for junior races)
                                                     - Any raw number is assumed to be a number in metres

    60H, 80H, 100H, 110H, 200H, 300H, 400H           - number + 'H' denotes hurdles
    2000SC, 3000SC                                   - steeplechase
    DEC, HEP, HEPI, PEN, PENWT                       - multi-events.  Case variations acceptable. 
    20KW, 50KW                                       - walks
    4x100, 4x400                                     - track relays.  

For field events, there is usually a default weight for a given age group and gender, but we can indicate a specific weight of implement as follows.  (We followed Power of Ten, who use these for filter parameters in URLs).  

    SP7.26k, SP6K, SP5K, SP4K, SP3K
    DT2K, DT1.75K, DT1.5K, DT1K
    JT800, JT700, JT600, JT500, JT400
    HT7.26K, HT6k, HT5k, HT4k, HT3k
    WT15.88K, WT11.34K, WT9.08K, WT7.26K, WT5.45K

Hurdles have adjustable heights, defined originally in 3 inch increments (but usually described in millimetres).  Usually, this does not need to be given, because it's a standard.  However, for some Masters and younger competitions, hurdles may be lowered.   If it is necesssary to disambuguate, we can use two digits for "feet and inches". This gives much simpler numbers than the metric equivalents.  For example

    110H36  - 3'6" or 1.067  - normal men's hurdle height
    110H33  - 3'3" or 0.991  - used for some masters' competitions.




Some events, such as the <a href="http://www.dailymail.co.uk/news/article-3671604/Couples-test-strength-marriages-2016-World-Wife-Carrying-Championships.html">Finnish Wife-Carrying championships</a>, are harder to standardise so will be left for a future version.

The mile is special and of historic importance.  So, in a programme or set of entries, we suggest to allow

    MILE  - as it says.

Moving onto road and cross country, we'd like to suggest an open-ended standard: a combination of a rough distance measure and a suffix which shows the units.  

    2K, 5k, 10K, 4.5K  - distance in kilometers
    5M, 10M, 2.2M      - distance in miles  (NOT metres!)
    MAR                - marathon
    HM                 - half marathon
    
    5MXC               - any of the above plus "XC" denotes cross country.

It is not necessary to add an XC suffix; this depends on the context.  

As an example, we're taking entries now for a school fundraiser with three races.  We call them "2K", "5K" and "10K" in the database, and will use those codes as field IDs in the web form, or in a spreadsheet summarising the entries.  We don't need to add "XC", because they all are.  They can have more expansive display names like "2K jog-with-the-dog" if desired.

The advantage of this is that one can compute a very rough speed and thus check if the input given is realistic.  For example, if you are taking online entries and your code for the Masters XC race is just "XC", you have no way to know if a predicted or actual time of "30.15" is realistic.  But if you know you are talkin about a 5 mile race, it's pretty clear that 30:15 was intended, and you can either reject or "fix" the input depending on your philosophy.

The <a href="http://www.iaaf.org/records/toplists/">IAAF web site</a> uses 'slugs' - URL components - such as 'one-mile' and 'high-jump'.  These are certainly useful and could be added to a standard.

The short codes will be OK for results but not for instance in competition programmes.  There it might be better to have standard short descriptions e.g. Shot Put, 100m Hurdles 

#### Ordering of disciplines ###

There is a "natural order", at least in UK athletics, which people expect to see on entry forms or in dropdowns.  For a track meeting, it is as follows:

    1. Track events, increasing distance
    2. Hurdles, increasing distance
    3. Steeplechases
    4. Field events:  HJ PV LJ TJ SP DT HT JT
    5. Relays, increasing distance

Therefore we could benefit from some open source code to sort events in this order, and should use this in any statistical reports.

### Age Groups ##

UKA has well defined age group codes:  U13, U15, U17, U20, U23 (rarely used), SEN.  The definition depends on the type of competition (Road, XC, Track and Field), the date of birth of the athlete and the start date of the competition.

It is very common in results and entries to conflate the age and gender.   Eveen more annoyingly for programmers, in the UK we tend to add an age-dependent suffix - 'B' for Boys, 'G' for girls, 'M' for Men and 'W' for women.  Thus, a county or national programme would list U13B, U15B, U17M, U20M.

Masters go in 5 year bands:  V35, V40, V45 etc.   This is a global standard set by WMA. It is commonly conflated with gender e.g. M45, W50.

Schools are commonly referred to be year in the UK, so we suggest  YEAR1...YEAR11.  (Would YEAR01, YEAR02...YEAR11 be better so they always sort in order?)

Different countries are expected to have different age group coding systems and cutoff rules.  Therefore, a well designed library would have 'namespaced' packages for countries or organising bodies with equivalent, swappable functions.

    from athlib.uka import age_group
    from athlib.wma import age_group

IAAF age groups - apparently different, need to check rules




### Disability Categories ##

We need a list and a link to a good explanation


## Common reference data

It would be really, really useful if everyone could agree unambiguously on how to refer to clubs and associations, and to venues.   Our plan for this is as follows:

 * We will offer an "identity service", giving unique IDs to all the clubs, associations, and venues we can
 * We will provide a web site making these things easy to find
 * We will make reasonable efforts to de-duplicate these
 * We will let people "claim their club" and add extra open information - logos, flags, nicknames, training venues, contact details
 * These codes and IDs will be OPEN DATA, and anyone is free to use them - downloaded in bulk, or via web forms and APIs

### Clubs: an example
Taking clubs as an example:  each club in England has a unique 8-digit code assigned by England Athletics, in the "Trinity" database.  These have now been made available as Open Data - many thanks to Engladnd Athletics for this.    This is very helpful indeed, but sometimes we need to compete against a non-English club or athlete, so a potentially global standard is needed.

We have taken a database created jointly by Simon Fennel, Peter Kennedy and ourselves with over 3000 athletics organisations, and given each of them a Universally Unique ID (UUID).  These are a computing standard.  For example, I hereby decree that my club Thames Hare and Hounds may hereafter be referred to by all and sundry as....drum roll....

    opentrack_id:  6b2af700-0481-4f73-b9ae-8221ae619b55

UUIDs are easy to generate and process in all programming languages.  There are more available than there are atoms in the universe. They do have some useful properties.  They embed a timestamp, so a computer can work out when they were created.  And practically, they are "evenly spread", so the first 8 characters - 6b2af700 - will almost certainly be good enough to identify that club for practical purposes.  And you'd probably get away with "6b2a" for quite a while.

However, we don't expect this to catch on, so we also propose to allocate an opentrack_code on a first-come-first-served basis in each country.  In sets of results, just about everyone locally refers to Thames Hare and Hounds as...

    THH

In a global database, we would prefix these with a country code:

    GBR/THH

As a starting point, we have given three letter codes to 40 clubs in the Surrey Cross Country League, based on "common use".  We suggest that the major leagues also contribute the acronyms they use.

At a technical level, we feel we could allow codes of up to 5 characters.  (3 is quite nice for results formatting).  They should NOT include "/" or "&", as these will cause trouble in URL parameters.  However, they may offer a "display alternative" formatted any way they like.

    /rankings_search?club=HW     - GOOD
    /rankings_search?club=H/W    - BAD, needs escaping
    /rankings_search?club=TH&H   - BAD, needs escaping, & would mean a new parameter


### Other organisations

We are working on a global database of organisations - meaning anyone who can put on a competition.  Most organisations in athletics have a pretty clear acronym - WADA, IAAF, IOC, WMA, and within the UK EA, SEAA, BMAF etc.  These will be stored alongside clubs and given Opentrack IDs and Codes.  It will then be possible to build up a map of which organisations are affiliated to which governing bodies.

England Athletics and European Athletics can fight it out for who gets EA.

Peter Kennedy has bravely volunteered to maintain this data!


## Vocabulary

Here's our first start at a recommended vocabulary of field names.  In JSON, we have been recommended to use `camelCase` conventions, and - where it makes sense - to pick field names from <a href="http://schema.org/">schema.org</a>.

### General personal information

    givenName:    first name for western languages
    familyName:   last name for western languages
    birthDate:    date is ISO format (1966-03-21)
    gender:       M or F
    nationality:  3-letter code (e.g. EST)
    height:       height in cm
    weight:       weight in kg
    birthPlace:   text, town and country (e.g. "Tallinn, Estonia")

### Within an athlete biography or summary
    
    personalBests:  list of performances by discipline
    seasonsBests:   list of performances by discipline

### Within a results or entries system

    bib:          the 'number' they wear (string to allow for letters and numbers)
    ageGroup:     group for this competition (e.g. U14, SEN, V45)
    ageGender:    combined age group and gender code (e.g. U13B, SM, M45)
    category:     used for broader or different prize categories
    tags:         short list of strings

    secondClaim:  boolean, default false or absent.
                  Signifies an athlete whose primary club is elsewhere.
                  Use for HCAs in British League
    nonScorer:    boolean, default false or absent.  This person may not score points

    rank:         where they finished
    points:       numeric or None

    indoor:       boolean, default is false or absent
    discipline:   standard "event code" e.g. 200, HJ, 3000SC
    venue:        where it happened - town/track name
    country:      where it happened - country code

    perf:         performance, as formatted text (e.g. "9.58", "3:26.8", "75.83")
    wind:         true signifies > 2.0 but we don't know speed; or a number for the speed

    compId:       competition ID within whatever system you are looking at
    athleteID:    athlete ID within whatever system you are looking at

    otCompId:     OpenTrack's ID for the competition
    tilpaCompId:  Tilastopaja's ID for the competition
