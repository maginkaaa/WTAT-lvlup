"use strict";
const port = 3000,
express = require("express"),
app = express();
const controller= require("./controllers/homeController.js")
const errorController = require("./controllers/errorController.js")
const layouts = require("express-ejs-layouts")
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;
app.use(express.json()),
app.use(express.static("public")),
app.use(layouts),
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



app.get("/champion-stats/:championName/:id", controller.sendReqParam);

app.get("/champion-stats/", controller.sendApiData);

app.get("/own-stats/", controller.sendApiData);

app.get("/profile/", controller.sendApiData);

app.get("/profile/:summonerName/", controller.sendApiData);

app.get("/", controller.sendHtmlFile);

app.get("/summonerName/:id", controller.respondWithId);

// post content (curl for now)
app.post("/post", controller.postContent);

// needs to be after route definition calls
app.use(errorController.respondNoResourceFound);
