
const port = 3000,
express = require("express"),
app = express();
const fetch = require("node-fetch");
const api_key = "RGAPI-e296c3d6-6f85-44d5-ba87-14931d0b096c";
const api_url = "https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5583464608/" + "?api_key=" + api_key;


app.get("/champion-stats/champion/", async (req, res) => {
  const response = await fetch(api_url);
  let data = await response.json();
  res.send(data);
});

app.get("/champion-stats/champion/:id", async (req, res) => {
  const response = await fetch(api_url);
  let data = await response.json();
  res.send(data);
});



app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});

app.use((req, res, next) => {
 console.log(`request made to: ${req.url}`);
 next();
});
