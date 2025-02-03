import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getByIdUser } from "../../redux/actions/accountActions";
import BackHeader from "../header/backHeader";
import { useNavigate } from "react-router-dom";

const UpdatePassword = ({ accountId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.authStore.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const [formData, setFormData] = useState({
    password: "",
  });

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const response = await dispatch(getByIdUser(accountId));
        if (response && response.data) {
          const accountData = response.data;
          setFormData({
            password: "",
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
              <label htmlFor="password" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter old password.."
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newpassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newpassword"
                name="newpassword"
                placeholder="Enter new password.."
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newconfirmpassword" className="form-label">
                New Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newconfirmpassword"
                name="newconfirmpassword"
                placeholder="Enter new confirm password.."
                value={formData.newConfirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;