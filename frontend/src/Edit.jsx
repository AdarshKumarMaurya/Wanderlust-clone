import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    location: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch listing details when page loads
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:8080/listing/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error("Failed to fetch:", response.status);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/listing/update/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(`/listing/${id}`); // redirect back to Show page
      } else {
        console.error("Failed to update:", response.status);
      }
    } catch (err) {
      console.error("Error updating listing:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h3 className="text-center my-3">Edit Listing</h3>
          <center>
            <img src={formData.image.url} alt="image" height="400px" width="420px" />
          </center>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control my-2"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
            <input
              type="text"
              className="form-control my-2"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
            <input
              type="text"
              className="form-control my-2"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
            <input
              type="number"
              className="form-control my-2"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
            <textarea
              className="form-control my-2"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="4"
              required
            />

            <button type="submit" className="btn btn-primary w-100 my-2">
              Update
            </button>
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  );
};

export default Edit;
