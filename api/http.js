const fetch = require("node-fetch");

const RateLimitManager = require("./rateLimitManager.js");

class Http {

    constructor() {
        this.rateLimitManager = new RateLimitManager();
    }

    async request(request) {
        await this.rateLimitManager.checkRateLimit(request.host);
        
        return await fetch(`${request.host}${request.route}?api_key=${request.key}`)
    }
}

module.exports = Http;