import express from "express";

import {
  extractJsonByIndex,
  testAppleGoodbye,
  testAppleHello,
  extractJsonByYear,
  sortJsonByStates,
  getData,
  getYearData,
} from "./functions.js"
import { read } from "./jsonFileStorage.js";


let app = express();
// Set the view engine to ejs
app.set("view engine", "ejs");

app.get("/",getData)
app.get("/years",getYearData);

// index is a URL path parameter
app.get("/sightings/:index", extractJsonByIndex);

app.get("/apple", testAppleHello);
app.get("/apple", testAppleGoodbye);

app.get("/year-sightings/:YEAR", extractJsonByYear);

app.get("/year-sightings", sortJsonByStates);

app.listen(3006);
