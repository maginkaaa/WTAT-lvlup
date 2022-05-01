"use strict";
const { path } = require("express/lib/application");
const fetch = require("node-fetch");
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;


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

exports.sendHtmlFile = (req, res) => {
    res.sendFile("index.html", {root  : (__dirname, "./views")})
}

exports.postContent = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("Test");
}

exports.respondWithId = (req, res) => {
    let paramsId = req.params.id
    res.render("index", { name: paramsId});
}


