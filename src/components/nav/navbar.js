import React, { useContext } from "react";

import { useNavigate, NavLink } from "react-router-dom";
import { Container, Card, Navbar, NavDropdown } from "react-bootstrap";
import "./nav.css";
import AddItems from "../items/addItems";

import { UserContext } from "../../context/userContext";

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
      <Container className="mt-4">
        <div className="shadow-lg  mb-5 bg-body rounded">
          <Card className="bg-black-soft">
            <Card.Body>
              <div className="d-flex flex-row justify-content-around">
                <NavLink
                  to="/items"
                  className={({ isActive }) =>
                    isActive ? "menu-active" : "menu-card"
                  }
                >
                  <h5>Barang</h5>
                </NavLink>
                <NavLink
                  to="/handle-item"
                  className={({ isActive }) =>
                    isActive ? "menu-active" : "menu-card"
                  }
                >
                  <h5>Kelola Barang</h5>
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
