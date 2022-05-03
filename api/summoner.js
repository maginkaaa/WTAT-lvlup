const Api = require('./api.js');


class Summoner {

    constructor(data, region) {
        this.id = data.id;
        this.accountId = data.accountId;
        this.puuid = data.puuid;
        this.name = data.name;
        this.profileIconId = data.profileIconId;
        this.revisionDate = data.revisionDate;
        this.summonerLevel = data.summonerLevel;
        this.region = region;
    }

    getProfileIcon() {
        return `http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${this.profileIconId}.png`;
    }

    updateRank(data) {
        this.wins = data[0].wins; // TODO Mehr Infos
    }
}

module.exports = Summoner;