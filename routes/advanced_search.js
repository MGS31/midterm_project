const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("advanced_search");
  });
  //console.log(router);
  return router;
};
