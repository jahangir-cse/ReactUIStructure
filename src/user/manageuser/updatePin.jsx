import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getByIdUser } from "../../redux/actions/accountActions";
import BackHeader from "../header/backHeader";
import { useNavigate } from "react-router-dom";

const UpdatePin = ({ accountId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.authStore.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  const [formData, setFormData] = useState({
    pin: "",
  });

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const response = await dispatch(getByIdUser(accountId));
        if (response && response.data) {
          const accountData = response.data;
          setFormData({
            pin: accountData.pin || "",
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
              <label htmlFor="pin" className="form-label">
                Old Pin
              </label>
              <input
                type="text"
                className="form-control"
                id="oldpin"
                name="oldpin"
                placeholder="Enter old pin.."
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newpin" className="form-label">
                New Pin
              </label>
              <input
                type="text"
                className="form-control"
                id="newpin"
                name="newpin"
                placeholder="Enter new pin.."
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newconfirmpin" className="form-label">
                New Confirm Pin
              </label>
              <input
                type="text"
                className="form-control"
                id="newconfirmpin"
                name="newconfirmpin"
                placeholder="Enter confirm new pin.."
                value={formData.pin}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update Pin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePin;