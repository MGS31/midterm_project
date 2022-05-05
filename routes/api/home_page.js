const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT records.title, records.artist_name, records.price, records.sold, records.listing_views, record_images.img_url
      FROM records
      JOIN record_images ON record_id = records.id
      GROUP BY records.title, records.artist_name, records.price, records.sold, records.listing_views, record_images.img_url;`
    )
      .then((data) => {
        const records = data.rows;
        res.json({ records });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // console.log(router);
  return router;
};
