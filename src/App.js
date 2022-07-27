import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./Pages/HomePage";
import PostUser from "./Pages/PostUser";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [clientMessage, setClientMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  const sendReceiveMessage = async () => {
    console.log("client message: ", clientMessage);
    const response = await fetch(`${urlEndpoint}/post-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientMessage }),
    });
    const responseJSON = await response.json();
    setServerMessage(responseJSON.serverMessage);

    const postUserData = async (userData) => {
      const url = urlEndpoint + "/create-user";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const responseJSON = await response.json();
      return responseJSON;
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            index
            element={
              <HomePage
                clientMessage={clientMessage}
                setClientMessage={setClientMessage}
                serverMessage={serverMessage}
                sendReceiveMessage={sendReceiveMessage}
              />
            }
          />
          <Route
            path="/post-user"
            element={<PostUser postUserData={postUserData} />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
