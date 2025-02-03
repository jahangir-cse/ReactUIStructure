import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices, createNotice, updateNotice, deleteNotice } from "../../redux/actions/noticeActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const ManageNotice = () => {
    const dispatch = useDispatch();
    const notices = useSelector(state => state.notices.items);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        noticeType: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        dispatch(fetchNotices());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateNotice(selectedNoticeId, formData));
        } else {
            dispatch(createNotice(formData));
        }
        resetForm();
        setModalShow(false);
    };

    const handleEdit = (notice) => {
        setFormData(notice);
        setIsEditing(true);
        setSelectedNoticeId(notice.id);
        setModalShow(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            noticeType: ""
        });
        setIsEditing(false);
        setSelectedNoticeId(null);
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
        { header: "Title", accessor: "title" },
        { header: "Description", accessor: "description" },
        { header: "Notice Type", accessor: "noticeType" }
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
            onClick: (notice) => dispatch(deleteNotice(notice.id))
        }
    ];

    const data = notices.map((notice, index) => ({
        ...notice,
        index: index + 1
    }));

    const modalBody = (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    {renderFormField("Title", "title")}
                    {renderFormField("Description", "description")}
                    {renderFormField("Notice Type", "noticeType")}
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">{isEditing ? "Update Notice" : "Save Notice"}</button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Notice</h3>
                    <button className="btn btn-outline-primary" onClick={() => { resetForm(); setModalShow(true); }}>
                        Add Notice
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
                title={isEditing ? "Edit Notice" : "Add Notice"}
                body={modalBody}
                size="lg"
            />
        </div>
    );
};

export default ManageNotice;
