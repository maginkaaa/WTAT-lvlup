const fetch = require("node-fetch");

const Summoner = require('./summoner.js');
const Endpoints = require('./endpoints.js');

class Api {

    constructor() {
        const args = process.argv;
        if (args.length < 3)
            throw new CustomException('Api Key needed');

        this.key = args[2];
    }

    async getSummonerByName(name, region) {
        const endpoint = new Endpoints(region)

        const response = await fetch(`${endpoint.getServer()}/lol/summoner/v4/summoners/by-name/${name}/?api_key=${this.key}`);
        let data = await response.json();
        return new Summoner(data);
    }
}

module.exports = Api;