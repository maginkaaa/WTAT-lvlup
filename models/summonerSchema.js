const { type } = require("express/lib/response");
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
  matchIds: [{
    type: String
  }],
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("summoner", SummonerSchema);