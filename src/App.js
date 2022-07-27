import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PostUser from "./Pages/PostUser";

function App() {
  const [clientMessage, setClientMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [userList, setUserList] = useState([]);

  const [userUpdateResponse, setUserUpdateResponse] = useState(null);

  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

  const postUserData = async (userData) => {
    const url = `${urlEndpoint}/create-user`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseJSON = await response.json();
    setUserUpdateResponse(responseJSON);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${urlEndpoint}/get-users`, {
        method: "GET",
        headers: {
          accept: "application.json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      setUserList(json);
      return json;
    };
    fetchUser();
  }, [userUpdateResponse]);

  const sendReceiveMessage = async () => {
    const url = `${urlEndpoint}/post-message`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientMessage }),

      cache: "default",
    });
    const responseJSON = await response.json();
    setServerMessage(responseJSON);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>hello</div>
        <Routes>
          <Route
            path="/post-user"
            element={<PostUser postUserData={postUserData} />}
          />

          <Route
            index
            element={
              <HomePage
                clientMessage={clientMessage}
                setClientMessage={setClientMessage}
                serverMessage={serverMessage}
                sendReceiveMessage={sendReceiveMessage}
                userList={userList}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
