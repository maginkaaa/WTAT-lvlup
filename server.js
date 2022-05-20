"use strict";
const port = 3000;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const controller= require("./controllers/homeController.js")
const errorController = require("./controllers/errorController.js")
const layouts = require("express-ejs-layouts")

app.use(express.json()),
app.use(express.static(__dirname + "/public")),
app.use(layouts),
app.set("views", (__dirname + "/views")),
app.set("view engine", "ejs"),

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

mongoose.connect('mongodb://localhost:27017/lvlup', {useNewUrlParser: true}, () => {
    console.log("Connected to DB");
});



app.get("/champion-stats/:championName/:id", controller.sendReqParam);

app.get("/champion-stats/", controller.sendApiData);

app.get("/own-stats/", controller.sendApiData);

app.get("/profile/", controller.sendApiData);

app.get("/profile/:summonerName/", controller.getProfileByName);

app.get("/", controller.renderPage);

app.get("/:summonerName/:id", controller.renderPage);

// post content (curl for now)
app.post("/post", controller.postContent);

app.get("/summoners", controller.getAllSummoners, (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
});

// needs to be after get calls
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
