import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBundleTypes, createBundleType, updateBundleType, deleteBundleType } from "../../redux/actions/bundleTypeActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const ManageBundleType = () => {
    const dispatch = useDispatch();
    const bundleTypes = useSelector(state => state.bundleTypes?.items || []);
    const [formData, setFormData] = useState({
        id: 0,
        name: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        dispatch(fetchBundleTypes());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateBundleType(selectedItemId, formData));
        } else {
            dispatch(createBundleType(formData));
        }
        resetForm();
        setModalShow(false);
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
        setSelectedItemId(item.id);
        setModalShow(true);
    };

    const resetForm = () => {
        setFormData({
            id: 0,
            name: ""
        });
        setIsEditing(false);
        setSelectedItemId(null);
    };

    const renderFormField = (label, name, type = "text") => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="form-control"
                required
            />
        </div>
    );

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Id", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Created By", accessor: "createdBy" },
        { header: "Created Date", accessor: "createdAt" },
        { header: "Updated By", accessor: "updatedBy" },
        { header: "Updated Date", accessor: "updatedAt" },
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
            onClick: (item) => dispatch(deleteBundleType(item.id))
        }
    ];

    const data = bundleTypes.map((item, index) => ({
        ...item,
        index: index + 1
    }));

    const modalBody = (
        <form onSubmit={handleSubmit}>
            {renderFormField("Name", "name")}
            <button type="submit" className="btn btn-primary">{isEditing ? "Update Item" : "Save Item"}</button>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Bundle Type</h3>
                    <button className="btn btn-outline-primary" onClick={() => { resetForm(); setModalShow(true); }}>
                        Add Item
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
                title={isEditing ? "Edit Item" : "Add Item"}
                body={modalBody}
                size="md"
            />
        </div>
    );
};

export default ManageBundleType;