import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinancialEntities, createFinancialEntity, updateFinancialEntity, deleteFinancialEntity } from "../../redux/actions/financialEntityActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const FinancialEntity = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.financialEntities.items);
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        type: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        dispatch(fetchFinancialEntities()); // Fetch financial entities when the component loads
    }, [dispatch]);

    // Handle form change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateFinancialEntity(selectedItemId, formData));
        } else {
            dispatch(createFinancialEntity(formData));
        }
        resetForm();
        setModalShow(false);
    };

    // Edit financial entity
    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
        setSelectedItemId(item.id); // Assuming id is the identifier
        setModalShow(true);
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: 0,
            name: "",
            type: ""
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
        { header: "Account Number", accessor: "accountNumber" },
        { header: "Type", accessor: "type" },
        { header: "ImageUrl", accessor: "imageUrl" },
        { header: "Remarks", accessor: "remarks" },
        { header: "Created At", accessor: "createdAt" },
        { header: "Updated At", accessor: "updatedAt" },
        { header: "Created By", accessor: "createdBy" },
        { header: "Updated By", accessor: "updatedBy" }
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
            onClick: (item) => dispatch(deleteFinancialEntity(item.id))
        }
    ];

    const data = items.map((item, index) => ({
        ...item,
        index: index + 1
    }));

    const modalBody = (
        <form onSubmit={handleSubmit}>
            {renderFormField("Name", "name")}
            {renderFormField("Type", "type")}
            {renderFormField("Account Number", "accountNumber")}
            {renderFormField("Image Url", "imageUrl")}
            {renderFormField("Remarks", "remarks")}
            <button type="submit" className="btn btn-primary">{isEditing ? "Update Item" : "Save Item"}</button>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Financial</h3>
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

export default FinancialEntity;