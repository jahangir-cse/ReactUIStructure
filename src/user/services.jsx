import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="container mt-3 service-section">
      <div className="">
        <h4 className="mb-0 text-primary">All Services</h4>
      </div>
      <div className="row my-4">
        <div className="col-sm-3 col-4 d-middle">
          <Link to={`/recharge`}>
            <div className="text-center">
              <h6><i className="bi bi-globe text-primary fs-1"></i></h6>
              <h5 className="mb-0">Recharge</h5>
            </div>
          </Link>
        </div>
        <div className="col-sm-3 col-4 d-middle">
          <Link to={`/offer/Regular`}>
            <div className="text-center">
              <h6><i className="bi bi-globe text-primary fs-1"></i></h6>
              <h5 className="mb-0">Regular Offer</h5>
            </div>
          </Link>
        </div>   
        <div className="col-sm-3 col-4 d-middle">
          <Link to={`/offer/Drive`}>
            <div className="text-center">
              <h6><i className="bi bi-ev-front text-primary fs-1"></i></h6>
              <h5 className="mb-0">Drive Offer</h5>
            </div>
          </Link>
        </div>    
        <div className="col-sm-3 col-4 d-middle">
          <Link to={`/addUser`}>
          <div className="text-center">
            <h6><i className="bi bi-person-add text-primary fs-1"></i></h6>
            <h5 className="mb-0">Add User</h5>
          </div>
          </Link>
        </div>
        <div className="col-sm-3 col-4 d-middle">
          <Link to={`/myUser`}>
          <div className="text-center">
            <h6><i className="bi bi-people text-primary fs-1"></i></h6>
            <h5 className="mb-0">My User</h5>
          </div>
          </Link>
        </div>
        <div className="col-sm-3 col-4 d-middle">
          <Link to={`/history`}>
            <div className="text-center">
              <h6><i className="bi bi-ev-front text-primary fs-1"></i></h6>
              <h5 className="mb-0">History</h5>
            </div>
          </Link>
        </div> 
      </div>
    </div>
  );
};

export default Services;
