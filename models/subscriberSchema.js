const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const SummonerSchema = new mongoose.Schema({
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
  matchIds: [{
    type: String
  }],
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

subscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} Email: ${this.email} Zip Code:
   ➥ ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model("Subscriber")
    .find({zipCode: this.zipCode})
    .exec();
   };