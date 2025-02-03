import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import Redux dispatch
import { createUser } from "../../redux/actions/accountActions"; // Import the createAccount action
import "./register.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        mobileNumber: "",
        password: "",
        nid: "",
        address: "",
        level: "Basic",
        pin: "",
        referencedBy: null
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        dispatch(createUser(formData))
            .then(() => {
                setSuccess("Registration successful! Redirecting...");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((err) => {
                console.error("Error during registration:", err);
                setError("Failed to register. Please try again.");
            });
    };

    return (
        <div className="container register-section d-middle">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Register</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Enter your mobile number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nid" className="form-label">NID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nid"
                                name="nid"
                                placeholder="Enter your NID"
                                value={formData.nid}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pin" className="form-label">Pin</label>
                            <input
                                type="password"
                                className="form-control"
                                id="pin"
                                name="pin"
                                placeholder="Enter a 4-digit pin"
                                value={formData.pin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <div className="link-group">
                            <Link to="/login" className="link-item d-block">Login</Link>
                            <Link to="/" className="link-item d-block">Back to home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;