const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

// function getRandomNumberBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

module.exports = (db) => {
  router.get("/", (req, res) => {
    const sql = `SELECT records.id, title, seller_id, artist_name, price, sold, description, listing_views, record_images.img_url
    FROM records
    JOIN record_images ON record_id = records.id
    ORDER BY RANDOM()
    LIMIT 1;`;
    db.query(sql, (error, results) => {
      if (error) {
        throw error;
      }
      // let user = getRandomNumberBetween(1, 8);
      const sql2 = `SELECT records.id, title, price, record_images.img_url
      FROM records
      JOIN record_images ON record_id = records.id
      JOIN favourite_records ON favourite_records.record_id = records.id
      JOIN users ON user_id = users.id
      WHERE users.id = 1
      ORDER BY RANDOM()
      LIMIT 4;`;
      db.query(sql2, (error, results2) => {
        if (error) {
          throw error;
        }
        res.render("index.ejs", {
          records: results.rows,
          favourites: results2.rows,
        });
      });
    });
  });
  //console.log(router);
  return router;
};
