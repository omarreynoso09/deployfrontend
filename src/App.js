import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./Pages/HomePage";

const urlEndpoint = "http://localhost:4000";
function App() {
  const [clientMessage, setClientMessage] = useState();
  const [serverMessage, setServerMessage] = useState();

  const sendReceiveMessage = async () => {
    const url = `${urlEndpoint}/post-message`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientMessage }),
    });
    const responseJSON = await response.json();
    setServerMessage(responseJSON.serverMessage);
    return responseJSON;
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
