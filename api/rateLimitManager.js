class RateLimitManager {

    constructor() {
        this.requestsPerSec = 19;
        this.requestsPerTwoMin = 99;

        this.timestampsSec = {
            "https://americas.api.riotgames.com": 0,
            "https://europe.api.riotgames.com": 0,
            "https://asia.api.riotgames.com": 0,
            "https://br1.api.riotgames.com": 0,
            "https://eun1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
            "https://kr.api.riotgames.com": 0,
            "https://la1.api.riotgames.com": 0,
            "https://la2.api.riotgames.com": 0,
            "https://na1.api.riotgames.com": 0,
            "https://oc1.api.riotgames.com": 0,
            "https://ru.api.riotgames.com": 0,
            "https://tr1.api.riotgames.com": 0,
            "https://jp1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
        };
        this.timestampsMin = {
            "https://americas.api.riotgames.com": 0,
            "https://europe.api.riotgames.com": 0,
            "https://asia.api.riotgames.com": 0,
            "https://br1.api.riotgames.com": 0,
            "https://eun1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
            "https://kr.api.riotgames.com": 0,
            "https://la1.api.riotgames.com": 0,
            "https://la2.api.riotgames.com": 0,
            "https://na1.api.riotgames.com": 0,
            "https://oc1.api.riotgames.com": 0,
            "https://ru.api.riotgames.com": 0,
            "https://tr1.api.riotgames.com": 0,
            "https://jp1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
        };
        this.countSec = {
            "https://americas.api.riotgames.com": 0,
            "https://europe.api.riotgames.com": 0,
            "https://asia.api.riotgames.com": 0,
            "https://br1.api.riotgames.com": 0,
            "https://eun1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
            "https://kr.api.riotgames.com": 0,
            "https://la1.api.riotgames.com": 0,
            "https://la2.api.riotgames.com": 0,
            "https://na1.api.riotgames.com": 0,
            "https://oc1.api.riotgames.com": 0,
            "https://ru.api.riotgames.com": 0,
            "https://tr1.api.riotgames.com": 0,
            "https://jp1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
        };
        this.countMin = {
            "https://americas.api.riotgames.com": 0,
            "https://europe.api.riotgames.com": 0,
            "https://asia.api.riotgames.com": 0,
            "https://br1.api.riotgames.com": 0,
            "https://eun1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
            "https://kr.api.riotgames.com": 0,
            "https://la1.api.riotgames.com": 0,
            "https://la2.api.riotgames.com": 0,
            "https://na1.api.riotgames.com": 0,
            "https://oc1.api.riotgames.com": 0,
            "https://ru.api.riotgames.com": 0,
            "https://tr1.api.riotgames.com": 0,
            "https://jp1.api.riotgames.com": 0,
            "https://euw1.api.riotgames.com": 0,
        };
    }

    async checkRateLimit(host) {
        const timestamp = Date.now();

        if (timestamp > this.timestampsSec[host] + 1000) {
            this.countSec[host] = 1;
            this.timestampsSec[host] = timestamp;
        } 
        else 
        {
            this.countSec[host]++;
        }

        if (timestamp > this.timestampsMin[host] + 120000) {
            this.countMin[host] = 1;
            this.timestampsMin[host] = timestamp;
        } 
        else 
        {
            this.countMin[host]++;
        }

        let wait = 0;
        if (this.countSec[host] >= this.requestsPerSec)
            wait = (this.timestampsSec[host] + 1000) - timestamp;

        if (this.countMin[host] >= this.requestsPerTwoMin)
            wait = (this.timestampsMin[host] + 120000) - timestamp;
            
        await new Promise(r => setTimeout(r, wait));;
    }
}

module.exports = RateLimitManager;