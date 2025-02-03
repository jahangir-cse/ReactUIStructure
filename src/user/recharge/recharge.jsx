import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rechargeTransaction } from "../../redux/actions/transactionActions";
import { fetchOperatorEntities } from "../../redux/actions/financialEntityActions";
import BackHeader from "../header/backHeader";

const Recharge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const operatorEntities = useSelector(state => state.financialEntities.items);
  const accessToken = useSelector(state => state.authStore.accessToken);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    financialEntityId: '',
    mobileNo: '',
    pin: ''
  });
  const [showOperatorsDropdown, setShowOperatorsDropdown] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    } else {
      dispatch(fetchOperatorEntities());
    }
  }, [dispatch, accessToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'mobileNo' && value.length >= 3) {
      const prefix = value.substring(0, 3);
      const matchedOperator = operatorEntities.find(operator =>
        operator.accountNumber.startsWith(prefix)
      );

      if (matchedOperator) {
        setFormData(prev => ({
          ...prev,
          financialEntityId: matchedOperator.id
        }));
        setSelectedOperator(matchedOperator);
      } else {
        setFormData(prev => ({
          ...prev,
          financialEntityId: ''
        }));
        setSelectedOperator(null);
      }
    }
  };

  const handleOperatorSelect = (operator) => {
    setFormData(prev => ({
      ...prev,
      financialEntityId: operator.id
    }));
    setSelectedOperator(operator);
    setShowOperatorsDropdown(false);
  };

  const handleRechargeClick = () => {
    if (formData.mobileNo && formData.amount) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(rechargeTransaction(formData));
    setFormData({
      amount: '',
      financialEntityId: '',
      mobileNo: '',
      pin: ''
    });
    navigate('/');
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep(prevStep => prevStep - 1);
    }
  };

  return (
    <div className={`container recharge-section py-4 ${step >= 1 ? 'active' : ''}`}>
      <BackHeader handleBack={handleBack} title="Recharge" />
      <div className="container w-100">
        {step === 1 && (
          <>
            <div className="mt-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <label className="form-label">Mobile Number</label>
                    <div className="d-flex">
                      <div className="mb-3 w-100">
                        <input
                          type="text"
                          name="mobileNo"
                          value={formData.mobileNo}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter mobile number"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <div
                          className="custom-dropdown border rounded py-1 px-2 bg-white d-middle"
                          onClick={() => setShowOperatorsDropdown(!showOperatorsDropdown)}
                        >
                          {selectedOperator ? (
                            selectedOperator.logoUrl ? (
                              <img
                                src={selectedOperator.logoUrl}
                                alt={selectedOperator.name}
                                className="img-fluid rounded-circle"
                                style={{ width: "30px", height: "30px" }}
                              />
                            ) : (
                              <span>{selectedOperator.name}</span>
                            )
                          ) : (
                            <span>Operator</span>
                          )}
                        </div>
                        {showOperatorsDropdown && (
                          <div className="dropdown-menu show">
                            {operatorEntities.map((operator) => (
                              <div
                                key={operator.id}
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => handleOperatorSelect(operator)}
                              >
                                {operator.logoUrl ? (
                                  <img
                                    src={operator.logoUrl}
                                    alt={operator.name}
                                    className="img-fluid rounded-circle"
                                    style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                  />
                                ) : (
                                  <span>{operator.name}</span>
                                )}
                                <span>{operator.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-primary" onClick={handleRechargeClick}>Next</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mt-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <div className="d-between-middle bg-white p-2 rounded mb-2">
                      <div>{formData.mobileNo}</div>
                      <div className="">Tk. {formData.amount}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Pin</label>
                      <input
                        type="number"
                        name="pin"
                        value={formData.pin}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter pin.."
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recharge;
