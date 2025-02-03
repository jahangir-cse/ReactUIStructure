import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const Login = () => {
    const dispatch = useDispatch();
    const [mobilePhone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const LoginSubmit = () => {
        if (!mobilePhone || !password) {
            alert("Please enter both phone number and password.");
            return;
        }

        // Dispatch login action
        dispatch(loginUser({ mobilePhone, password }));
    };

    return (
        <div className={`container py-4 d-middle login-page`}>
            <div className="card border-0 w-100">
                <div className="card-body">
                    <h3 className="mb-2 text-center">Login</h3>
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