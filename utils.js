function convertToJSON(csv) {
  const json = [];
  const rows = csv.split(/\n|\r\n/);
  const colTitle = rows.splice(0, 1)[0].split(',');

  for (let i = 0; i < rows.length; i++) {
    const obj = {};
    const cols = rows[i].match(/("([^"]*)"|[^,]*)(,|$)/g);
    if (!cols) continue;

    colTitle.forEach((header, j) => {
      if (!cols[j]) return;
      if (header[0] == '"' || header[header.length - 1] == `"`)
        header = header.slice(1, header.length - 1);
      let lastIndex = cols[j][cols[j].length - 1] == ',' ? cols[j].length - 1 : cols[j].length;
      obj[header] = cols[j] == ' ,' ? undefined : cols[j].slice(0, lastIndex);
    });
    json.push(obj);
  }

  delete json[json.length - 1];

  return json;
}

function getTeamBowlingBattingData(ballByBallData) {
  const details = {};
  ballByBallData.forEach((ball) => {
    const {
      Match_Id,
      Innings_Id,
      Over_Id,
      Batsman_Scored,
      Extra_Runs,
      Extra_Type,
      Dissimal_Type,
      Team_Batting_Id,
      Team_Bowling_Id
    } = ball;

    if (Innings_Id > 2) return;
    // if (Match_Id != '335987') return; 

    // If null yet, initialise it.
    if (!details[Team_Batting_Id]) {
      details[Team_Batting_Id] = {
        batting: {
          balls: 0,
          sixes: 0,
          fours: 0,
          legByes: 0,
          byes: 0,
          wides: 0,
          noBalls: 0,
          legByesRuns: 0,
          byesRuns: 0,
          widesRuns: 0,
          noBallsRuns: 0,
          runs: 0,
          extraRuns: 0,
          caught: 0,
          bowled: 0,
          stumped: 0,
          runOuts: 0,
        },
        bowling: {
          balls: 0,
          sixes: 0,
          fours: 0,
          legByes: 0,
          byes: 0,
          wides: 0,
          noBalls: 0,
          legByesRuns: 0,
          byesRuns: 0,
          widesRuns: 0,
          noBallsRuns: 0,
          runs: 0,
          extraRuns: 0,
          caught: 0,
          bowled: 0,
          stumped: 0,
          runOuts: 0,
        },
      }
    }

    if (!details[Team_Bowling_Id]) {
      details[Team_Bowling_Id] = {
        batting: {
          balls: 0,
          sixes: 0,
          fours: 0,
          legByes: 0,
          byes: 0,
          wides: 0,
          noBalls: 0,
          legByesRuns: 0,
          byesRuns: 0,
          widesRuns: 0,
          noBallsRuns: 0,
          runs: 0,
          extraRuns: 0,
          caught: 0,
          bowled: 0,
          stumped: 0,
          runOuts: 0
        },
        bowling: {
          balls: 0,
          sixes: 0,
          fours: 0,
          legByes: 0,
          byes: 0,
          wides: 0,
          noBalls: 0,
          legByesRuns: 0,
          byesRuns: 0,
          widesRuns: 0,
          noBallsRuns: 0,
          runs: 0,
          extraRuns: 0,
          caught: 0,
          bowled: 0,
          stumped: 0,
          runOuts: 0
        }
      }
    }

    const currentBattingTeamData = details[Team_Batting_Id]['batting'];
    const currentBowlingTeamData = details[Team_Bowling_Id]['bowling'];

    currentBattingTeamData.balls++;
    currentBattingTeamData.sixes += Number(Batsman_Scored == 6);
    currentBattingTeamData.fours += Number(Batsman_Scored == 4);
    currentBattingTeamData.legByes += Number(Extra_Type == "legbyes");
    currentBattingTeamData.byes += Number(Extra_Type == "byes");
    currentBattingTeamData.wides += Number(Extra_Type == "wides");
    currentBattingTeamData.noBalls += Number(Extra_Type == "noballs");
    currentBattingTeamData.legByesRuns += Number(Extra_Type == "legbyes" ? Extra_Runs : 0);
    currentBattingTeamData.byesRuns += Number(Extra_Type == "byes" ? Extra_Runs : 0);
    currentBattingTeamData.widesRuns += Number(Extra_Type == "wides" ? Extra_Runs : 0);
    currentBattingTeamData.noBallsRuns += Number(Extra_Type == "noballs" ? Extra_Runs : 0);
    currentBattingTeamData.extraRuns += Number(Extra_Type ? Extra_Runs : 0);
    currentBattingTeamData.runs += Number(isNaN(Batsman_Scored) ? 0 : Batsman_Scored) + (Extra_Type ? Number(Extra_Runs) : 0);
    currentBattingTeamData.caught += Number(Dissimal_Type == "caught" || Dissimal_Type == "caught and bowled");
    currentBattingTeamData.bowled += Number(Dissimal_Type == "bowled");
    currentBattingTeamData.stumped += Number(Dissimal_Type == "stumped");
    currentBattingTeamData.runOuts += Number(Dissimal_Type == "run out");

    currentBowlingTeamData.balls++;
    currentBowlingTeamData.sixes += Number(Batsman_Scored == 6);
    currentBowlingTeamData.fours += Number(Batsman_Scored == 4);
    currentBowlingTeamData.legByes += Number(Extra_Type == "legbyes");
    currentBowlingTeamData.byes += Number(Extra_Type == "byes");
    currentBowlingTeamData.wides += Number(Extra_Type == "wides");
    currentBowlingTeamData.noBalls += Number(Extra_Type == "noballs");
    currentBowlingTeamData.legByesRuns += Number(Extra_Type == "legbyes" ? Extra_Runs : 0);
    currentBowlingTeamData.byesRuns += Number(Extra_Type == "byes" ? Extra_Runs : 0);
    currentBowlingTeamData.widesRuns += Number(Extra_Type == "wides" ? Extra_Runs : 0);
    currentBowlingTeamData.noBallsRuns += Number(Extra_Type == "noballs" ? Extra_Runs : 0);
    currentBowlingTeamData.extraRuns += Number(Extra_Type ? Extra_Runs : 0);
    currentBowlingTeamData.runs += Number(isNaN(Batsman_Scored) ? 0 : Batsman_Scored) + (Extra_Type ? Number(Extra_Runs) : 0);
    currentBowlingTeamData.caught += Number(Dissimal_Type == "caught" || Dissimal_Type == "caught and bowled");
    currentBowlingTeamData.bowled += Number(Dissimal_Type == "bowled");
    currentBowlingTeamData.stumped += Number(Dissimal_Type == "stumped");
    currentBowlingTeamData.runOuts += Number(Dissimal_Type == "run out");

    details[Team_Batting_Id]['batting'] = currentBattingTeamData;
    details[Team_Bowling_Id]['bowling'] = currentBowlingTeamData;
  });
  return details;
}

