"use strict";
const port = 3000,
express = require("express"),
app = express();
const controller= require("./controllers/homeController.js")
const errorController = require("./controllers/errorController.js")
const server = require("./server.js")
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



app.get("/champion-stats/:championName/:id", controller.sendReqParam);

app.get("/champion-stats/", controller.sendApiData);

app.get("/own-stats/", controller.sendApiData);

app.get("/profile/", controller.sendApiData);

app.get("/profile/:summonerName/", controller.sendApiData);

app.get("/", controller.renderPage);

app.get("/:summonerName/:id", controller.renderPage);

// post content (curl for now)
app.post("/post", controller.postContent);

// needs to be after get calls
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
