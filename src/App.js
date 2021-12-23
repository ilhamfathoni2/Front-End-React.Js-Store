import React, { useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

import SignUp from "./components/auth/regis";
import SignIn from "./components/auth/login";
import DataItems from "./components/items/dataItem";
import DetailItem from "./components/items/detailItem";
import EditItem from "./components/items/editItem";
import ManageItem from "./pages/manageItem";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  let isLogin = localStorage.getItem("token");

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else if (!isLogin) {
      return navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.get("/check-auth", config);

      if (response.status === 404) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/items" element={<DataItems />} />
        <Route path="/detail/:id" element={<DetailItem />} />
        <Route path="/handle-item" element={<ManageItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />
      </Routes>
    </div>
  );
}

export default App;
