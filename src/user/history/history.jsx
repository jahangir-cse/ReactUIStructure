import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/actions/transactionActions";
import { useNavigate } from "react-router-dom";
import BackHeader from "../header/backHeader";
import InfiniteScroll from "../../Component/InfiniteScroll";

const History = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transactions = useSelector(state => state.transaction.items.items);
    const accessToken = useSelector(state => state.authStore.accessToken);

    const [filterPurposeType, setFilterPurposeType] = useState("All");

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            dispatch(fetchTransactions());
        }
    }, [dispatch, accessToken, navigate]);

    const filteredTransactions = Array.isArray(transactions)
        ? transactions.filter(transaction =>
            filterPurposeType === "All" || transaction.purposeType === filterPurposeType
        )
        : [];

    const handleFilterChange = (purposeType) => {
        setFilterPurposeType(purposeType);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container history-section py-3">
            <BackHeader handleBack={handleBack} title="History" />
            <div className="card">
                <div className="card-body">
                    <div className="mb-3 gap-2 flex-wrap d-middle">
                        <button
                            className={`btn ${filterPurposeType === "All" ? "btn-danger" : "btn-outline-danger"}`}
                            onClick={() => handleFilterChange("All")}
                        >
                            All
                        </button>
                        <button
                            className={`btn ${filterPurposeType === "RegularOffer" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => handleFilterChange("RegularOffer")}
                        >
                            Regular Offer
                        </button>
                        <button
                            className={`btn ${filterPurposeType === "Drive" ? "btn-secondary" : "btn-outline-secondary"}`}
                            onClick={() => handleFilterChange("Drive")}
                        >
                            Drive Offer
                        </button>
                        <button
                            className={`btn ${filterPurposeType === "Recharge" ? "btn-info" : "btn-outline-info"}`}
                            onClick={() => handleFilterChange("Recharge")}
                        >
                            Recharge
                        </button>
                        <button
                            className={`btn ${filterPurposeType === "AddBalance" ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={() => handleFilterChange("AddBalance")}
                        >
                            Add Balance
                        </button>
                    </div>
                    <hr />
                    {filteredTransactions.length > 0 ? (
                        <InfiniteScroll
                            items={filteredTransactions}
                            initialLoad={5}
                            loadMoreCount={5}
                            renderItem={(item) => (
                                <div className="col-md-4" key={item.transactionId}>
                                    <div className="card h-100">
                                        <div className="card-body d-between-middle">
                                            <div className="account-info">
                                                <h6 className="card-text">Type: {item.purposeType}</h6>
                                                <h6 className="card-text">Account: {item.accountNo === '' ? 'Self' : item.accountNo}</h6>
                                                <h6 className="card-text"><strong>Trans ID:</strong> {item.transactionId}</h6>
                                            </div>
                                            <div className="amount text-right">
                                                {item.type === 10 ? (
                                                    <span className="text-danger">- {item.amount} Tk.</span>
                                                ) : item.type === 20 ? (
                                                    <span className="text-warning">+ {item.amount} Tk.</span>
                                                ) : (
                                                            <span className="text-success">{item.amount} Tk.</span>
                                                )}
                                                <span className="d-block">Charge: 00 Tk</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    ) : (
                        <p>No transactions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;