import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectToken,
  selectError,
  setToken,
} from "../../app/store/authSlice";
import GoogleLoginBT from "../../components/GoogleLoginBT";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const error = useSelector(selectError);
  let [searchParams, _] = useSearchParams();
  const handle_submit = async (e) => {
    e.preventDefault();
    dispatch(login({ username: email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const access = searchParams.get("access");
    const refresh = searchParams.get("refresh");
    if (access && refresh) {
      dispatch(setToken({ access, refresh }));
    }
  }, []);

  return (
    <div className="login-page">
      {/* {error && <Alert severity="error">{error}</Alert>} */}
      <div className="form">
        <form onSubmit={handle_submit}>
          <h1>Log in</h1>

          <GoogleLoginBT />
          <div className="devicer" />
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email address..."
            value={email}
            required
          />
          <br />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password..."
            value={password}
            required
          />
          <br />

          <input type="submit" value="Log in" />

          <div className="bottom-text">
            <p>Don't have an account?</p>
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
