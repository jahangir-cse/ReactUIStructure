import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/accountActions";
import BackHeader from "../header/backHeader";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "../../Component/InfiniteScroll"; // Import the InfiniteScroll component

const MyUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.accounts.items);
    const accessToken = useSelector(state => state.authStore.accessToken);

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        } else {
            console.log('users', users);
            dispatch(getUser());
        }
    }, [dispatch, accessToken, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container py-3">
            <BackHeader handleBack={handleBack} title="My User" />
            <div className="card">
                <div className="card-body">
                    <div className="d-middle mb-3">
                        <input className="form-control" placeholder="Search by name..." />
                        <a className="btn btn-outline-primary">Search</a>
                    </div>
                    <hr />
                    <InfiniteScroll
                        items={Array.isArray(users) ? users : []}
                        initialLoad={10}
                        loadMoreCount={10}
                        renderItem={(user) => (
                            <div className="col-md-4" key={user.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <p className="card-text"><strong>{user.name}</strong> ({user.mobileNumber})</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyUser;
