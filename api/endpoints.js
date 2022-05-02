const regions = require('./regions.js');

class Endpoints {

    constructor(region) {
        switch (region) {
            case regions.BRAZIL:
                this.host = "https://br1.api.riotgames.com";
                break;
            case regions.EUROPE:
                this.host = "https://eun1.api.riotgames.com";
                break;
            case regions.EUROPE_WEST:
                this.host = "https://euw1.api.riotgames.com";
                break;
            case regions.KOREA:
                this.host = "https://kr.api.riotgames.com";
                break;
            case regions.LATIN_AMERICA_NORTH:
                this.host = "https://la1.api.riotgames.com";
                break;
            case regions.LATIN_AMERICA_SOUTH:
                this.host = "https://la2.api.riotgames.com";
                break;
            case regions.NORTH_AMERICA:
                this.host = "https://na1.api.riotgames.com";
                break;
            case regions.OCEANIA:
                this.host = "https://oc1.api.riotgames.com";
                break;
            case regions.RUSSIA:
                this.host = "https://ru.api.riotgames.com";
                break;
            case regions.TURKEY:
                this.host = "https://tr1.api.riotgames.com";
                break;
            case regions.JAPAN:
                this.host = "https://jp1.api.riotgames.com";
                break;
            default:
                this.host = "https://euw1.api.riotgames.com";
          }
    }

    getStatus(key) {
        return `${this.host}/lol/status/v4/platform-data?api_key=${key}`;
    }

    getSummoner(name, key) {
        return `${this.host}/lol/summoner/v4/summoners/by-name/${name}/?api_key=${key}`;
    }

    getRank(id, key) {
        return `${this.host}/lol/league/v4/entries/by-summoner/${id}/?api_key=${key}`;
    }
}

module.exports = Endpoints;