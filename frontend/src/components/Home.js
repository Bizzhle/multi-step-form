import React, { useContext, useEffect } from "react";
import { UserContext } from "../utils/context/authContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  console.log(userData.user);

  useEffect(() => {
    if (userData === "") {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <p>Home</p>
      <>{userData.FirstName}</>
    </div>
  );
}

export default Home;
