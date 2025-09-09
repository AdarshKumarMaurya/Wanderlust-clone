import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Show = () => {
  const { id } = useParams(); // get listing id from URL
  const navigate = useNavigate();

  const [listData, setListData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/listing/${id}`);
        if (response.ok) {
          const data = await response.json();
          setListData(data);
        } else {
          console.error("Failed to fetch:", response.status);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/listing/delete/${listData._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/"); // redirect to homepage after successful delete
      } else {
        console.error("Failed to delete:", response.status);
      }
    } catch (err) {
      console.error("Error deleting listing:", err);
    }
  };



  if (loading) return <p>Loading...</p>;
  if (!listData) return <p>No listing found</p>;

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-5">
          <center>
            <h3>
              {listData.title}
            </h3>

            <img src={listData.image.url} alt="image" height="400px" width="420px" />
          </center>
          <div class="mx-5">
            <p>
              {listData.description}
            </p>
            <p>
              {listData.location}
            </p>
            <p>
              {listData.country}
            </p>
            <p>
              {listData.price}
            </p>


          </div>
          <Link
            to={`/listing/update/${listData._id}/edit`}
            className="btn btn-primary m-3"
          >
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger m-3">
            Delete
          </button>


        </div>
        <div class="col-sm-3"></div>

      </div>
    </div>
  );
};

export default Show;
