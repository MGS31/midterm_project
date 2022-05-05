const express = require("express");
const router = express.Router();


module.exports = (db) => {
router.post("/", (req, res) => {
  let favouriteIDs = [req.body.record_id, req.cookies.userID];
  let favouriteRecord =
  `INSERT INTO favourite_records (record_id, user_id)
  VALUES ($1, $2)
  RETURNING *;`;
  db.query(favouriteRecord, favouriteIDs)
  .then(() => res.redirect("/home"))
  .catch((e) => {
    return res.status(400).json({ error: true, message: e });
  });
})
return router;
};
