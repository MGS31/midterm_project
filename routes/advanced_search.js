const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let queryString = `
    SELECT *
    FROM records
    JOIN record_images
    ON records.id = record_images.record_id
   `;

    db.query(queryString)
      .then((result) => {
        const templateVars = {
          records: result.rows,
          appliedFilters: [],
        };

        console.log(templateVars);

        res.render("advanced_search_results", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
