const mongoose = require("mongoose");

const SummonerSchema = mongoose.Schema({
  summonerId:  {
    type: String,
    required: true
  },
  accountId:  {
    type: String,
    required: true
  },
  puuid:  {
    type: String,
    required: true
  },
  name:  {
    type: String,
    required: true
  },
  profileIconId:  {
    type: Number,
    required: true
  },
  revisionDate:  {
    type: Number,
    required: true
  },
  summonerLevel:  {
    type: Number,
    required: true
  },
  region:  {
    type: String,
    required: true
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999
  }
});

module.exports = mongoose.model("summoner", SummonerSchema);

SummonerSchema.methods.getInfo = function() {
  return `Summoner ID: ${this.summonerId} Account ID: ${this.accountId} Puuid: ${this.puuid} Name: ${this.name} Profile Icon: ${this.profileIconId} 
  Revision Date:${this.revisionDate} Summoner Level:${this.summonerLevel} Region:${this.region} Match IDs:${this.matchIds} Last Update:${this.lastUpdate}
  Zip Code:${this.zipCode}`;
 };

 SummonerSchema.methods.findLocalSubscribers = function() {
  return this.model("Summoner")
  .find({zipCode: this.zipCode})
  .exec();
 };