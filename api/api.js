const fetch = require("node-fetch");

const Summoner = require('./summoner.js');
const PlatformEndpoints = require('./endpoints/platformEndpoints.js');
const RegionalEndpoints = require('./endpoints/regionalEndpoints.js');
const regions = require("./regions.js");
const Match = require("./match/match.js");
const Http = require("./http/http.js");
const LiveMatch = require("./match/liveMatch.js");

class Api {

    constructor() {
        const args = process.argv;
        if (args.length < 3)
            throw new Error('Api Key needed');

        this.key = args[2];

        this.http = new Http();

        (async () => {
            await this.fetchAssets();
            await this.checkStatus();
          })();
    }

    async fetchAssets() {
        let response = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.7.1/data/en_US/runesReforged.json`);
        this.assets = {};
        this.assets.runes = await response.json();

        response = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/summoner.json`);
        this.assets.summoner = await response.json();

        response = await fetch(`https://static.developer.riotgames.com/docs/lol/queues.json`);
        this.assets.queues = await response.json();

        response = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion.json`);
        this.assets.champions = await response.json();
    }

    async checkStatus() {
        const regionsList = Object.values(regions);

        for (let i = 0; i < regionsList.length; i++) {
            const endpoint = new PlatformEndpoints(regionsList[i], this.key);
            const request = endpoint.getStatus();
            const response = await this.http.request(request);
            let data = await response.json();
            
            if ("status" in data && data.status.status_code == 403)
                throw new Error('Api Key is invalid');

            if (data.maintenances.length > 0) {
                console.log(`Maintenance in ${regionsList[i]}`);
                //data.maintenances.forEach(maintenance => { 
                    //console.log(maintenance);
                //});
            }
          }
    }

    async getSummonerByName(name, region) {
        console.log(name)
        console.log(region)
        const endpoint = new PlatformEndpoints(region, this.key);
        
        const request = endpoint.getSummoner(name);
        const response = await this.http.request(request);
        let data = await response.json();

        if ("status" in data && data.status.status_code == 404) {
            console.log("Summoner not found");
            return null;
        }
            
        return new Summoner(data, region);
    }

    async updateRankBySummoner(summoner) {
        const endpoint = new PlatformEndpoints(summoner.region, this.key);

        const request = endpoint.getRank(summoner.id);
        const response = await this.http.request(request);
        let data = await response.json();
        summoner.updateRank(data);
        return summoner;
    }

    async getMatchIdsBySummoner(summoner, startTime, endTime, queue, type, count) {
        const endpoint = new RegionalEndpoints(summoner.region, this.key);

        const request = endpoint.getMatchIds(summoner.puuid, startTime, endTime, queue, type, count);
        const response = await this.http.request(request);
        let data = await response.json();
        return data;
    }

    async getMatchByMatchId(matchId, region) {
        const endpoint = new RegionalEndpoints(region, this.key);

        const request = endpoint.getMatch(matchId);
        const response = await this.http.request(request);
        let data = await response.json();

        if ("status" in data && data.status.status_code == 404)
            return null;
            
        return new Match(data, this.assets);
    }

    async getLiveMatchBySummoner(summoner) {
        const endpoint = new PlatformEndpoints(summoner.region, this.key);

        const request = endpoint.getLiveMatch(summoner.id);
        const response = await this.http.request(request);
        let data = await response.json();

        if ("status" in data && data.status.status_code == 404)
            return null;

        return new LiveMatch(data, this.assets);
    }
}

module.exports = Api;