const Team = require('./team.js');

class Match {
    constructor(data) {
        this.matchId = data.metadata.matchId;
        this.gameId = data.info.gameId;
        this.gameMode = data.info.gameMode;

        this.blueTeam = new Team()
        this.redTeam = new Team()
    }
}

module.exports = Match;