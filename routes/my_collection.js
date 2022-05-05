const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const myListing = `
    SELECT records.id,title, artist_name, price, sold,listing_views, record_images.img_url
    FROM records
    JOIN record_images ON records.id = record_id
    JOIN users ON seller_id = users.id
    WHERE username = 'alice1' LIMIT 3`;
    db.query(myListing, (error, results) => {
      if (error) {
        throw error;
      }
      const myFavourites = `
      SELECT records.id,title, artist_name, price,sold,listing_views,record_images.img_url
      FROM records
      JOIN record_images ON record_id = records.id
      JOIN favourite_records ON favourite_records.record_id = records.id
      JOIN users ON user_id = users.id
      WHERE users.id = 1`;
      db.query(myFavourites, (error, results2) => {
        if (error) {
          throw error;
        }
        const countListings = `
        SELECT count(*) from records where seller_id = 1;`;
        db.query(countListings, (error, results3) => {
          if (error) {
            throw error;
          }
          // for (let count of results3.rows) {
          //   console.log(count);
          // }
          const countFavourites = `
            SELECT count(*) from favourite_records where user_id = 1;`;
          db.query(countFavourites, (error, results4) => {
            if (error) {
              throw error;
            }
            for (let count of results4.rows) {
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
    router.get("/:id", (req, res) => {
      res.redirect("/mycollection");
    });
  });
  router.post("/delete/:id", (req, res) => {
    let deledtedRecordID = [req.params.id];
    let deleteRecord = `DELETE FROM records WHERE id = $1`;
    db.query(deleteRecord, deledtedRecordID).then(() =>
      res.redirect("/mycollection")
    );
  });
  router.post("/:id", (req, res) => {
    let soldRecordID = [req.params.id];
    let soldRecord = `UPDATE records SET sold = true WHERE id = $1;`;
    db.query(soldRecord, soldRecordID);
    res.redirect("/mycollection");
  });
  return router;
};
