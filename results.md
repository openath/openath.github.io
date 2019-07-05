---
layout: simple
title: Recent or upcoming competitions
permalink: /results/
---

<style>
  #tibodi>tr:hover {
    cursor: pointer;
    background-color: #eee;
  }
  #tibodi>tr>td>img {
    margin: -5px;
    border: 1px #ccc solid
  }
  #tibodi>tr>td:nth-child(3) {
    text-align: center
  }
</style>

<div class="container-fluid pb-4">
	<section data-aos="fade-up">
    <table id="teibel" class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Competition</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody id="tibodi">
      </tbody>
    </table>
  </section>
</div>
  
<script>
var rlenv = getParameterByName('env'),
    rlroot = '';
    
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function reqListener () {
  var list = JSON.parse(this.responseText),
      tbody = document.getElementById('tibodi');
  list.reverse().forEach(function (l) {
    var row = tbody.insertRow(),
        c1 = row.insertCell(),
        c2 = row.insertCell(),
        c3 = row.insertCell(),
        img = new Image();
    row.setAttribute("onclick", "window.open('" + rlroot + l.url + "')");
    
    img.src = "http://file.opentrack.run/countryflags/ioc/" + l.flag + ".svg";
    img.alt = l.country;
    img.title = l.country;
    img.width = 36;
    c1.appendChild(document.createTextNode(l.date));
    c2.appendChild(document.createTextNode(l.fullName));
    c3.appendChild(img)
  })
}

switch(rlenv) {
    case 'dev':
      rlroot = '//dev-data.opentrack.run';
      break;
    case 'test':
      rlroot = '//test-data.opentrack.run';
      break;
    case 'local':
      rlroot = '//localhost:8000';
      break;
    default:
       rlroot = "//results.opentrack.run"
}
    
oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
var qs = document.location.href.split('?');
qs = qs.length === 2 ? ("?" + qs[1]) : '';
oReq.open("GET", rlroot + "/x/ours/json/" + qs);
oReq.send();

</script>
