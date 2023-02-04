import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../api-service/authService";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(1);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle_submit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password not match!");
    } else {
      const user = {
        first_name: firstName,
        last_name: lastName,
        // gender,
        email,
        password,
        confirm_password: confirmPassword,
        name: firstName + " " + lastName,
        // avatar
      };
      try {
        const res = await authService.signUp(user);
        if (res.status === 201) {
          navigate("/login");
        } else {
          const data = res.data;
          let errorMessage = "";
          for (const key in data) {
            errorMessage +=
              key[0].toUpperCase() + key.slice(1) + ": " + data[key][0] + " ";
          }
          setError(errorMessage);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
      <div className="form">
        <form onSubmit={handle_submit}>
          <h1>Sign up</h1>

          <label>First name</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            name="first_name"
            placeholder="Enter your first name..."
            value={firstName}
            required
          />
          <br />

          <label>Last name</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            name="last_name"
            placeholder="Enter your last name..."
            value={lastName}
            required
          />
          <br />

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

          <label>Avatar</label>
          <input
            type="text"
            onChange={(e) => setAvatar(e.target.value)}
            name="avatar"
            placeholder="Enter your Avatar url..."
            value={avatar}
            required
          />
          <br />

          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => {
              setGender(parseInt(e.target.value));
            }}
          >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Other</option>
          </select>
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

          <label>Confirm password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirm_password"
            placeholder="Confirm your password..."
            value={confirmPassword}
            required
          />
          <br />

          <input type="submit" value="Sign up" />

          <div className="bottom-text">
            <p>Already have an account?</p>
            <Link className="link" to="/login">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
