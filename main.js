const fs = require('fs');
const utils = require('./utils');

// extracting required functions
const { convertToJSON, getTeamBowlingBattingData, getDataBySeasons } = utils;

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
fs.writeFile('json/sunburstData.json', JSON.stringify(teamOverallData, null, 4), ()=> {});

const matchDataBySeason = getDataBySeasons(matchJSON);
fs.writeFile('json/matchDataBySeason.json', JSON.stringify(matchDataBySeason, null, 4), ()=> {});
