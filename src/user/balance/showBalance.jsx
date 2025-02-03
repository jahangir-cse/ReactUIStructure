import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankEntities } from "../../redux/actions/financialEntityActions";
import { checkBalance } from "../../redux/actions/transactionActions";
import { Link, useNavigate } from "react-router-dom";

const ShowBalance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const balance = useSelector(state => state.transaction.balance);
    const accessToken = useSelector(state => state.authStore.accessToken);
    const [showBalance, setShowBalance] = useState(false);

    useEffect(() => {
        dispatch(fetchBankEntities());
    }, [dispatch]);

    const handleCheckBalance = () => {
        if (!accessToken) {
            navigate('/login');
        }
        dispatch(checkBalance());
        setShowBalance(true);
        setTimeout(() => {
            setShowBalance(false);
        }, 5000);
    };

    return (
        <div className={`container d-middle recharge-section mt-3`}>
            <div className="container w-100">
                <div className="card border-0 w-100">
                    <div className="card-body d-between-middle rounded">
                        <a className={`btn btn-check-balance rounded-pill ${showBalance ? 'active' : ''}`} onClick={handleCheckBalance}>
                            <i className="bi bi-coin mr-2"></i>
                            <span className='balance-display'>
                                {showBalance ? `Tk. ${balance}` : 'Check Balance'}
                            </span>
                        </a>
                        <Link to={`/balance`}><div className="btn btn-primary">Add Balance</div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowBalance;
