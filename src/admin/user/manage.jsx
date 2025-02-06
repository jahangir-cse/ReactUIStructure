import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { fetchUsers, fetchRoles, createUser, updateUser, deleteUser } from "../../redux/actions/userActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";
import EditUserForm from "./editUserForm";
import CreateUserForm from "./createUserForm";

const ManageUser = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state?.users?.items || []);
    const roles = useSelector(state => state?.users?.roles || []);

    const [formData, setFormData] = useState({
        userId: "",
        fullName: "",
        mobilePhone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [editFormData, setEditFormData] = useState({
        userId: "",
        name: "",
        mobilePhone: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [modalType, setModalType] = useState(""); // "create" or "edit"
    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState("");
    const [errorClass, setErrorClass] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchRoles());
    }, [dispatch]);

    const handleChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e, isEditing) => {
        e.preventDefault();
        setError("");
        setErrorClass("");
        try {
            let response;
            if (isEditing) {
                response = await dispatch(updateUser(editFormData));
            } else {
                response = await dispatch(createUser(formData));
            }

            if (response.flag) {
                setError(response.message);
                setErrorClass("alert-success");
                resetForm();
                setModalShow(false);
                dispatch(fetchUsers());
            } else {
                setError(response.message || "Something went wrong. Please try again.");
                setErrorClass("alert-danger");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            setErrorClass("alert-danger");
        }
    };

    const handleEdit = (user) => {
        setEditFormData({
            userId: user.userId,
            name: user.name,
            mobilePhone: user.mobilePhone,
            email: user.email,
            password: "",
            confirmPassword: "",
            role: user.role,
        });
        setModalType("edit");
        setModalShow(true);
    };

    const handleDeleteConfirmation = (userId) => {
        setSelectedUserId(userId);
        setModalType("delete");
        setModalShow(true);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setError("");
        setErrorClass("");
        try {
            let response = await dispatch(deleteUser(selectedUserId));
            if (response.flag) {
                setError(response.message);
                setErrorClass("alert-success");
                setModalShow(false);
                dispatch(fetchUsers());
            } else {
                setError(response.message || "Something went wrong. Please try again.");
                setErrorClass("alert-danger");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            setErrorClass("alert-danger");
        }
    };

    const resetForm = () => {
        setFormData({ userId: "", fullName: "", mobilePhone: "", email: "", password: "", confirmPassword: "" });
        setEditFormData({ userId: "", name: "", mobilePhone: "", email: "", password: "", confirmPassword: "", role: "" });
        setError("");
        setErrorClass("");
    };

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Name", accessor: "name" },
        { header: "Mobile Phone", accessor: "mobilePhone" },
        { header: "Email", accessor: "email" },
        { header: "Role", accessor: "role" }
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
            onClick: (user) => handleDeleteConfirmation(user.userId)
        }
    ];

    const data = users.map((user, index) => ({
        ...user,
        index: index + 1
    }));

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Manage Users</h3>
                    <button className="btn btn-outline-primary" onClick={() => { resetForm(); setModalType("create"); setModalShow(true); }}>
                        Add User
                    </button>
                </div>
                <div className="card-body">
                    <CommonTable columns={columns} data={data} actions={actions} />
                </div>
            </div>

            {/* Common Modal with Conditional Forms */}
            <CommonModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
                title={modalType === "edit" ? "Edit User" : modalType === "create" ? "Add User" : "Delete Confirmation"}
                body={modalType === "edit" ? 
                    <EditUserForm editFormData={editFormData} handleChange={handleChange} handleSubmit={handleSubmit} error={error} errorClass={errorClass} roles={roles} /> 
                    : 
                    modalType === "create" ?
                        <CreateUserForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} error={error} errorClass={errorClass} /> 
                        :
                        <div>
                            <h3 className="text-danger">Are you sure you want to delete this user?</h3>
                        </div>
                }
                footer={
                    modalType === "delete" ? (
                        <>
                            <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        </>
                    ) : (
                        <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                    )
                }
                size="lg"
            />
        </div>
    );
};

export default ManageUser;