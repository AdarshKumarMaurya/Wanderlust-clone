import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8080/listing", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : listings.length > 0 ? (
        <div className="row g-4">
          {listings.map((item) => (
            <div className="col-12 col-sm-6 col-md-3" key={item._id}>
              <Link to={`/listing/${item._id}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img
                    src={item.image.url}
                    className="card-img-top"
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">
                      <b>Price:</b> {item.price}&#8377;
                    </p>
                    <p className="card-text">
                      {item.location}, {item.country}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No listings found</p>
      )}
    </div>
  );
}

export default App;
