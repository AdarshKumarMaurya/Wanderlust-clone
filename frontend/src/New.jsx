import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const New = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    location: "",
    url: "",
    price: "",
    description: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/listing/new/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newListing = await response.json();
        navigate(`/listing/${newListing._id}`); // redirect to Show page of new listing
      } else {
        console.error("Failed to create:", response.status);
      }
    } catch (err) {
      console.error("Error creating listing:", err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <center>
            <h3>Add New Listing</h3>
          </center>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control m-3"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-control m-3"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-control m-3"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-control m-3"
              name="url"
              placeholder="Enter image URL"
              value={formData.url}
              onChange={handleChange}
            />
            <input
              type="number"
              className="form-control m-3"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <textarea
              className="form-control m-3"
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="btn btn-primary m-3">
              Submit
            </button>
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  );
};

export default New;
