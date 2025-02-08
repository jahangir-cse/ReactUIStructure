import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { fetchMedias, createMedia, deleteMedia } from "../../redux/actions/mediaActions";
import CommonModal from "../../Component/CommonModal";
import CommonTable from "../../Component/CommonTable";

const ManageMedia = () => {
    const dispatch = useDispatch();
    const medias = useSelector(state => state?.medias?.items || []);
    const user = useSelector((state) => state.users.user);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [error, setError] = useState("");
    const [errorClass, setErrorClass] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        dispatch(fetchMedias());
    }, [dispatch]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
    
        if (!selectedFile) {
            setError("Please select a file first.");
            return;
        }
    
        const formDataData = {
            file: selectedFile,
            order: 1,
            createdBy: user.email,
        };
    
        let response = await dispatch(createMedia(formDataData));
    
        if (response.success) {
            setError("Upload successful!");
            setErrorClass("alert-success");
            setModalShow(false);
            dispatch(fetchMedias()); // Refresh media list
        } else {
            setError(response.message || "Upload failed.");
            setErrorClass("alert-danger");
        }
    };    

    const handleDeleteConfirmation = (id) => {
        setSelectedId(id);
        setModalType("delete");
        setModalShow(true);
    };

    const handleDelete = async () => {
        setError("");
        setErrorClass("");
        try {
            let response = await dispatch(deleteMedia(selectedId));
            if (response.flag) {
                setError(response.message);
                setErrorClass("alert-success");
                setModalShow(false);
                dispatch(fetchMedias());
            } else {
                setError(response.message || "Something went wrong. Please try again.");
                setErrorClass("alert-danger");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            setErrorClass("alert-danger");
        }
    };

    const columns = [
        { header: "SI", accessor: "index" },
        { header: "Order", accessor: "Order" },
        { header: "Name", accessor: "Name" },
        { header: "Path", accessor: "Path", type: "img" },
        { header: "Created Date", accessor: "CreatedDate", type: "date" },
        { header: "Modification Date", accessor: "ModificationDate", type: "date" },
        { header: "Created By", accessor: "CreatedBy" },
        { header: "Modify By", accessor: "ModifyBy" },
        { header: "Status", accessor: "Status" }
    ];

    const actions = [
        {
            label: <i className='bi bi-trash'></i>,
            className: "btn-danger",
            onClick: (item) => handleDeleteConfirmation(item.id)
        }
    ];

    let data = Array.isArray(medias) ? medias.map((item, index) => ({ ...item, index: index + 1 })) : [];

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-header d-between-middle">
                    <h3 className="mb-0">Manage Files</h3>
                    <div>
                        <input type="file" multiple onChange={handleFileChange} />
                        <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
                        {uploadStatus && <p className={errorClass}>{uploadStatus}</p>}
                    </div>
                </div>
                <div className="card-body">
                    <CommonTable columns={columns} data={data} actions={actions} />
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <CommonModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
                title="Delete Confirmation"
                body={<h3 className="text-danger">Are you sure you want to delete this item?</h3>}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </>
                }
                size="lg"
            />
        </div>
    );
};

export default ManageMedia;