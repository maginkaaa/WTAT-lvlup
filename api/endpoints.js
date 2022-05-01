const regions = require('./regions.js');

class Endpoints {

    constructor(region) {
        this.region = region;
    }

    getSummoner(name, key) {
        if (this.region == regions.EUROPE_WEST)
            return `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}/?api_key=${key}`;

        return "";
    }

    getRank(id, key) {
        if (this.region == regions.EUROPE_WEST)
            return `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}/?api_key=${key}`;

        return "";
    }
}

module.exports = Endpoints;