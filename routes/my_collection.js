const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const myListing = `
    SELECT title, artist_name, price, sold,listing_views, record_images.img_url
    FROM records
    JOIN record_images ON records.id = record_id
    JOIN users ON seller_id = users.id
    WHERE username = 'raas1' LIMIT 3`;
    db.query(myListing, (error, results) => {
      if (error) {
        throw error;
      }
      const myFavourites = `
      SELECT title, artist_name, price,sold,listing_views,record_images.img_url
      FROM records
      JOIN record_images ON record_id = records.id
      JOIN favourite_records ON favourite_records.record_id = records.id
      JOIN users ON user_id = users.id
      WHERE users.id = 7`;
      db.query(myFavourites, (error, results2) => {
        if (error) {
          throw error;
        }
        const countListings = `
        SELECT count(*) from records where seller_id = 7;`;
        db.query(countListings, (error, results3) => {
          if (error) {
            throw error;
          }
          for (let count of results3.rows) {
            console.log(count);
          }
          const countFavourites = `
        SELECT count(*) from favourite_records where user_id = 7;`;
          db.query(countFavourites, (error, results4) => {
            if (error) {
              throw error;
            }
            for (let count of results3.rows) {
              console.log(count);
            }
            res.render("my_collection", {
              records: results.rows,
              favourites: results2.rows,
              countListings: results3.rows,
              countFavourites: results4.rows,
            });
          });
        });
      });
    });
  });
  return router;
};
