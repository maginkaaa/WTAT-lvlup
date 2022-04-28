const port = 3000,
 express = require("express"),
 app = express();




app.get("/champion-stats/", (req, res) => {
  res.sendFile('champion-stats.html', {root : __dirname} )
});

app.get("/champion-stats/champion/:id", (req, res) => {
 let champId = req.params.id;
 res.send(`Specific Champion Stat`);
});



app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});

app.use((req, res, next) => {
 console.log(`request made to: ${req.url}`);
 next();
});
