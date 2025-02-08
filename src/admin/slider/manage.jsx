import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { fetchSliders, createSlider, updateSlider, deleteSlider } from "../../redux/actions/sliderActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const ManageSlider = () => {
    const dispatch = useDispatch();
    const sliders = useSelector(state => state?.sliders?.items || []);
    const user = useSelector((state) => state.users.user);
    useEffect(() => {
        //console.log("User:", user);
    }, [user]);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        link: "",
        image: "",
        order: "",
        createdDate: "",
        modificationDate: "",
        createdBy: user.email,
        modifyBy: user.email,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState("");
    const [errorClass, setErrorClass] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setErrorClass("");
        try {
            let payload = { ...formData };
            if (!isEditing) {
                payload.order = 1;
                payload.createdBy = user.email;
                delete payload.id;
            } else {
                payload.id = Number(payload.id) || 0;
            }
    
            let response = await dispatch(isEditing ? updateSlider(payload) : createSlider(payload));
    
            if (response.flag) {
                setError(response.message);
                setErrorClass("alert-success");
                resetForm();
                setModalShow(false);
                dispatch(fetchSliders());
            } else {
                setError(response.message || "Something went wrong. Please try again.");
                setErrorClass("alert-danger");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            setErrorClass("alert-danger");
        }
    };    

    const handleEdit = (item) => {
        setFormData({
            id: item.Id || "",
            name: item.Name || "",
            link: item.Link || "",
            image: item.Image || "",
            order: item.Order || "",
            modifyBy: user.email || "",
        });
        setIsEditing(true);
        setModalType("edit");
        setModalShow(true);
    };    

    const handleDeleteConfirmation = (id) => {
        setSelectedId(id);
        setModalType("delete");
        setModalShow(true);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setError("");
        setErrorClass("");
        try {
            let response = await dispatch(deleteSlider(selectedId));
            if (response.flag) {
                setError(response.message);
                setErrorClass("alert-success");
                setModalShow(false);
                dispatch(fetchSliders());
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
        setFormData({ id: "", order: "", name: "", link: "", image: "" });
        setError("");
        setErrorClass("");
    };

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Order", accessor: "Order" },
        { header: "Name", accessor: "Name" },
        { header: "Link", accessor: "Link" },
        { header: "Image", accessor: "Image", type: "img" },
        { header: "Created Date", accessor: "CreatedDate", type: "date" },
        { header: "Modification Date", accessor: "ModificationDate", type: "date" },
        { header: "Created By", accessor: "CreatedBy" },
        { header: "Modify By", accessor: "ModifyBy" },
        { header: "Status", accessor: "Status" }
    ];

    const actions = [
        {
            label: <i className='bi bi-pencil text-white'></i>,
            className: "btn-primary",
            onClick: handleEdit
        },
        {
            label: <i className='bi bi-trash'></i>,
            className: "btn-danger",
            onClick: (item) => handleDeleteConfirmation(item.Id)
        }
    ];
    console.log('sliders',sliders);
    let data = [];
    if (Array.isArray(sliders)) {
        data = sliders.map((item, index) => ({
            ...item,
            index: index + 1
        }));
    } else {
        console.error('Items is not an array');
    }

    const renderFormField = (label, name, placeholder, type = "text") => (
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

    const modalBody = (
        <form onSubmit={handleSubmit}>
            {error && <div className={`alert ${errorClass}`}>{error}</div>}
            {renderFormField("Name", "name","Enter name..")}
            {renderFormField("Link", "link", "Enter link..")}
            {renderFormField("Image", "image","Enter image..")}
            {isEditing && renderFormField("Order", "order", "Enter order...")}
            <button type="submit" className="btn btn-primary">{isEditing ? "Update Item" : "Save Item"}</button>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Manage Sliders</h3>
                    <button className="btn btn-outline-primary" onClick={() => { resetForm(); setModalType("create"); setModalShow(true); }}>
                        Add Slider
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
                title={modalType === "edit" ? "Edit Slider" : modalType === "create" ? "Add Slider" : "Delete Confirmation"}
                body={modalType === "edit" ? 
                        modalBody
                    : 
                    modalType === "create" ?
                        modalBody
                        :
                        <div>
                            <h3 className="text-danger">Are you sure you want to delete this item?</h3>
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

export default ManageSlider;