const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("my_turntable");
  });
  /* console.log(router); */
  return router;
};
