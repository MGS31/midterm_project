const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let recordID = [req.params.id];
    const myListing = `
    SELECT records.id,title, artist_name, price, description,sold,listing_views, record_images.img_url
    FROM records
    JOIN record_images ON records.id = record_id
    JOIN users ON seller_id = users.id
    WHERE record_id = $1 LIMIT 1`;
    db.query(myListing, recordID, (error, results) => {
      if (error) {
        throw error;
      }
      const recordComments = `
      SELECT comments.description, users.username
      FROM comments
      JOIN users on user_id = users.id
      WHERE record_id = $1`;
      db.query(recordComments, recordID, (error, results2) => {
        if (error) {
          throw error;
        }
        const countComments = `
        SELECT count(*) FROM comments WHERE record_id = $1`;
        db.query(countComments, recordID, (error, results3) => {
          if (error) {
            throw error;
          }
          res.render("my_turntable", {
            records: results.rows,
            comments: results2.rows,
            countComments: results3.rows,
          });
        });
      });
    });
    // router.get("/:id", (req, res) => {
    //   res.redirect("/mycollection");
    // });
  });
  router.post("/:id", (req, res) => {
    // let recordID = req.params.id;
    let userComment = req.body["newComment"];
    let commentValues = [4, 6, userComment];
    let newComment = `
    INSERT INTO comments (record_id,user_id, description) VALUES ($1 ,$2 ,$3)`;
    db.query(newComment, commentValues);
    res.redirect("/myturntable/4").catch((err) => {
      console.log(err.message);
    });
  });
  return router;
};
