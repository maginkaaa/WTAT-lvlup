"use strict";
// handles all the express functions
const port = 3000,
express = require("express"),
app = express();
const fetch = require("node-fetch");
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;



app.get("/champion-stats/", async (req, res) => {
  // api call for all champion stats
  const response = await fetch(api_url);
  let data = await response.json();
  res.send(data);
});

app.get("/champion-stats/champion/:id", async (req, res) => {
  // for now uses the same api_url
  const response = await fetch(api_url);
  let data = await response.json();
  res.send(data);
});

app.get("/profile", (req, res) => {
    // own profile (response with html file for now)
    res.sendFile("profile.html", {root : __dirname})
});

app.get("/profile/:summonerName", (req, res) => {
    // parameter summonerName
    var name = req.params.summonerName;
    res.send("Profile of User by summonerName")
});

app.get("/own-stats", (req, res) => {
    // own stats
    res.send("Your own game-stats")
});

app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});

app.use((req, res, next) => {
 console.log(`request made to: ${req.url}`);
 next();
});
