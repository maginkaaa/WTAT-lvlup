const LiveParticipant = require('./liveParticipant.js');

class LiveTeam {
    constructor(data, team, match) {
        this.match = match;
        this.teamsize = data.participants.length / 2;
        this.participants = [];

        let index = 0;
        if (team == 1)
            index = this.teamsize - 1;

        for (let i = 0; i < this.teamsize; i++) {
            this.participants[i] = new LiveParticipant(data, index + i, this);
        }

        this.bans = [];
        if (data.bannedChampions.length > 0) {
            for (let i = 0; i < this.teamsize; i++) {
                this.bans[i] = data.bannedChampions[5 * team + i].championId;
            }
        }
    }
}

module.exports = LiveTeam;