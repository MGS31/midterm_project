// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/mycollection", myCollectionAPIRoutes(db));
app.use("/api/myturntable", myTurntableAPIRoutes(db));
app.use("/api/home", myHomePageAPIRoutes(db));

//Non API routes
app.use("/mycollection", myCollectionRoutes(db));
app.use("/myturntable", myTurntableRoutes(db));
app.use("/home", myHomePageRoutes(db));

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
