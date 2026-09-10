---
layout: page
title: Jobs
permalink: /jobs/
description: 'Current openings at OpenTrack — join a small team building the athletics management platform used by clubs, organisers and national federations across Europe.'
---

<div markdown="1" data-aos="fade-up">
We're a small, busy team building the athletics management platform used by clubs, organisers, and national federations across Europe and beyond. If that sounds like something you'd like to be part of, we'd like to hear from you.
</div>

{% if site.data.jobs and site.data.jobs.size > 0 %}
<div class="jobs" data-aos="fade-up">
  {% for job in site.data.jobs %}
  <article class="job-card">
    <div class="job-card__head">
      {% if job.icon %}<div class="job-card__icon"><img src="{{ site.baseurl }}/assets/img/icons/{{ job.icon }}" alt=""></div>{% endif %}
      <h3 class="job-card__title">{{ job.title }}</h3>
    </div>
    <p class="job-card__summary">{{ job.summary }}</p>
    <dl class="job-card__facts">
      {% if job.type %}<div><dt>Type</dt><dd>{{ job.type }}</dd></div>{% endif %}
      {% if job.term %}<div><dt>When</dt><dd>{{ job.term }}</dd></div>{% endif %}
      {% if job.location %}<div><dt>Location</dt><dd>{{ job.location }}</dd></div>{% endif %}
      {% if job.hours %}<div><dt>Hours</dt><dd>{{ job.hours }}</dd></div>{% endif %}
      {% if job.pay %}<div><dt>Pay</dt><dd>{{ job.pay }}</dd></div>{% endif %}
    </dl>
    {% if job.looking_for %}
    <h4>What we're looking for</h4>
    <ul class="job-card__list">
      {% for item in job.looking_for %}<li>{{ item }}</li>{% endfor %}
    </ul>
    {% endif %}
  </article>
  {% endfor %}
</div>
{% else %}
<div markdown="1" data-aos="fade-up">
Nothing is open right now &mdash; but we're always glad to hear from people who could help OpenTrack grow.
</div>
{% endif %}

<div markdown="1" data-aos="fade-up">
## How to apply

Email [info@opentrack.run](mailto:info@opentrack.run) with a note on your relevant experience, your availability, and a CV if you have one &mdash; whether you're applying for one of the roles above or just think you could help OpenTrack grow.
</div>
