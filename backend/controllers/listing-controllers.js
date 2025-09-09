const Listing = require("../models/listing");

// Fetch all listings
const listingRoot = async (req, res) => {
  try {
    const data = await Listing.find({});
    res.status(200).json(data); // send JSON array to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Fetch single listing by ID
const listingData = async (req, res) => {
  const { _id } = req.params;
  try {
    const listData = await Listing.findById(_id);
    if (!listData) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Insert a new listing
const insertListing = async (req, res) => {
  try {
    const { title, description, url, price, location, country } = req.body;
    const newListing = await Listing.create({
      title,
      description,
      image: { url }, // assuming your model has image: { url }
      price,
      location,
      country,
    });
    res.status(201).json(newListing); // send created listing as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error inserting listing" });
  }
};

// Update an existing listing
const editData = async (req, res) => {
  const { _id } = req.params;
  const { title, description, price, location, country, url } = req.body;

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        price,
        location,
        country,
        ...(url && { image: { url } }) // only update image if url provided
      },
      { new: true } // return the updated document
    );
    if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(updatedListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete a listing
const deleteListing = async (req, res) => {
  const { _id } = req.params;
  try {
    const deleted = await Listing.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = {
  listingRoot,
  listingData,
  insertListing,
  editData,
  deleteListing,
};
