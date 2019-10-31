import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const Settings = props => {
  // passwords
  const [password, setPassword] = useState("");
  const [oldPasswordVerify, setOldPasswordVerify] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // user account
  const [user, setUser] = useState({});

  // error handling
  const [error, setError] = useState("");

  const handleInput = (e, cb) => {
    cb(e.target.value);
  };

  const handleSubmitUpdateAccoutSettings = e => {
    e.preventDefault();
    axios
      .patch(
        "https://suicide-watch-backend.herokuapp.com/users/update_account",
        {
          id: user.id,
          oldPassword: password,
          oldPasswordVerify: oldPasswordVerify,
          newPassword: newPassword
        }
      )
      .then(res => {
        Cookie.remove("token");
        localStorage.removeItem("username");
        localStorage.removeItem("image");
        window.location.href = window.location.origin + "/logout";
        console.log(res.data);
      })
      .catch(err => {
        setError(err.response.data.message);
        console.error({ ...err });
      });
  };

  useEffect(() => {
    const payload = document.cookie.split("=")[1] || "";
    if (payload.length > 0) {
      const bearerToken = payload.split(".")[1];
      const payloadData = JSON.parse(atob(bearerToken || ""));
      setUser(payloadData);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
        flexDirection: "column"
      }}
    >
      <h4 style={{ textTransform: "uppercase" }}>
        {user.name} Account Settings
      </h4>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <form onSubmit={handleSubmitUpdateAccoutSettings}>
        <div style={flexBox}>
          <label htmlFor="password">Old Password</label>
          <input
            onChange={e => handleInput(e, setPassword)}
            defaultValue={password}
            name="password"
            type="password"
            autoComplete="true"
            style={{
              width: "300px",
              height: "30px",
              margin: "20px 0",
              border: "1px solid black",
              borderRadius: "3px"
            }}
          />
        </div>
        <div style={flexBox}>
          <label htmlFor="setOldPasswordVerify">Verify Old Password</label>
          <input
            onChange={e => handleInput(e, setOldPasswordVerify)}
            name="oldPasswordVerify"
            type="password"
            autoComplete="true"
            style={{
              width: "300px",
              height: "30px",
              margin: "20px 0",
              border: "1px solid black",
              borderRadius: "3px"
            }}
          />
        </div>
        <div style={flexBox}>
          <label htmlFor="newPassword">Enter New Password</label>
          <input
            onChange={e => handleInput(e, setNewPassword)}
            name="newPassword"
            type="password"
            autoComplete="false"
            style={{
              width: "300px",
              height: "30px",
              margin: "20px 0",
              border: "1px solid black",
              borderRadius: "3px"
            }}
          />
        </div>
        <button
          style={{
            width: "300px",
            margin: "20px 0",
            fontSize: "20px",
            padding: 20,
            fontWeight: "bold",
            border: "1px solid black",
            borderRadius: "3px",
            cursor: "pointer"
          }}
          onClick={handleSubmitUpdateAccoutSettings}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const flexBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

export default Settings;
