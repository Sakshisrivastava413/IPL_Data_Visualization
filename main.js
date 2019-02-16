const fs = require('fs');
const utils = require('./utils');

const { convertToJSON } = utils;

const readFile = fileName => convertToJSON(fs.readFileSync(fileName).toString());

const matchJSON = readFile('./csv/Match.csv');
const ballByBallJSON = readFile('./csv/Ball_by_Ball.csv');
const teamJSON = readFile('./csv/Team.csv');
const playerJSON = readFile('./csv/Player.csv');

// console.log(matchJSON);
// console.log(ballByBallJSON);
// console.log(teamJSON);
// console.log(playerJSON);
