const fetch = require("node-fetch");

const Summoner = require('./summoner.js');
const Endpoints = require('./endpoints.js');
const regions = require("./regions.js");

class Api {

    constructor() {
        const args = process.argv;
        if (args.length < 3)
            throw new Error('Api Key needed');

        this.key = args[2];

        (async () => {
            await this.checkStatus();
          })();
    }

    async checkStatus() {
        const regionsList = Object.values(regions);

        for (let i = 0; i < regionsList.length; i++) {
            const endpoint = new Endpoints(regionsList[i]);
            const response = await fetch(endpoint.getStatus(this.key));
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
        const endpoint = new Endpoints(region);
        
        const response = await fetch(endpoint.getSummoner(name, this.key));
        let data = await response.json();
        
        if ("status" in data && data.status.status_code == 404)
            console.log("Summoner not found");
            
        return new Summoner(data, region);
    }

    async updateRankBySummoner(summoner) {
        const endpoint = new Endpoints(summoner.region);

        const response = await fetch(endpoint.getRank(summoner.id, this.key));
        let data = await response.json();
        summoner.updateRank(data);
        return summoner;
    }
}

module.exports = Api;