function getDataBySeasons(matchData) {
  const seasons = {};
  matchData.forEach(row => {
    const currentMatchDate = new Date(row.Match_Date);
    let currentSeason = seasons[row.Season_Id];
    if (currentSeason) {
      currentSeason.matches.push(row);
      if (currentMatchDate < currentSeason.startDate) {
        currentSeason.endDate = currentSeason.startDate;
        currentSeason.startDate = currentMatchDate;
      } else if (currentMatchDate > currentSeason.startDate) {
        if (!currentSeason.endDate || currentMatchDate > currentSeason.endDate) {
          currentSeason.endDate = currentMatchDate;
        }
      }
      currentSeason.startDate
    } else {
      seasons[row.Season_Id] = {
        matches: [row],
        startDate: new Date(row.Match_Date),
        endDate: null
      };
    }
  });
  delete seasons['undefined'];
  return seasons;
}

function getTeamWinningAndLosingCount(matchDetails, teamDetails) {

  const teamStatDetails = new Map();
  Object.entries(matchDetails).forEach(([key, match_detail]) => {
    match_detail.matches.forEach(match => {
      let Match_Loser_Id = match.Match_Winner_Id != match.Team_Name_Id
        ? match.Team_Name_Id
        : match.Opponent_Team_Id;

      const team1 = teamStatDetails.get(match.Match_Winner_Id) || {
        wins: 0,
        loses: 0,
        details: teamDetails[match.Match_Winner_Id]
      };

      const team2 = teamStatDetails.get(Match_Loser_Id) || {
        wins: 0,
        loses: 0,
        details: teamDetails[Match_Loser_Id]
      };

      team1.wins++;
      team2.loses++;

      teamStatDetails.set(match.Match_Winner_Id, team1);
      teamStatDetails.set(Match_Loser_Id, team2);

    });
  });

  const finalResults = {};
  teamStatDetails.forEach((val, key) => key != "" && (finalResults[key] = val));

  return finalResults;
}

function getTeamName(teamData) {
  const teams = {};
  teamData.forEach(row => {
    teams[row.Team_Id] = row;
  });
  delete teams['undefined'];
  return teams; 
}

