import React from "react";

const CreateUserForm = ({ formData, handleChange, handleSubmit, error, errorClass }) => {
    return (
        <form onSubmit={(e) => handleSubmit(e, false)}>
            {error && <div className={`alert ${errorClass}`}>{error}</div>}
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="number" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" required />
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">Save User</button>
            </div>
        </form>
    );
};

export default CreateUserForm;
