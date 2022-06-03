const Team = require('./team.js');

class Match {
    constructor(data, assets) {
        this.matchId = data.metadata.matchId;
        this.gameId = data.info.gameId;
        this.gameMode = data.info.gameMode;
        this.gameName = data.info.gameName;
        this.gameCreation = data.info.gameCreation;
        this.gameDuration = data.info.gameDuration;
        this.gameEndTimestamp = data.info.gameEndTimestamp;
        this.gameStartTimestamp = data.info.gameStartTimestamp;
        this.gameType = data.info.gameType;
        this.gameVersion = data.info.gameVersion;
        this.mapId = data.info.mapId;
        this.platformId = data.info.platformId;
        this.queueId = data.info.queueId;
        this.tournamentCode = data.info.tournamentCode;
        this.teamsize = data.metadata.participants.length / 2;
        this.assets = assets;

        const queue = this.assets.queues.find(queue => queue.queueId == this.queueId);
        this.queueName = queue.description;
        this.mapName = queue.map;

        this.blueTeam = new Team(data, 0, this);
        this.redTeam = new Team(data, 1, this);
    }
}

module.exports = Match;