import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Container, Card, Image } from "react-bootstrap";
import "./items.css";

import Nav from "../nav/navbar";

import { API } from "../../config/api";
import convertRupiah from "rupiah-format";

import notFound from "../../assets/Notfound.png";
import notFoundPhone from "../../assets/Notfound-phone.png";

function DataItems() {
  const title = "Barang";
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
        <Container className="mt-4 mb-5">
          <div className="d-flex flex-wrap justify-content-center">
            {datasItem.map((item, index) => (
              <div className="space" key={item}>
                <Card className="card-items">
                  <Card.Body className="pointer">
                    <Link to={`/detail/${item.id}`} className="link">
                      <Image src={item.image} className="img mb-3" />
                      <div className="d-flex justify-content-between rs">
                        <h5 className="name-item">{item.name}</h5>
                        <h5 className="text-danger Rp">
                          <b>{convertRupiah.convert(item.priceSell)}</b>
                        </h5>
                      </div>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
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

export default DataItems;
