const LiveTeam = require('./liveTeam.js');

class LiveMatch {
    constructor(data, assets) {
        this.gameId = data.gameId;
        this.gameMode = data.gameMode;
        this.gameStartTime = data.gameStartTime;
        this.gameLength = data.gameLength;
        this.gameType = data.gameType;
        this.mapId = data.mapId;
        this.platformId = data.platformId;
        this.observers = data.observers.encryptionKey;
        this.teamsize = data.participants.length / 2;
        this.assets = assets;

        this.blueTeam = new LiveTeam(data, 0, this);
        this.redTeam = new LiveTeam(data, 1, this);
    }
}

module.exports = LiveMatch;