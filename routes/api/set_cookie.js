const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
  
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let randomUserID = randomInteger(1, 8)

    res.cookie('userID', randomUserID)
    res.redirect('/home/');
    console.log('Cookie: ', req.cookies.userID)

  });
  //console.log(router);
  return router;
};
