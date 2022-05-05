const express = require("express");
// const res = require("express/lib/response");
const router = express.Router();

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = (db) => {
  router.post("/", (req, res) => {
    let user = getRandomNumberBetween(1, 8);
    let listing = 0;
    let newRecord = req.body;
    let recordValues = [
      newRecord.title,
      newRecord.artist,
      newRecord.genre,
      Number(newRecord.price),
      newRecord.description,
      listing,
      user,
    ];
    console.log("Values: ", recordValues);
    let newSell = `
    INSERT INTO records (title, price, genre, artist_name, description, listing_views, seller_id)
    VALUES ($1, $4, $3, $2, $5, $6, $7)
    RETURNING *;
    `;
    let newImg = `
    INSERT INTO record_images (record_id, img_url)
    VALUES ($1, $2)
    RETURNING *;
    `;
    db.query(newSell, recordValues)
      .then((data) => {
        db.query(newImg, [data.rows[0].id, newRecord.img_url]);
      })
      .then(() => res.redirect("/home"))
      .catch((e) => {
        return res.status(400).json({ error: true, message: e });
      });
  });
  return router;
};