function getPlayerNames(playerData) {
  const players = new Map();
  playerData.forEach(row => {
    if(!players.has(row.Player_Id)) {
      players.set(row.Player_Id, row);
    }
  });
  delete players['undefined'];
  return players;
}

function getBatsmanData(ballByBallJSON, matchJSON, playerDetails, teamDetails) {

  const batsmen = new Map();
  for (let i = 0; i < ballByBallJSON.length; i++) {
    const currentBall = ballByBallJSON[i];
    const Season_Id = Number(matchJSON.find(match => {
      return match.Match_Id == currentBall.Match_Id
    }).Season_Id);
    const man = batsmen.get(currentBall.Striker_Id) || {
      details: playerDetails.get(currentBall.Striker_Id),
      totalRuns: 0,
      seasons: Array(8).fill(0),
      matches: {},
      centuries: new Set(),
      teamDetails: teamDetails[currentBall.Team_Batting_Id]
    };
    const currentRuns = Number(currentBall.Batsman_Scored) + Number(currentBall.Extra_Type ? currentBall.Extra_Runs : 0);

    man.totalRuns += currentRuns;

    man.seasons[Season_Id] = man.seasons[Season_Id] || 0;
    man.matches[currentBall.Match_Id] = man.matches[currentBall.Match_Id] || 0;

    man.seasons[Season_Id] += currentRuns;
    man.matches[currentBall.Match_Id] += currentRuns;

    if (man.matches[currentBall.Match_Id] > 100) man.centuries.add(currentBall.Match_Id);

    batsmen.set(currentBall.Striker_Id, man);
  }

  const batsmen_ar = [];
  batsmen.forEach((val, key) => {
    batsmen_ar.push({ ...val, centuries: val.centuries.size });
  });

  batsmen_ar.sort((b1, b2) => b2.totalRuns - b1.totalRuns);

  return batsmen_ar;
  // console.log(batsmen_ar.sort((m1, m2) => m2.centuries - m1.centuries).slice(0, 10))
}

function getMatchLoserId(match) {
  return match.Team_Name_Id == match.Match_Winner_Id ? match.Opponent_Team_Id : match.Team_Name_Id;
}

function venueDetails(matchJSON, BallDetails, teamJSON) {
  const venueDetailsByCity = new Map();
  // matchesWon batting and bowling first
  matchJSON.forEach(match => {
    if (match.Won_By == "NULL") return;
    const allVenues = venueDetailsByCity.get(match.City_Name) || new Map();

    match.Match_Loser_Id = getMatchLoserId(match);

    const venue = allVenues.get(match.Venue_Name) || {
      matchesPlayed: 0,
      _matches: new Set(),
      totalRuns: 0,
      name: match.Venue_Name,
      city: match.City_Name,
      highestRecordedScore: -1000,
      lowestRecordedScore: 1000,
      highestRecodedMatch: {},
      lowestRecordedMatch: {},
      matchesWonBattingFirst: 0,
      matchesWonBowlingFirst: 0,
    };

    venue._matches.add(match.Match_Id);
    venue.matchesPlayed = venue._matches.size;
    venue.totalRuns += BallDetails[match.Match_Id]['1'].runs + BallDetails[match.Match_Id]['2'].runs;

    venue.matchesWonBattingFirst += Number(match.Toss_Decision == 'bat' && match.Toss_Winner_Id == match.Match_Winner_Id);
    venue.matchesWonBowlingFirst += Number(match.Toss_Decision == 'field' && match.Toss_Winner_Id == match.Match_Winner_Id);

    const matchDetails = i => ({
      runs: BallDetails[match.Match_Id][i].runs,
      overs: BallDetails[match.Match_Id][i].overs.length,
      totalOuts: BallDetails[match.Match_Id][i].totalOuts,
      byTeam: teamJSON[BallDetails[match.Match_Id][i].teamId]
    });

    if (BallDetails[match.Match_Id]['1'].runs > venue.highestRecordedScore) {
      venue.highestRecordedScore = BallDetails[match.Match_Id]['1'].runs;
      venue.highestRecodedMatch = matchDetails('1');
    }

    if (BallDetails[match.Match_Id]['2'].runs > venue.highestRecordedScore) {
      venue.highestRecordedScore = BallDetails[match.Match_Id]['2'].runs;
      venue.highestRecodedMatch = matchDetails('2');
    }

    if (BallDetails[match.Match_Id]['1'].runs < venue.lowestRecordedScore) {
      venue.lowestRecordedScore = BallDetails[match.Match_Id]['1'].runs;
      venue.lowestRecordedMatch = matchDetails('1');
    }

    if (BallDetails[match.Match_Id]['2'].runs < venue.lowestRecordedScore) {
      venue.lowestRecordedScore = BallDetails[match.Match_Id]['2'].runs;
      venue.lowestRecordedMatch = matchDetails('2');
    }

    allVenues.set(match.Venue_Name, venue);
    venueDetailsByCity.set(match.City_Name, allVenues);

  });
  const venuesByCity_object = {};
  venueDetailsByCity.forEach((venues, city) => {
    venuesByCity_object[city] = {};
    venues.forEach((venue, name) => {
      venuesByCity_object[city][name] = venue;
    });
  });
  return venuesByCity_object;
}

