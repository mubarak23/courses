import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="jumbotron">
      <h2>PluralSight Adminstration Panel</h2>
      <p>React Redux and React Router for Ultra responsive Web App</p>
      <Link to="/about" className="btn btn-primary btn-lg">
        Learn More
      </Link>
    </div>
  );
};

export default HomePage;
