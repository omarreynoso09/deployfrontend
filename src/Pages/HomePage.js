import React from "react";

const HomePage = ({
  clientMessage,
  setClientMessage,
  serverMessage,
  sendReceiveMessage,
}) => {
  return (
    <div>
      <label>Client Message : {clientMessage}</label>
      <label>Server Message : {serverMessage}</label>
      <label>input</label>
      <br />
      <input
        type="text"
        value={clientMessage}
        onChange={(e) => {
          const dateTime = new Date();
          `Message: ${e.target.value} at time ${dateTime.toString()}`;
        }}
      />
      <button
        onClick={() => {
          sendReceiveMessage();
        }}
      >
        button
      </button>
    </div>
  );
};

export default HomePage;
