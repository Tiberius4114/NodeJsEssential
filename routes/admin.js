const express = require("express")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    res.send("GET: admin root page")
  })
  .post((req, res) => {
    res.send("POST: admin root page")
  })
  .patch((req, res) => {
    res.send("PATCH: admin root page")
  })
  .delete((req, res) => {
    res.send("DELETE: admin root page")
  })

module.exports = router
