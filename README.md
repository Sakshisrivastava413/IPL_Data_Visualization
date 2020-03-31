# IPL Data Visualization:
Data Visualization of IPL data using datasets provided by [Kaggle User - harsha547 here](https://kaggle.com/harsha547/indian-premier-league-csv-dataset).

__Demo:__ Click [here](https://ipl-data-visualization-86149.firebaseapp.com/) to view my webapp.


## Steps to run locally
```
npm install
touch .env
echo "VUE_APP_GMAPS_API_KEY=<YOUR_GOOGLE_MAP_API_KEY>" >> .env
npm run serve
```
<p style="font-size: 10px">Replace < YOUR_GOOGLE_MAP_API_KEY > with your GMaps API key.</p>

## Structure:
The visualizations have been divided into four sections - <b>Teams</b>, <b>Players</b>, <b>Venues</b> and <b>Seasons</b> and some observation has been provided with some of the visualizations in a side card format.

## Major frameworks / libraries used:
- <b>Vue Framework</b>: <i>Provides features like client side routing using vue-router package, virtual DOM for performance, data binding, conditional rendering and a lot more out of the box.</i>

- <b>ChartJS</b>: <i>Provides super simple and powerful API to create different type of charts with animations.</i>

- <b>vue-d2b</b>: <i>Vue extension for d2b data viz library, used Sunburst Chart from the same which comes with handy features like breadcrumbs, section highlighting, etc.</i>

- <b>vue2-google-maps</b>: <i>Vue Component library for integrating google maps with ease in the app, it provides data-binding (which is hard thing to do with native maps API) with map features and made implementation of maps with vue comfortable.</i>

## Bonus Points
| Point      | Status | Description
| ----------- | ----------- |----------- |
|web-app created in Vue|✅|Developed in Vue from scratch, started project via vue-cli. Followed component architecture.|
|Optimize Loading Time|✅|- Code Splitting using dynamic import to decrease bundle size.<br /> - Loading routes lazily at runtime.<br />- Removed bootstrap library and implemented own css for small components like card and header.<br />- Precalculated results from given data CSVs and directly using results via json files generated to not show user <i>Crunching data dot dot dot</i>, it optimized loading times by a good extent, usage of webwokers was also not required by going with this approach.| 
| Mobile Responsive|⚠️|Implemented links in header converting to menu style on mobile viewport. <br />ChartJS was chosen to maintain mobile responsive since the library provides out of the box support for it to some extent. <br />Warning here because couldn't spend time to convert `inline-block`s  to `block`s on mobile.|
| PWA|✅|User can add to home screen and install it like native app.<br />- Updated `manifest.json` created by vue cli to fulfill the PWA checklist provided [here](https://developers.google.com/web/progressive-web-apps/checklist), added / initialized `background_color`, `themeColor`, `name`, `short_name`, `display`, `start_url` properties.<br />- Added Icons of required size <br /> - Served over HTTPS using firebase <br /> - Service worker registration (used workbox by google, default with vue cli).
| Offline Usable|✅|- Fully works offline<br />- Javascript (which also contain our results json) and CSS chunks are cached after first load hence users can view visualizations with slow/no internet connectivity.<br />- Only dependent things on internet is google-maps which will fallback to card based interface to view Venue details| 

## Light House and Network Tab Results

![alt LightHouseResults](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%204.34.09%20PM.png?alt=media&token=3317ee48-3592-4367-a408-79f589b3392a)

##### First load times, no chunk is > 200kb
![alt NetworkTabResults](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%204.35.35%20PM.png?alt=media&token=b361fdb3-dac3-4702-a2f3-465537ac39d7)

## Visualizations:

![alt SunburstScreenshot](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.37.31%20PM.png?alt=media&token=5de187e4-0e7f-405b-854a-4a7fc6c9fe46)

 > The above graph is called sunburst graph which represents a hierarchy, it shows detailed view of each team's performance including their batting performance (sixes, fours, singles taken, etc.) and bowling performance which elaborates the runs conceded by the team overall. <br /><i>User can click on particular team to view their detailed hierarchy more clearly.</i>
 
<br />


![alt RunsPerTeam](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.37.52%20PM.png?alt=media&token=7e8905ab-b273-41c6-a753-1801b82c17fb)

 > This chart denotes total runs scored by teams in all seasons in sorted manner which gives a slight idea about a team's batting performance.

<br /><br />

 ![alt NoOfWinsAndLoses](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.38.14%20PM.png?alt=media&token=f278a71d-1c28-4c7f-8442-4cc610046572)

 > This chart denotes total number of wins and loses of the teams in all seasons which shows best team overall based on their performance in IPL.
 
<br /><br />

 ![alt WinsByRuns](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.38.39%20PM.png?alt=media&token=8ffc2408-0548-4c17-96ab-b3bdc4861ca9)

 > This chart denotes total number of wins by particular runs of each team in all seasons, this gives a good insight about a team's bowling performance altogether.
 
<br /><br />

 ![alt WinsByWickets](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.39.22%20PM.png?alt=media&token=0b801537-2bf8-47e8-aeaa-c55d41109896)

 > This chart denotes total number of wins by wickets of each team in all seasons, this gives a good insight about a team's batting performance altogether.

<br /><br />

 ![alt Top10Venues](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.40.30%20PM.png?alt=media&token=5bde2532-c4cd-4211-a847-fcc2f06934fb)

 > This chart denotes top 10 venues based on matches played at each venue, hovering on bar shows the total runs scored on that particular venue and if user clicks on a particular venue (bar), a detailed view of venue detail is shown by scrolling user to next discussed chart.

<br /><br />

![alt VenueMap](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.41.17%20PM.png?alt=media&token=b43ea068-2714-485f-8ad9-8984094c016b)


![alt VenueMap](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.41.35%20PM.png?alt=media&token=e0590667-949c-49b4-9dd2-2d183aeea509)

![alt VenueMap](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.42.01%20PM.png?alt=media&token=35b4a32a-4501-4446-bf6b-a02195be2d29)

 > This chart shows a map interface along with a card interface, both reacts simultaneously as one of them changes. User can hover on any country marker or country name in the sidelist and it will show some basic info like number of matches played in that country, clicking on the same will result to zoom-into the city view showing all cities of that country involved in IPL matches, this view will behave the same as country view except when clicked it will take user to a venue detail view which finally shows a detailed card for the venue showing <i>total matches played</i>, <i>highest and lowest total recorded runs with basic match result</i>, <i>batting / bowling first pick wins</i>.<br /> If user clicks on some venue bar in top10 venues chart discussed before, they will be scrolled to this component and directly be jumped to venue info level.

<br /><br />

![alt TossDecisions](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.42.33%20PM.png?alt=media&token=742ffd85-7352-4b1a-9248-e7ffc69cada1)

 > This chart shows the number of times a team has won toss (a luckiness factor maybe?)

<br /><br />

![alt RunsDistributionTeams](https://firebasestorage.googleapis.com/v0/b/ipl-data-visualization-86149.appspot.com/o/Screenshot%202019-02-25%20at%203.42.58%20PM.png?alt=media&token=463b9b2b-c5a2-4ac0-8a22-65dbfa72b89e)

 > Above Chart shows runs scored by teams distribtued based on singles, twos, threes, fours, fives and sixes in all matches of all seasons, it gives insight about team's batting performance. It allows user to select a team to view their stats for the same.

<br /><br />
