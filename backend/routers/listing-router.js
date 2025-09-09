const express = require("express");
const {
  listingRoot,
  listingData,
  editData,
  insertListing,
  deleteListing
} = require("../controllers/listing-controllers");

const router = express.Router();

router.route("/").get(listingRoot);             // GET all listings
router.route("/:_id").get(listingData);         // GET single listing
router.route("/update/:_id/edit").put(editData); // UPDATE listing
router.route("/delete/:_id").delete(deleteListing); // DELETE listing
router.route("/new/insert").post(insertListing); // CREATE new listing

module.exports = router;
