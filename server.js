// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");


// *** for authentication feature ***
const cookieParser = require('cookie-parser');
// *** for authentication feature ***


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// *** for authentication feature ***
app.use(cookieParser());
// *** for authentication feature ***

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const myCollectionRoutes = require("./routes/my_collection");
const myCollectionAPIRoutes = require("./routes/api/my_collection");
const myTurntableRoutes = require("./routes/my_turntable");
const myTurntableAPIRoutes = require("./routes/api/my_turntable");
const myHomePageAPIRoutes = require("./routes/api/home_page");
const myHomePageRoutes = require("./routes/home_page");
const sellARecordAPIRoutes = require("./routes/api/sell_a_record");
const sellARecordRoutes = require("./routes/display_sell");
const postASellRoutes = require("./routes/post_sell");
const postFavsRoutes = require("./routes/post_favs");

// *** for ADVANCED SEARCH feature ***
const advancedSearch = require("./routes/advanced_search"); // to render advanced search page
const advancedSearchAPI = require("./routes/api/records_search"); // end point for advanced search API (to handle get request)
// *** for ADVANCED SEARCH feature ***

// *** for authentication feature ***
const setCookie = require("./routes/api/set_cookie");
// *** for authentication feature ***

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/mycollection", myCollectionAPIRoutes(db));
app.use("/api/myturntable", myTurntableAPIRoutes(db));
app.use("/api/home", myHomePageAPIRoutes(db));
app.use("/api/sell", sellARecordAPIRoutes(db));


// *** for ADVANCED SEARCH feature ***
app.use("/api/records/search", advancedSearchAPI(db));
// *** for ADVANCED SEARCH feature ***

// *** for authentication feature ***
app.use("/api/records/set_cookie", setCookie(db));
// *** for authentication feature ***

//Non API routes
app.use("/mycollection", myCollectionRoutes(db));
app.use("/myturntable", myTurntableRoutes(db));
app.use("/home", myHomePageRoutes(db));
app.use("/sell", sellARecordRoutes(db));
app.use("/complete", postASellRoutes(db));
app.use("/favs", postFavsRoutes(db));

// *** for ADVANCED SEARCH feature ***
app.use("/advanced_search", advancedSearch(db));
// *** for ADVANCED SEARCH feature ***

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/sell-a-record", (req, res) => {
//   res.render("sell_a_record");
// });

// app.get("/mycollection", (req, res) => {
//   res.render("my_collection");
// });

// app.get("/myturntable", (req, res) => {
//   res.render("my_turntable");
// });

app.listen(PORT, () => {
  console.log(`Sell-a-record app listening on port ${PORT}`);
});
