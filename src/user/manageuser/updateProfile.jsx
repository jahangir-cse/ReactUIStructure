import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getByIdUser } from "../../redux/actions/accountActions";
import BackHeader from "../header/backHeader";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ accountId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.authStore.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    mobileNumber: "",
    nid: "",
    address: "",
    level: "Premium",
    pin: "",
    referencedBy: null,
  });

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const response = await dispatch(getByIdUser(accountId));
        if (response && response.data) {
          const accountData = response.data;
          setFormData({
            userName: accountData.userName || "",
            password: "",
            name: accountData.name || "",
            mobileNumber: accountData.mobileNumber || "",
            nid: accountData.nid || "",
            address: accountData.address || "",
            level: accountData.level || "Premium",
            pin: accountData.pin || "",
            referencedBy: accountData.referencedBy || null,
          });
        }
      } catch (error) {
        console.error("Failed to load account data:", error);
      }
    };

    if (accountId) {
      loadAccountData();
    }
  }, [accountId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(accountId, formData));
    console.log("Updated data: ", formData);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container profile-section py-3">
      <BackHeader handleBack={handleBack} title="Update Profile" />
      <div className="card border-0">
        <div className="card-body rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nid" className="form-label">
                NID
              </label>
              <input
                type="text"
                className="form-control"
                id="nid"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="level" className="form-label">
                Level
              </label>
              <select
                className="form-select"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="pin" className="form-label">
                Pin
              </label>
              <input
                type="text"
                className="form-control"
                id="pin"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;