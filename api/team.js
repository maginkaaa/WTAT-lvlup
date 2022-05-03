const Participant = require('./participant.js');

class Team {
    constructor(data, team, match) {
        this.match = match;
        this.teamsize = data.metadata.participants.length / 2;
        this.participants = [];

        let index = 0;
        if (team == 1)
            index = this.teamsize - 1;

        for (let i = 0; i < this.teamsize; i++) {
            this.participants[i] = new Participant(data, index + i, this);
        }

        this.bans = [];
        for (let i = 0; i < data.info.teams[team].bans.length; i++) {
            this.bans[i] = data.info.teams[team].bans[i].championId;
        }
        this.win = data.info.teams[team].win;
    }
}

module.exports = Team;