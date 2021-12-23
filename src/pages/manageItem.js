import React, { useState, useEffect } from "react";

import { Container, Image } from "react-bootstrap";

import Nav from "../components/nav/navbar";
import DetailManage from "../components/items/manage";

import { API } from "../config/api";
import notFound from "../assets/Notfound.png";

function ManageItem() {
  const title = "Manage";
  document.title = "Store | " + title;

  const [datasItem, setDatasItem] = useState([]);

  const getItems = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.get("/get-item", config);
      setDatasItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Nav />
      {datasItem.length !== 0 ? (
        <Container className="mt-1">
          <div className="d-flex flex-wrap">
            {datasItem.map((item) => (
              <DetailManage item={item} key={item} />
            ))}
          </div>
        </Container>
      ) : (
        <div className="text-center pt-5">
          <Image src={notFound} />
        </div>
      )}
    </>
  );
}

export default ManageItem;