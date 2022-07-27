import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostUser = ({ postUserData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      Post User
      <br />
      <label>First Name:</label>
      &nbsp;
      <input
        type="text"
        value={firstName}
        onChange={(e) => {
          const newFirstName = e.target.value;
          setFirstName(newFirstName);
        }}
      ></input>
      &nbsp;
      <label>Last Name:</label>
      &nbsp;
      <input
        type="text"
        value={lastName}
        onChange={(e) => {
          const newLastName = e.target.value;
          setLastName(newLastName);
        }}
      ></input>
      <label>Email:</label>
      &nbsp;
      <input
        type="text"
        value={email}
        onChange={(e) => {
          const newEmail = e.target.value;
          setEmail(newEmail);
        }}
      ></input>
      &nbsp;
      <button
        id="submit"
        type="submit"
        onClick={async () => {
          const { success, message } = await postUserData({
            firstName: firstName,
            lastName: lastName,
            email: email,
          });
          setMessage(message);
          if (success === true) {
            navigate("/");
          }
        }}
      >
        Submit
      </button>
      <div>{message}</div>
    </div>
  );
};

export default PostUser;
