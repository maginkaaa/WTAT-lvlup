const Api = require('./api.js');


class Summoner {

    constructor(data) {
        this.accountId = data.accountId;
        this.puuid = data.puuid;
        this.name = data.name;
        this.profileIconId = data.profileIconId;
        this.revisionDate = data.revisionDate;
        this.summonerLevel = data.summonerLevel;
    }

    getIconLink() {
        return `http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${this.profileIconId}.png`;
    }
}

module.exports = Summoner;