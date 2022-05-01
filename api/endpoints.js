const regions = require('./regions.js');

class Endpoints {

    constructor(region) {
        this.region = region;
    }

    getServer() {
        if (this.region == regions.EUROPE_WEST)
            return"https://euw1.api.riotgames.com";

        return "";
    }
}

module.exports = Endpoints;