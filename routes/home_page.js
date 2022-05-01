const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const sql =
    `SELECT title, artist_name, price, sold, description, listing_views, record_images.img_url
    FROM records
    JOIN record_images ON record_id = records.id
    ORDER BY RANDOM()
    LIMIT 1;`
    db.query(sql, (error,results) => {
      if(error) {
        throw error;
      }
       const sql2 =
      `SELECT title, price, record_images.img_url
      FROM records
      JOIN record_images ON record_id = records.id
      JOIN favourite_records ON favourite_records.record_id = records.id
      JOIN users ON user_id = users.id
      WHERE users.id = 7;`
      db.query(sql2, (error,results2) => {
        if(error) {
          throw error;
        }
        res.render("index.ejs", { records: results.rows, favourites : results2.rows })
      })
    })
  })
  //console.log(router);
  return router;
};
