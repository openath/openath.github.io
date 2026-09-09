---
layout: page
title: 'Contact us'
permalink: /contact/
---

<p class="ot-lead">Tell us what you're trying to run and we'll get you to the right person.</p>

{% assign contacts = site.team | where_exp: "person", "person.contact_blurb" | sort: "contact_rank" %}
<div class="row justify-content-center py-4 ot-contact">
{% for person in contacts %}
  {% assign first_name = person.title | split: " " | first %}
  <div class="ot-contact__card col-10 col-sm-6 col-lg-4 text-center mb-4">
    <div class="ot-contact__photo mb-3">
      {% include person-photo.html person=person %}
    </div>
    <h2 class="h5 mb-0">{{ person.title }}</h2>
    <p class="ot-contact__role mb-2">{{ person.position }}</p>
    <p class="ot-contact__blurb">{{ person.contact_blurb }}</p>
    <a class="btn btn-primary border-0" role="button" href="mailto:info@opentrack.run?subject={{ person.contact_subject | default: 'OpenTrack enquiry' | uri_escape }}">Contact {{ first_name }}</a>
  </div>
{% endfor %}
</div>

<p class="text-center">Not sure who to ask? Email <a href="mailto:info@opentrack.run">info@opentrack.run</a> and we'll pass it on &mdash; or <a href="/team/">meet the rest of the team</a>.</p>

<hr>

<p class="text-muted">
<strong>OpenTrack</strong><br>
Wimbletech (Zone 2), Wimbledon Reference Library,<br>
Wimbledon Hill Rd, Wimbledon,<br>
London SW19 7NB, United Kingdom
</p>
