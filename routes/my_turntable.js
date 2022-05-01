const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const myListing = `
    SELECT title, artist_name, price, description,listing_views, record_images.img_url
    FROM records
    JOIN record_images ON records.id = record_id
    JOIN users ON seller_id = users.id
    WHERE record_id = 3 LIMIT 1`;
    db.query(myListing, (error, results) => {
      if (error) {
        throw error;
      }
      const recordComments = `
      SELECT comments.description, users.username
      FROM comments
      JOIN users on user_id = users.id
      WHERE record_id = 3`;
      db.query(recordComments, (error, results2) => {
        if (error) {
          throw error;
        }
        res.render("my_turntable", {
          records: results.rows,
          comments: results2.rows,
        });
      });
    });
  });
  router.post("/", (req, res) => {
    let userComment = req.body["newComment"];
    let commentValues = [2, 6, userComment];
    let newComment = `
    INSERT INTO comments (record_id,user_id, description) VALUES ($1 ,$2 ,$3)`;
    db.query(newComment, commentValues);
    res.redirect("/myturntable").catch((err) => {
      console.log(err.message);
    });
  });
  return router;
};
