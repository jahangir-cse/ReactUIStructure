import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers, createOffers, updateOffers, deleteOffers } from "../../redux/actions/offerActions";
import { fetchOperatorEntities } from "../../redux/actions/financialEntityActions";
import { fetchBundleTypes } from "../../redux/actions/bundleTypeActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageOffer = () => {
    const dispatch = useDispatch();
    const offers = useSelector(state => state.offers.items);
    const operatorEntities = useSelector(state => state.financialEntities.items);
    const bundleTypes = useSelector(state => state.bundleTypes.items);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        discount: 0,
        validityInHours: 0,
        imageUrl: "",
        offerType: "",
        bundleTypeId: "",
        processType: "",
        rank: 0,
        expiredAt: new Date(),
        code: "",
        remarks: "",
        rawText: "",
        financialEntityId: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const processType = ["Auto", "Manual"];
    const offerType = ["Drive", "Regular"];

    useEffect(() => {
        dispatch(fetchOffers());
        dispatch(fetchOperatorEntities());
        dispatch(fetchBundleTypes());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (selectedDate) => {
        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            const updatedDate = new Date(selectedDate).toISOString();
            setFormData(prev => ({
                ...prev,
                expiredAt: updatedDate
            }));
        } else {
            console.error("Invalid date selected");
        }
    };             

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isEditing) {
            dispatch(updateOffers(selectedOfferId, formData));
        } else {
            dispatch(createOffers(formData));
        }
        resetForm();
        setModalShow(false);
    };    

    const handleEdit = (offer) => {
        setFormData({
            ...offer,
            expiredAt: offer.expiredAt ? new Date(offer.expiredAt) : null 
        });
        setIsEditing(true);
        setSelectedOfferId(offer.id);
        setModalShow(true);
    };    

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: 0,
            discount: 0,
            validityInHours: 0,
            imageUrl: "",
            offerType: "",
            bundleTypeId: "",
            processType: "",
            rank: 0,
            expiredAt: new Date(),
            code: "",
            remarks: "",
            rawText: "",
            financialEntityId: ""
        });
        setIsEditing(false);
        setSelectedOfferId(null);
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

    const renderSelectField = (label, name, options) => (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Title", accessor: "title" },
        { header: "Description", accessor: "description" },
        { header: "Price", accessor: "price" },
        { header: "Discount", accessor: "discount" },
        { header: "Validity In Hours", accessor: "validityInHours" },
        { header: "ImageUrl", accessor: "imageUrl" },
        { header: "OfferType", accessor: "offerType" },
        { header: "BundleType", accessor: "bundleType" },
        { header: "ProcessType", accessor: "processType" },
        { header: "Rank", accessor: "rank" },
        { header: "ExpiredAt", accessor: "expiredAt" },
        { header: "Code", accessor: "code" },
        { header: "Remarks", accessor: "remarks" },
        { header: "FinancialEntityId", accessor: "financialEntityId" }
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
            onClick: (offer) => dispatch(deleteOffers(offer.id))
        }
    ];

    const data = offers.map((offer, index) => ({
        ...offer,
        index: index + 1
    }));

    const modalBody = (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    {renderFormField("Title", "title")}
                    {renderFormField("Description", "description")}
                    {renderFormField("Price", "price", "number")}
                    {renderFormField("Discount", "discount", "number")}
                    {renderFormField("Validity In Hours", "validityInHours", "number")}
                    {renderFormField("Rank", "rank", "number")}
                    <div className="mb-3">
                        <label className="form-label">Expired At</label>
                        <DatePicker
                            selected={formData.expiredAt ? new Date(formData.expiredAt) : null}
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                            className="form-control"
                        />
                    </div>
                    {renderFormField("Code", "code")}
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Remarks</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="form-control" required></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Raw Text</label>
                        <textarea name="rawText" value={formData.rawText} onChange={handleChange} className="form-control"></textarea>
                    </div>
                    {renderFormField("Image", "imageUrl")}
                    {renderSelectField("Offer Type", "offerType", offerType)}
                    <div className="mb-3">
                        <label className="form-label">Bundle Type</label>
                        <select className="form-select" name="bundleTypeId" value={formData.bundleTypeId} onChange={handleChange}>
                            <option value="">Select Bundle Type</option>
                            {bundleTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {renderSelectField("Process Type", "processType", processType)}
                    <div className="mb-3">
                        <label className="form-label">Financial Entity</label>
                        <select className="form-select" name="financialEntityId" value={formData.financialEntityId} onChange={handleChange}>
                            <option value="">Select Financial Entity</option>
                            {operatorEntities.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">{isEditing ? "Update Offer" : "Save Offer"}</button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Offer</h3>
                    <button className="btn btn-outline-primary" onClick={() => { resetForm(); setModalShow(true); }}>
                        Add Offer
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
                title={isEditing ? "Edit Offer" : "Add Offer"}
                body={modalBody}
                size="lg"
            />
        </div>
    );
};

export default ManageOffer;