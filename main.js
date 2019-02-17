const fs = require('fs');
const utils = require('./utils');

// extracting required functions
const { convertToJSON, getTeamBowlingBattingData, getDataBySeasons, getTeamWinningAndLosingCount, getTeamName} = utils;

const readFile = fileName => convertToJSON(fs.readFileSync(fileName).toString());

// reading csv files
const matchJSON = readFile('./csv/Match.csv');
const ballByBallJSON = readFile('./csv/Ball_by_Ball.csv');
const teamJSON = readFile('./csv/Team.csv');
const playerJSON = readFile('./csv/Player.csv');

// writing them into .json file
fs.writeFile('json/matchData.json', JSON.stringify(matchJSON, null, 4), () => {});
fs.writeFile('json/ballByBallData.json', JSON.stringify(ballByBallJSON, null, 4), () => {});
fs.writeFile('json/teamData.json', JSON.stringify(teamJSON, null, 4), () => {});
fs.writeFile('json/playerData.json', JSON.stringify(playerJSON, null, 4), () => {});

const teamOverallData = getTeamBowlingBattingData(ballByBallJSON);
// fs.writeFile('json/teamOverallData.json', JSON.stringify(teamOverallData, null, 4), ()=> {});

const teamDetails = getTeamName(teamJSON);

const matchDataBySeason = getDataBySeasons(matchJSON);
fs.writeFile('json/matchDataBySeason.json', JSON.stringify(matchDataBySeason, null, 4), ()=> {});

const teamWinLoseCount = getTeamWinningAndLosingCount(matchDataBySeason, teamDetails);
fs.writeFile('json/teamWinLoseCount.json', JSON.stringify(teamWinLoseCount, null, 4), ()=> {});
