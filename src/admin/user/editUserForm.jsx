import React from "react";

const EditUserForm = ({ editFormData, handleChange, handleSubmit, error, errorClass, roles }) => {
    const selectedRole = roles.find(role => role.name === editFormData.role);
    return (
        <form onSubmit={(e) => handleSubmit(e, true)}>
            {error && <div className={`alert ${errorClass}`}>{error}</div>}
            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="number" name="mobilePhone" value={editFormData.mobilePhone} className="form-control"  required disabled />
            </div>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={editFormData.name} onChange={(e) => handleChange(e, true)} className="form-control" placeholder="Enter name.." required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={editFormData.email} onChange={(e) => handleChange(e, true)} className="form-control" placeholder="Enter email.." />
            </div>
            <div className="mb-3">
                <label className="form-label">Role</label>
                <select className="form-select" name="role" value={selectedRole ? selectedRole.id : ''} onChange={(e) => handleChange(e, true)}>
                    <option value="">Select Role</option>
                    {roles.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">Update User</button>
            </div>
        </form>
    );
};

export default EditUserForm;
