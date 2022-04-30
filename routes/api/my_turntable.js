const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT * FROM records;`
    )
      .then((data) => {
        const records = data.rows;
        res.json({ records });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  //console.log(router);
  return router;
};
