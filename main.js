"use strict";
const port = 3000,
express = require("express"),
app = express();
const controller= require("./controllers/homeController.js")
const layouts = require("express-ejs-layouts")
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;
app.set("view engine", "ejs")
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


app.use((req, res, next) => {

    console.log(`request made to: ${req.url}`);
    console.log(req.query); 
    next();

});

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use(layouts);

app.get("/champion-stats/:championName/:id", controller.sendReqParam);

app.get("/champion-stats/", controller.sendApiData);

app.get("/own-stats/", controller.sendApiData);

app.get("/profile/", controller.sendApiData);

app.get("/profile/:summonerName/", controller.sendApiData);

app.get("/index/", controller.sendHtmlFile);

app.get("/:id", controller.respondWithId);

app.post("/", controller.postContent);