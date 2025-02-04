import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobilePhone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const LoginSubmit = async () => {
        if (!mobilePhone || !password) {
            setMessage("Please enter both phone number and password.");
            setIsError(true);
            return;
        }
        const result = await dispatch(signInAction({ mobilePhone, password }));
        if (result?.flag) {
            setMessage(result.message);
            setIsError(false);
            setTimeout(() => navigate("/"), 1000);
        } else {
            setMessage(result?.message || "Login failed.");
            setIsError(true);
        }
    };    

    return (
        <div className="container py-4 d-middle login-page">
            <div className="card border-0 w-100">
                <div className="card-body">
                    <h3 className="mb-2 text-center">Login</h3>
                    
                    {message && (
                        <div className={`alert ${isError ? "alert-danger" : "alert-success"}`}>
                            {message}
                        </div>
                    )}

                    <div className="form-group mb-2">
                        <label>Phone Number</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Phone Number..."
                            value={mobilePhone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group text-center">
                        <input
                            type="button"
                            value="Login"
                            onClick={LoginSubmit}
                            className="btn btn-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
