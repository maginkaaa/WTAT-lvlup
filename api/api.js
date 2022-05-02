const fetch = require("node-fetch");

const Summoner = require('./summoner.js');
const PlatformEndpoints = require('./platformEndpoints.js');
const RegionalEndpoints = require('./regionalEndpoints.js');
const regions = require("./regions.js");
const Match = require("./match.js");
const Http = require("./http.js");

class Api {

    constructor() {
        const args = process.argv;
        if (args.length < 3)
            throw new Error('Api Key needed');

        this.key = args[2];

        this.http = new Http();

        (async () => {
            await this.checkStatus();
          })();
    }

    async checkStatus() {
        const regionsList = Object.values(regions);

        for (let i = 0; i < regionsList.length; i++) {
            const endpoint = new PlatformEndpoints(regionsList[i]);
            const request = endpoint.getStatus(this.key);
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
        const endpoint = new PlatformEndpoints(region);
        
        const request = endpoint.getSummoner(name, this.key);
        const response = await this.http.request(request);
        let data = await response.json();
        
        if ("status" in data && data.status.status_code == 404)
            console.log("Summoner not found");
            
        return new Summoner(data, region);
    }

    async updateRankBySummoner(summoner) {
        const endpoint = new PlatformEndpoints(summoner.region);

        const request = endpoint.getRank(summoner.id, this.key);
        const response = await this.http.request(request);
        let data = await response.json();
        summoner.updateRank(data);
        return summoner;
    }

    async getMatchIdsBySummoner(summoner, startTime, endTime, queue, type, count) {
        const endpoint = new RegionalEndpoints(summoner.region);

        const request = endpoint.getMatchIds(summoner.puuid, startTime, endTime, queue, type, count, this.key);
        const response = await this.http.request(request);
        let data = await response.json();
        return data;
    }

    async getMatchByMatchId(matchId, region) {
        const endpoint = new RegionalEndpoints(region);

        const request = endpoint.getMatch(matchId, this.key);
        const response = await this.http.request(request);
        let data = await response.json();
        return new Match(data);
    }
}

module.exports = Api;