function topVenueDetails(venue_json) {
  const allVenueData = [];
  Object.values(venue_json).forEach(venue => {
    Object.values(venue).map(v => allVenueData.push(v))
  });
  allVenueData.sort((v1, v2) => v2.matchesPlayed - v1.matchesPlayed);
  return allVenueData;
}

function getMatchDetails(ballByBallData) {
  let details = {};
  ballByBallData.forEach(ball => {

    const {
      Match_Id,
      Innings_Id,
      Over_Id,
      Batsman_Scored,
      Extra_Runs,
      Extra_Type,
      Dissimal_Type,
      Team_Batting_Id,
      Team_Bowling_Id
    } = ball;

    /**
     *  Extra innings matches are not handled since 
     *  I don't have enough knowledge of cricket and couldn't 
     *  find anything relevant regarding this online, we assume the match to
     *  get over after two innings.
     **/
    if (Innings_Id > 2) return;

    // If null yet, initialise it.
    if (!details[Match_Id]) {
      details[Match_Id] = {
        "1": {
          balls: 0,
          sixes: 0,
          fours: 0,
          legByes: 0,
          byes: 0,
          wides: 0,
          noBalls: 0,
          runs: 0,
          extraRuns: 0,
          overs: [],
          caught: 0,
          bowled: 0,
          stumped: 0,
          runOuts: 0,
          totalOuts: 0,
          teamId: Team_Batting_Id
        },
        "2": {
          balls: 0,
          sixes: 0,
          fours: 0,
          legByes: 0,
          byes: 0,
          wides: 0,
          noBalls: 0,
          runs: 0,
          extraRuns: 0,
          overs: [],
          caught: 0,
          bowled: 0,
          stumped: 0,
          runOuts: 0,
          totalOuts: 0,
          teamId: Team_Bowling_Id
        }
      }
    }

    const currentInnData = details[Match_Id][Innings_Id];

    if (!currentInnData.overs.length || currentInnData.overs.length <= Number(Over_Id) - 1) {
      if (currentInnData.overs.length) {
        const lastOver = currentInnData.overs[currentInnData.overs.length - 1];
        lastOver.runRate = (lastOver.runs / 6).toFixed(3);
      }
      currentInnData.overs.push({
        overdId: Over_Id,
        sixes: Number(Batsman_Scored == 6),
        fours: Number(Batsman_Scored == 4),
        legByes: Number(Extra_Type == "legbyes"),
        byes: Number(Extra_Type == "byes"),
        wides: Number(Extra_Type == "wides"),
        noBalls: Number(Extra_Type == "noballs"),
        extraRuns: Number(Extra_Type ? Extra_Runs : 0),
        runs: Number(isNaN(Batsman_Scored) ? 0 : Batsman_Scored) + (Extra_Type ? Number(Extra_Runs) : 0),
        caught: Number(Dissimal_Type == "caught" || Dissimal_Type == "caught and bowled"),
        bowled: Number(Dissimal_Type == "bowled"),
        stumped: Number(Dissimal_Type == "stumped"),
        runOuts: Number(Dissimal_Type == "run out")
      });
    } else {
      const overDetails = currentInnData.overs[currentInnData.overs.length - 1];
      overDetails.sixes += Number(Batsman_Scored == 6);
      overDetails.fours += Number(Batsman_Scored == 4);
      overDetails.legByes += Number(Extra_Type == "legbyes");
      overDetails.byes += Number(Extra_Type == "byes");
      overDetails.wides += Number(Extra_Type == "wides");
      overDetails.noBalls += Number(Extra_Type == "noballs");
      overDetails.extraRuns += Number(Extra_Type ? Extra_Runs : 0);
      overDetails.runs += Number(isNaN(Batsman_Scored) ? 0 : Batsman_Scored) + Number(Extra_Type ? Extra_Runs : 0);
      overDetails.caught += Number(Dissimal_Type == "caught" || Dissimal_Type == "caught and bowled");
      overDetails.bowled += Number(Dissimal_Type == "bowled");
      overDetails.stumped += Number(Dissimal_Type == "stumped");
      overDetails.runOuts += Number(Dissimal_Type == "run out");
    }

    currentInnData.balls += Number(Extra_Type != "wides");
    currentInnData.sixes += Number(Batsman_Scored == 6);
    currentInnData.fours += Number(Batsman_Scored == 4);
    currentInnData.legByes += Number(Extra_Type == "legbyes");
    currentInnData.byes += Number(Extra_Type == "byes");
    currentInnData.wides += Number(Extra_Type == "wides");
    currentInnData.noBalls += Number(Extra_Type == "noballs");
    currentInnData.extraRuns += Number(Extra_Type ? Extra_Runs : 0);
    currentInnData.runs += Number(isNaN(Batsman_Scored) ? 0 : Batsman_Scored) + Number(Extra_Type ? Extra_Runs : 0);
    currentInnData.caught += Number(Dissimal_Type == "caught" || Dissimal_Type == "caught and bowled");
    currentInnData.bowled += Number(Dissimal_Type == "bowled");
    currentInnData.stumped += Number(Dissimal_Type == "stumped");
    currentInnData.runOuts += Number(Dissimal_Type == "run out");
    currentInnData.totalOuts += Number(
      Dissimal_Type == "bowled" ||
      Dissimal_Type == "caught" ||
      Dissimal_Type == "caught and bowled" ||
      Dissimal_Type == "bowled" ||
      Dissimal_Type == "stumped" ||
      Dissimal_Type == "run out"
    );

    const totalBatsmenOutYet = currentInnData.caught + currentInnData.bowled + currentInnData.runOuts + currentInnData.stumped;

    /**
     * Assumption: Data of match will always be sorted for a innning
     */
    const isMatchOver = (
      Innings_Id == 2 &&
      (totalBatsmenOutYet == 10 || Over_Id == 20 || currentInnData.runs > details[Match_Id]["1"].runs)
    );

    if (isMatchOver) {
      // In respect of team 1 to team 2, the same will be negative of current for team 
      details[Match_Id].Net_Run_Rate = Number(
        (details[Match_Id][1].runs / (details[Match_Id][1].balls / 6)) -
        (details[Match_Id][2].runs / (details[Match_Id][2].balls / 6))
      ).toFixed(3);
    }

  });
  return details;
}

