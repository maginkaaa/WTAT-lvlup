"use strict";
const { path } = require("express/lib/application");
const fetch = require("node-fetch");
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;

const Api = require('../api/api.js');
const regions = require('../api/regions.js');

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
        
    let summoner = await api.getSummonerByName(summonerName, region);

    let matches = await api.getMatchIdsBySummoner(summoner, null, null, null, null, null);
    matches.forEach(async match => {
        let m = await api.getMatchByMatchId(match, summoner.region);
        //console.log(m.gameMode);
    });

    res.render("index", { name: summonerName, summoner: summoner});
}






