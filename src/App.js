import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./Pages/HomePage";

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
        </Routes>
      </header>
    </div>
  );
}

export default App;
