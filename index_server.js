const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

var guardianApiKey = "5f35af01-8648-469c-b0b7-aa921a3b5c6e";
var NyApiKey = "dFyqoBNUq2Lxgw6w25P7GIXY6CaD4RBc";

app.get("/api/isGuardian/:section", (req, res) => {
  console.log(req.params.section);
  if (req.params.section != "all") {
    console.log("Inside section");
    const section = req.params.section;
    var guardian_home_url =
      "https://content.guardianapis.com/" +
      section +
      "?api-key=" +
      guardianApiKey +
      "&show-blocks=all";
  } else {
    var guardian_home_url =
      "https://content.guardianapis.com/search?api-key=" +
      guardianApiKey +
      "&section=(sport|business|technology|politics)&show-blocks=all";
  }
  fetch(guardian_home_url)
    .then(res => res.json())
    .then(data => {
      //   console.log("JSON data from guardian API");
      //   console.log(data);
      data = data.response;
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/api/isNy/:section", (req, res) => {
  if (req.params.section != "all") {
    const section = req.params.section;
    var ny_home_url =
      "https://api.nytimes.com/svc/topstories/v2/" +
      section +
      ".json?api-key=" +
      NyApiKey;
  } else {
    var ny_home_url =
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + NyApiKey;
  }
  fetch(ny_home_url)
    .then(res => res.json())
    .then(data => {
      console.log("JSON data from NY API");
      console.log(data);
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/isGuardianSearch/:key", (req, res) => {
  console.log("Inside Guardian Search API");
  console.log(req.params.key);
  if (req.params.key) {
    const keyword = req.params.key;
    console.log(keyword);
    var guardian_search_url =
      "https://content.guardianapis.com/search?q=" +
      keyword +
      "&api-key=" +
      guardianApiKey +
      "&show-blocks=all";
  }
  fetch(guardian_search_url)
    .then(res => res.json())
    .then(data => {
      console.log("JSON search data from guardian API");
      data = data.response;
      console.log(data);
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/isNySearch/:key", (req, res) => {
  console.log("Inside Guardian Search API");
  console.log(req.params.key);
  if (req.params.key) {
    const keyword = req.params.key;
    console.log(keyword);
    var ny_search_url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      keyword +
      "&api-key=" +
      NyApiKey;
  }
  fetch(ny_search_url)
    .then(res => res.json())
    .then(data => {
      console.log("JSON search from NY API");
      console.log(data);
      data = data.response;
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
