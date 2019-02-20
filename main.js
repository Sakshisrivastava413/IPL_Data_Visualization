const fs = require('fs');
const utils = require('./utils');

// extracting required functions
const { convertToJSON, getBatsmanData, getWinTypeDetails, getManOfTheMatchDetail, topVenueDetails, venueDetails, getPlayerNames, getTeamBowlingBattingData, getDataBySeasons, getMatchDetails, getTeamWinningAndLosingCount, getTeamName} = utils;

const readFile = fileName => convertToJSON(fs.readFileSync(fileName).toString());

// reading csv files
let matchJSON = readFile('./csv/Match.csv');
let ballByBallJSON = readFile('./csv/Ball_by_Ball.csv');
const teamJSON = readFile('./csv/Team.csv');
const playerJSON = readFile('./csv/Player.csv');
// writing them into .json file
// fs.writeFile('json/matchData.json', JSON.stringify(matchJSON, null, 4), () => {});
// fs.writeFile('json/ballByBallData.json', JSON.stringify(ballByBallJSON, null, 4), () => {});
// fs.writeFile('json/teamData.json', JSON.stringify(teamJSON, null, 4), () => {});
// fs.writeFile('json/playerData.json', JSON.stringify(playerJSON, null, 4), () => {});

const teamOverallData = getTeamBowlingBattingData(ballByBallJSON);
// fs.writeFile('json/teamOverallData.json', JSON.stringify(teamOverallData, null, 4), ()=> {});

const teamDetails = getTeamName(teamJSON);

const matchDataBySeason = getDataBySeasons(matchJSON);
// fs.writeFile('json/matchDataBySeason.json', JSON.stringify(matchDataBySeason, null, 4), ()=> {});

const teamWinLoseCount = getTeamWinningAndLosingCount(matchDataBySeason, teamDetails);
// fs.writeFile('json/teamWinLoseCount.json', JSON.stringify(teamWinLoseCount, null, 4), ()=> {});

ballByBallJSON = ballByBallJSON.splice(0, ballByBallJSON.length - 1);
matchJSON = matchJSON.splice(0, matchJSON.length - 1);
const playerDetails = getPlayerNames(playerJSON);
const batsmanData = getBatsmanData(ballByBallJSON, matchJSON, playerDetails, teamDetails);
// fs.writeFile('json/top10Batsmen.json', JSON.stringify(batsmanData.slice(0, 10), null, 2), ()=> {});

const BallDetails = getMatchDetails(ballByBallJSON);
const venueData = venueDetails(matchJSON, BallDetails, teamJSON);
// fs.writeFile('json/venueDetails.json', JSON.stringify(venueData, null, 4), ()=> {});

const topVenueData = topVenueDetails(venueData);
// fs.writeFile('json/top10Venue.json', JSON.stringify(topVenueData.slice(0, 10), null, 4), ()=> {});

const manOfTheMatchData = getManOfTheMatchDetail(matchJSON, teamJSON, playerDetails);
// fs.writeFile('json/topManOfTheMatch.json', JSON.stringify(manOfTheMatchData.slice(0, 10), null, 4), ()=> {});

const winTypeDetails = getWinTypeDetails(matchJSON, teamJSON);
// fs.writeFile('json/winTypeData.json', JSON.stringify(winTypeDetails, null, 4), ()=> {});
