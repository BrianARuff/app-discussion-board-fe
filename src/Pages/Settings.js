import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

const Settings = props => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState("");
  const [user, setUser] = useState({});

  const handleInput = (e, cb) => {
    cb(e.target.value);
    console.log("psw => ", password);
    console.log("psw2 => ", newPassword);
    console.log("psw3 => ", newPasswordValid);
  };

  useEffect(() => {
    const payload = document.cookie.split("=")[1] || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken || ""));
      setUser(payloadData);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(password, newPassword, newPasswordValid);
  };

  return (
    <div>
      <h4>Account Settings</h4>
      <div>
        <label htmlFor="username">Username</label>
        <p>{props.username}</p>
      </div>
      <form>
        <div>
          <label htmlFor="password">Old Password</label>
          <input
            onChange={e => handleInput(e, setPassword)}
            defaultValue={password}
            name="password"
            type="password"
            autoComplete="true"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            onChange={e => handleInput(e, setNewPassword)}
            name="newPassword"
            type="password"
            autoComplete="true"
          />
        </div>
        <div>
          <label htmlFor="newPasswordValid">Enter New Password Again</label>
          <input
            onChange={e => handleInput(e, setNewPasswordValid)}
            name="newPasswordValid"
            type="password"
            autoComplete="true"
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Settings;
