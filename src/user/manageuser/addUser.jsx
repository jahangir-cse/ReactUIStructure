import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../redux/actions/accountActions";
import BackHeader from "../header/backHeader";

const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(state => state.authStore.accessToken);

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken, navigate]);

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

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(formData));
        resetForm();
        navigate('/');
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            name: "",
            mobileNumber: "",
            password: "",
            nid: "",
            address: "",
            level: "Basic",
            pin: "",
            referencedBy: null
        });
    };

    // Render a form field dynamically
    const renderFormField = (label, name, type = "text", placeholder = "") => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="form-control"
                placeholder={placeholder}
                required
            />
        </div>
    );

    const handleBack = () => {
        navigate(-1);
    };

    // Modal body form structure
    const modalBody = (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    {renderFormField("Name", "name", "text", "Enter your name")}
                    {renderFormField("Mobile Number", "mobileNumber", "text", "Enter your mobile number")}
                    {renderFormField("Password", "password", "password", "Enter your password")}
                    {renderFormField("NID", "nid", "text", "Enter your NID")}
                    {renderFormField("Address", "address", "text", "Enter your address")}
                    {renderFormField("Level", "level", "text", "Enter your level")}
                    {renderFormField("Pin", "pin", "text", "Enter your pin")}
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">Save User</button>
            </div>
        </form>
    );

    return (
        <div className="container py-3">
            <BackHeader handleBack={handleBack} title="Add New User" />

            <div className="card">
                <div className="card-body">
                    {modalBody}
                </div>
            </div>
        </div>
    );
};

export default AddUser;