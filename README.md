SpoilerFreeScoreboard
=====================

Spoiler Free Scoreboard is a java servlet for displaying a spoiler free scoreboard - the scores are hidden and can be revealed incrementally to determine whether the game is close and worth watching.

The initial scoreboard source comes from sports.yahoo.com with the surrounding non-scoreboard information stripped out and the scores hidden.

By clicking on one of the hidden areas the scores/information are revealed.

Additional details on whether the game was close after three quarters, four quarters or went to overtime can be displayed as well.

At the moment the NBA, NFL and MLB are supported.


Usage
=====

The war directory contains a WEB-INF/web.xml for deploying the servlet to your app server and the ui files for obtaining the league and date parameters to pass to the servlet and displaying the response.

Calling the Scoreboard servlet requires league and date parameters be included in the query string

e.g. for NBA scores for April 1, 2013
http://hostname/scoreboard?league=nba&date=2013-04-01
e.g. for NFL scores for Week 1
http://hostname/scoreboard?league=nfl&date=1


Demo
====
Available here <a target="_blank" href="http://jgossit.appspot.com/scoreboard">jgossit.appspot.com/scoreboard</a>
<p align="center" >
  <img src="https://raw.github.com/jgossit/SpoilerFreeScoreboard/master/example/web form.png">
</p>

Output
======

<p align="center" >
  <img src="https://raw.github.com/jgossit/SpoilerFreeScoreboard/master/example/nba_2013-04-01.png"/>
</p>


Requirements
============

Your App server of choice to deploy the servlet


Credits
=======

sports.yahoo.com scoreboards


License
=======
See the LICENSE file
