import React from "react";

const HomePage = ({
  clientMessage,
  setClientMessage,
  serverMessage,
  sendReceiveMessage,
  userList,
}) => {
  return (
    <div>
      <div>Client:{clientMessage}</div>
      <div>Server:{serverMessage}</div>

      <label>Input:</label>
      <input
        type="text"
        onChange={(event) => {
          const dateTime = new Date();
          const newClientMessage = `Message: ${
            event.target.value
          } at time ${dateTime.toString()}`;
          setClientMessage(newClientMessage);
        }}
      ></input>
      <br></br>
      {userList.map((user, idx) => {
        return (
          <div key={idx}>
            <p>
              First Name: <strong>{user.firstName}</strong>
            </p>
            <p>
              Last Name: <strong>{user.lastName}</strong>
            </p>
            <p>
              Email: <strong>{user.email}</strong>
            </p>
            <hr />
          </div>
        );
      })}
      <br></br>

      <button
        id="send"
        type="submit"
        onClick={(event) => {
          sendReceiveMessage();
        }}
      >
        Send
      </button>
    </div>
  );
};

export default HomePage;
