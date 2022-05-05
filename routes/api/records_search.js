const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    
    let title = req.query.title;
    let artist = req.query.artist;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let genre = req.query.genre;
    let availability = req.query.availability;

    // logic to convert availability from string -> boolean
    if (availability === 'available') {
      availability = true;
    } else if (availability === 'sold') {
      availability = false;
    } else if (availability === 'both') {
      availability = null;
    }

    // define queryParams that may be passed into query
    const queryParams = [];
    const appliedFilters =[];
    // the starter code that will be modified/ appended to based on filters used
    let queryString = `
    SELECT *
    FROM records
    JOIN record_images
    ON records.id = record_images.record_id
   `;

    // query modification to search by title
    if (title) {
      queryParams.push(`%${title}%`);
      appliedFilters.push('Title');
      queryString += `WHERE title LIKE $${queryParams.length}`;
    }

    // query modification to search by artist
    if (artist) {
      queryParams.push(`%${artist}%`);
      appliedFilters.push('Artist');
      if (queryParams.length === 1) { //checks if more than 1 WHERE clauses is needed, to see if AND is required
        queryString += `WHERE artist_name LIKE $${queryParams.length} `;
      } else {
        queryString += `AND artist_name LIKE $${queryParams.length} `;
      }
    }

    // query modification to search by min and max price
    if (minPrice && maxPrice) {
      queryParams.push(minPrice * 100, maxPrice * 100); // *100 to convert from dollars to cents
      appliedFilters.push('Price');
      if (queryParams.length === 2) { //checks if more than 1 WHERE clauses is needed, to see if AND is required
        queryString += `WHERE price >= $${queryParams.length - 1} AND price <= $${queryParams.length} `;
      } else {
        queryString += `AND price >= $${queryParams.length - 1} AND price <= $${queryParams.length} `;
      }
    }
    
    // query modification to search by genre
    if (genre) {
      queryParams.push(`%${genre}%`);
      appliedFilters.push('Genre');
      if (queryParams.length === 1) { //checks if more than 1 WHERE clauses is needed, to see if AND is required
        queryString += `WHERE genre LIKE $${queryParams.length} `;
      } else {
        queryString += `AND genre LIKE $${queryParams.length} `;
      }
    }

    // query modification to search by availability
    if (availability === true) {
      appliedFilters.push('Availability');
      if (queryParams.length === 0) { //checks if more than 1 WHERE clauses is needed, to see if AND is required
        queryString += `WHERE sold = FALSE `;
      } else {
        queryString += `AND sold = FALSE `;
      }
    } else if (availability === false) {
      appliedFilters.push('Availability');
      if (queryParams.length === 0) { //checks if more than 1 WHERE clauses is needed, to see if AND is required
        queryString += `WHERE sold = TRUE `;
      } else {
        queryString += `AND sold = TRUE `;
      }
    }

    db.query(queryString, queryParams)
      .then((result) => {

        const templateVars = {
          records: result.rows,
          appliedFilters: appliedFilters
        };

        res.render("advanced_search_results", templateVars);
        
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

