const regions = require('./regions.js');
const Request = require("./request.js");

class RegionalEndpoints {

    constructor(region) {
        switch (region) {
            case regions.BRAZIL:
                this.host = "https://americas.api.riotgames.com";
                break;
            case regions.EUROPE:
                this.host = "https://europe.api.riotgames.com";
                break;
            case regions.EUROPE_WEST:
                this.host = "https://europe.api.riotgames.com";
                break;
            case regions.KOREA:
                this.host = "https://asia.api.riotgames.com";
                break;
            case regions.LATIN_AMERICA_NORTH:
                this.host = "https://americas.api.riotgames.com";
                break;
            case regions.LATIN_AMERICA_SOUTH:
                this.host = "https://americas.api.riotgames.com";
                break;
            case regions.NORTH_AMERICA:
                this.host = "https://americas.api.riotgames.com";
                break;
            case regions.OCEANIA:
                this.host = "https://americas.api.riotgames.com";
                break;
            case regions.RUSSIA:
                this.host = "https://europe.api.riotgames.com";
                break;
            case regions.TURKEY:
                this.host = "https://europe.api.riotgames.com";
                break;
            case regions.JAPAN:
                this.host = "https://asia.api.riotgames.com";
                break;
            default:
                this.host = "https://euw1.api.riotgames.com";
          }
    }

    getMatchIds(puuid, startTime, endTime, queue, type, count, key) {
        let parameters = ""
        if (startTime != null)
            parameters += `startTime=${startTime}&`;
        if (endTime != null)
            parameters += `endTime=${endTime}&`;
        if (queue != null)
            parameters += `queue=${queue}&`;
        if (type != null)
            parameters += `type=${type}&`;
        if (count != null)
            parameters += `count=${count}&`;

        return new Request(this.host, `/lol/match/v5/matches/by-puuid/${puuid}/ids${parameters}`, key);
    }

    getMatch(matchId, key) {
        return new Request(this.host, `/lol/match/v5/matches/${matchId}`, key);
    }
}

module.exports = RegionalEndpoints;