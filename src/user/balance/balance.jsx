import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankEntities } from "../../redux/actions/financialEntityActions";
import { addBalance } from "../../redux/actions/transactionActions";
import { useNavigate } from "react-router-dom";
import BackHeader from "../header/backHeader";

const Balance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bankEntities = useSelector(state => state.financialEntities.items);
    const accessToken = useSelector(state => state.authStore.accessToken);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        amount: '',
        financialEntityId: '',
        transactionId: ''
    });

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            dispatch(fetchBankEntities());
        }
    }, [dispatch, accessToken, navigate]);

    const handleSelectFinancialEntity = (id) => {
        setFormData(prev => ({ ...prev, financialEntityId: id }));
        setStep(2);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBalance(formData));
        setFormData({
            amount: '',
            financialEntityId: '',
            transactionId: ''
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

    const renderFormField = (label, name, type = "text", placeholder = "") => (
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

    return (
        <div className={`container recharge-section py-4 ${step >= 1 ? 'active' : ''}`}>
            <BackHeader handleBack={handleBack} title="Add Balance" />
            <div className="container w-100">
                {step === 1 && (
                    <>
                        <div className="row mt-3">
                            {bankEntities.map((item) => (
                                <div key={item.id} className="col-sm-2 col-4 d-flex">
                                    <div className="card border-0 pointer" onClick={() => handleSelectFinancialEntity(item.id)}>
                                        <div className="card-body bg-light text-center rounded">
                                            {item.logoUrl ? (
                                                <img className="img-fluid" src={item.logoUrl} alt={item.name} />
                                            ) : (
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="mt-3">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        {renderFormField("Amount", "amount", "number", "Enter amount")}
                                        {renderFormField("Transaction ID", "transactionId", "text", "Enter transaction ID")}
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

export default Balance;
