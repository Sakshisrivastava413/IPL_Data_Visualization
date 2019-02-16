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

module.exports = {
  convertToJSON, getTeamBowlingBattingData,
};
