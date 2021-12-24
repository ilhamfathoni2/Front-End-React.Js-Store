import React, { useContext } from "react";

import { useNavigate, NavLink } from "react-router-dom";
import { Container, Card, Image } from "react-bootstrap";
import "./nav.css";
import AddItems from "../items/addItems";

import { UserContext } from "../../context/userContext";

import iconHome from "../../assets/home.png";
import iconManage from "../../assets/edit.png";

function Nav() {
  const [, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <>
      <Container>
        <div className="shadow-lg  mb-3 bg-body rounded rwb-nav">
          <Card className="bg-black-soft">
            <Card.Body>
              <div className="d-flex flex-row justify-content-around">
                <NavLink
                  to="/items"
                  className={({ isActive }) =>
                    isActive ? "menu-active" : "menu-card"
                  }
                >
                  <div className="p-0 center">
                    <div className="icon-home"></div>
                    <label className="p-menu-label">Home</label>
                  </div>
                </NavLink>
                <NavLink
                  to="/handle-item"
                  className={({ isActive }) =>
                    isActive ? "menu-active" : "menu-card"
                  }
                >
                  <div className="p-0 center">
                    <div className="icon-manage"></div>
                    <label className="p-menu-label">Manage</label>
                  </div>
                </NavLink>
                <AddItems />
                <div className="d-flex justify-content-end">
                  <h5 onClick={handleLogout} className="menu-logout">
                    Logout
                  </h5>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Nav;