function getManOfTheMatchDetail(match, team, player) {
  const manOfTheMatch = new Map();
  match.forEach(match => {
    if (match.Man_Of_The_Match_Id == "NULL") return;
    const manOfMatchPlayer = manOfTheMatch.get(match.Man_Of_The_Match_Id) || {
      total: 0,
      details: player.get(match.Man_Of_The_Match_Id),
    }
    manOfMatchPlayer.total++;

      manOfTheMatch.set(match.Man_Of_The_Match_Id, manOfMatchPlayer);
  });
  
  const finalResult = [];
  manOfTheMatch.forEach((val, key) => {
    key != "" && (finalResult[key] = val)
  });

  finalResult.sort((b1, b2) => b2.total - b1.total);

  return finalResult;
}

function getWinTypeDetails(match, teamsJSON) {
  const teams = new Map();
  match.forEach(match => {
    if (match.Win_Type == "No Result" || match.Win_Type == "Tie") return;
    const teamInfo = teamsJSON.find(t => t.Team_Id == match.Match_Winner_Id);
    const team = teams.get(match.Match_Winner_Id) || {
      winByRuns: [],
      winByWickets: [],
      teamId: teamInfo.Team_Id,
      teamName: teamInfo.Team_Name,
      teamShortCode: teamInfo.Team_Short_Code,
    };

    if (match.Win_Type == 'by runs') {
      team.winByRuns.push(Number(match.Won_By));
    } else {
      team.winByWickets.push(Number(match.Won_By));
    }

    teams.set(match.Match_Winner_Id, team);
  });

  const finalResult = [];
  teams.forEach((val, key) => {
    key != "" && (finalResult[key] = val)
  });

  return finalResult;
}


module.exports = {
  convertToJSON, getMatchDetails, getWinTypeDetails, getManOfTheMatchDetail, venueDetails, topVenueDetails, getBatsmanData, getPlayerNames, getTeamBowlingBattingData, getDataBySeasons, getTeamWinningAndLosingCount, getTeamName,
};
