"use strict";
const { path } = require("express/lib/application");
const fetch = require("node-fetch");
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;

const Api = require('../api/api.js');
const Summoner = require('../api/summoner.js');
const regions = require('../api/regions.js');
const Summoners = require("../models/summonerSchema")

let api = new Api();

exports.sendReqParam = (req, res) => {
    let id = req.params.id;
    let championName = req.params.championName;
    res.send("This is Nr " + id + " " + "CharakterName = " + championName);
};

exports.sendApiData = async (req, res) => {
    // api access may be denied due to expired API Key
    const response = await fetch(api_url);
    let data = await response.json();
    res.send(data);  
    
};

exports.getProfileByName = async (req, res) => {
    // api access may be denied due to expired API Key
    const summoner = await api.getSummonerByName(req.params.summonerName, regions.EUROPE_WEST);
    res.send(`Your Level: ${summoner.summonerLevel}`);
};

exports.sendHtmlFile = (req, res) => {
    res.sendFile("//PLACEHOLDER", {root  : (__dirname, "./views")})
}

exports.postContent = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("Posted Content here");
}

exports.renderPage = async (req, res) => {
    let summonerName = req.params.id;
    let region = regions.EUROPE_WEST;
    if (Object.values(regions).includes(req.query.region))
        region = req.query.region;
    
    let summoner;
    const query = await Summoners.findOne({name: summonerName, region: region});
    if (query == null) {
        summoner = await api.getSummonerByName(summonerName, region);

        console.log("api call needed");

        const summonerModel = new Summoners({
            summonerId: summoner.id,
            accountId: summoner.accountId,
            puuid: summoner.puuid,
            name: summoner.name,
            profileIconId: summoner.profileIconId,
            revisionDate: summoner.revisionDate,
            summonerLevel: summoner.summonerLevel,
            region: summoner.region,
        });
        
        await summonerModel.save();
    } else {
        const lastUpdate = new Date(query.lastUpdate);
        const dateNow = new Date();

        const diff = (dateNow.getTime() - lastUpdate.getTime()) / 1000;
        if (diff > 3600) {
            summoner = await api.getSummonerByName(summonerName, region);
            await query.updateOne({
                lastUpdate: Date.now()
            });
            console.log("new apic call, updated in db")
        }
        else {
            summoner = new Summoner({
                id: query.summonerId,
                accountId: query.accountId,
                puuid: query.puuid,
                name: query.name,
                profileIconId: query.profileIconId,
                revisionDate: query.revisionDate,
                summonerLevel: query.summonerLevel,
            },
                region);
    
            console.log("no api call needed");
        }
    }

    let matches = await api.getMatchIdsBySummoner(summoner, null, null, null, null, 1);
    matches.forEach(async match => {
        let m = await api.getMatchByMatchId(match, summoner.region);
        console.log(m.blueTeam.participants[0].getSummonerSpells());
    });

    let match = await api.getLiveMatchBySummoner(summoner);
    if (match != null)
        console.log(match.blueTeam.participants[0].getSummonerSpells());
    else
        console.log("Not in a match");

    res.render("index", { name: summonerName, summoner: summoner});
}

exports.getAllSummoners = (req, res) => {
    Summoners.find({})
    .exec().then((summoners) => {
   res.send(summoners);
    })
    .catch((error) => {
   console.log(error.message);
   return [];
    })
    .then(() => {
   console.log("promise complete");
    });
};