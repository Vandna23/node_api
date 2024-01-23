const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello node api yyy");
});

app.listen(3000, () => {
  console.log(`Node api is running on port 3000`);
});
