import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../redux/actions/accountActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const ManageUser = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.accounts.items);
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
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalShow, setModalShow] = useState(false);

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
        setIsEditing(false);
        setSelectedUserId(null);
    };

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

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Name", accessor: "name" },
        { header: "Mobile Number", accessor: "mobileNumber" },
        { header: "Nid", accessor: "nid" },
        { header: "Address", accessor: "address" },
        { header: "Referenced By", accessor: "referencedBy" }
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

    const data = Array.isArray(users) ? users.map((item, index) => ({
        ...item,
        index: index + 1
    })) : [];

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
                <button type="submit" className="btn btn-primary">{isEditing ? "Update User" : "Save User"}</button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">User</h3>
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
