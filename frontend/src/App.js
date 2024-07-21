import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState({ firstName: "", lastName: "" });

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({ firstName: "", lastName: "" });
  };
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route
            element={<FirstStep user={user} updateUser={updateUser} />}
            path="/"
            exact={true}
          />
          <Route
            element={<SecondStep user={user} updateUser={updateUser} />}
            path="/second"
          />
          <Route
            element={
              <ThirdStep
                user={user}
                updateUser={updateUser}
                resetUser={resetUser}
              />
            }
            path="/third"
          />
          <Route element={<Login />} path="/login" />
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<Home />} path="/home" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
