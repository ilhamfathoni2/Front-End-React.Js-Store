import React, { useState, useEffect } from "react";

import {
  Container,
  Image,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import Nav from "../components/nav/navbar";
import DetailManage from "../components/items/manage";

import { API } from "../config/api";
import notFound from "../assets/Notfound.png";
import notFoundPhone from "../assets/Notfound-phone.png";
import "../components/items/items.css";

function ManageItem() {
  const title = "Manage";
  document.title = "Store | " + title;

  const [datasItem, setDatasItem] = useState([]);
  const [searchTitle, setsearchTitle] = useState("");

  const getItems = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.get("/get-item-user", config);
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
      <Container className="d-flex justify-content-end">
        <InputGroup className="width-min mt-4 rwd-search">
          <FormControl
            type="text"
            placeholder="Search item.."
            onChange={(event) => {
              setsearchTitle(event.target.value);
            }}
          />
          <Button variant="warning">Search</Button>
        </InputGroup>
      </Container>
      {datasItem.length !== 0 ? (
        <Container className="mt-4 mb-5">
          <div className="d-flex flex-wrap justify-content-center">
            {datasItem
              .filter((item) => {
                if (searchTitle === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(searchTitle.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => (
                <DetailManage item={item} key={item} />
              ))}
          </div>
        </Container>
      ) : (
        <div className="text-center pt-5">
          <Image src={notFound} className="img-lg" />
          <Image src={notFoundPhone} className="img-sml" />
        </div>
      )}
    </>
  );
}

export default ManageItem;
