import React from "react";
import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="container-fluid my-4 card-info-section">
    <div className="row">
        <div className="col-md-3">
            <div className="card border-primary">
                <div className="card-body bg-white shadow rounded">
                    <h4 className="d-between-middle mb-3">
                        <span>Admin</span>
                    </h4>
                    <div className="d-flex align-items-center">
                        <span className="icon d-middle"><i className="bi bi-people"></i></span>
                        <h2 className="mx-2">
                            00
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-primary">
                <div className="card-body bg-white shadow rounded">
                    <h4 className="d-between-middle mb-3">
                        <span>User</span>
                    </h4>
                    <div className="d-flex align-items-center">
                        <span className="icon d-middle"><i className="bi bi-people"></i></span>
                        <h2 className="mx-2">
                            00
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-primary">
                <div className="card-body bg-white shadow rounded">
                    <h4 className="d-between-middle mb-3">
                        <span>Offer</span>
                    </h4>
                    <div className="d-flex align-items-center">
                        <span className="icon d-middle"><i className="bi bi-archive"></i></span>
                        <h2 className="mx-2">
                            00
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-primary">
                <div className="card-body bg-white shadow rounded">
                    <h4 className="d-between-middle mb-3">
                        <span>Notice</span>
                    </h4>
                    <div className="d-flex align-items-center">
                        <span className="icon d-middle"><i className="bi bi-bag-plus"></i></span>
                        <h2 className="mx-2">
                            00
                        </h2>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</div>
  );
};

export default Dashboard;
