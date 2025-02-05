import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../redux/actions/userActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const ManageUser = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.items);
    const [formData, setFormData] = useState({
        fullName: "",
        mobilePhone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    // const [message, setMessage] = useState("");
    // const [error, setError] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateUser(selectedUserId, formData));
        } else {
            dispatch(createUser(formData));
        }
        resetForm();
        setModalShow(false);
    };

    const handleEdit = (user) => {
        setFormData(user);
        setIsEditing(true);
        setSelectedUserId(user.id);
        setModalShow(true);
    };

    const resetForm = () => {
        setFormData({ fullName: "", mobilePhone: "", email: "", password: "", confirmPassword: ""});
        setIsEditing(false);
        setSelectedUserId(null);
    };

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Name", accessor: "name" },
        { header: "Mobile Phone", accessor: "mobilePhone" },
        { header: "Email", accessor: "email" }
    ];

    const actions = [
        {
            label: "Edit",
            className: "btn-warning",
            onClick: handleEdit
        },
        {
            label: "Delete",
            className: "btn-danger",
            onClick: (user) => dispatch(deleteUser(user.id))
        }
    ];

    const data = users.map((user, index) => ({
        ...user,
        index: index + 1
    }));

    console.log('data', data);

    const modalBody = (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
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
                <button type="submit" className="btn btn-primary">{isEditing ? "Update User" : "Save User"}</button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Manage Users</h3>
                    <button className="btn btn-outline-primary" onClick={() => { resetForm(); setModalShow(true); }}>
                        Add User
                    </button>
                </div>
                <div className="card-body">
                    <CommonTable columns={columns} data={data} actions={actions} />
                </div>
            </div>

            {/* Common Modal */}
            <CommonModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
                title={isEditing ? "Edit User" : "Add User"}
                body={modalBody}
                size="lg"
            />
        </div>
    );
};

export default ManageUser;
