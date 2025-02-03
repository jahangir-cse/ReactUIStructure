import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeathers } from "../../redux/actions/weatherActions";
import { useNavigate } from "react-router-dom";
import BackHeader from "../header/backHeader";

const Weather = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const weathers = useSelector(state => state.weathers.items);

    useEffect(() => {
        dispatch(fetchWeathers());
    }, [dispatch, navigate]);

    const handleBack = () => {
        // setStep(prevStep => prevStep - 1);
    };


    return (
        <div className={`container recharge-section py-4`}>
            <div className="container w-100">
                    <>
                        <div className="row mt-3">
                            {weathers.map((item) => (
                                <div className="col-md-3">
                                    <div className="card border-0">
                                        <div className="card-body rounded d-between-middle">
                                        <>
                                            <div>
                                                <h6 className="fw-bold">
                                                    {item.summary}
                                                </h6>
                                            </div>         
                                        </>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>                        
                    </>
            </div>
        </div>
    );
};

export default Weather;
