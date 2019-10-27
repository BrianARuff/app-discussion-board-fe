import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

const Settings = props => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValid, setNewPasswordValid] = useState("");
  const [user, setUser] = useState({});

  const handleSetPassword = e => {
    setPassword({ [e.target.name]: e.target.value });
  };

  const handleSetNewPassword = e => {
    setNewPassword({ [e.target.name]: e.target.value });
  };

  const handleSetNewPasswordValid = e => {
    setNewPasswordValid({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const payload = document.cookie.split("=")[1] || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken || ""));
      setUser(payloadData);
      console.log(payloadData);
    }
  }, []);

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
            onChange={handleSetPassword}
            defaultValue={password}
            name="password"
            type="password"
            autoComplete="true"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            onChange={handleSetNewPassword}
            name="newPassword"
            type="password"
            autoComplete="true"
          />
        </div>
        <div>
          <label htmlFor="newPasswordValid">Enter New Password Again</label>
          <input
            onChange={handleSetNewPasswordValid}
            name="newPasswordValid"
            type="password"
            autoComplete="true"
          />
        </div>
      </form>
    </div>
  );
};

export default Settings;
