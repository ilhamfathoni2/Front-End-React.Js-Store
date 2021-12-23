import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Form, Container, Card, Image } from "react-bootstrap";
import "./items.css";
import Nav from "../nav/navbar";

import { API } from "../../config/api";

import convertRupiah from "rupiah-format";

function DetailItem() {
  const title = "Detail";
  document.title = "Store | " + title;

  let { id } = useParams();
  const [datasItem, setDatasItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/detail-item/${id}`);
      setDatasItem(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
            {datasItem.map((item, index) => (
              <div className="space" key={item}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Image src={item.image} className="img mb-3" />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nama Barang</Form.Label>
                      <Form.Control value={item.name} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Harga</Form.Label>
                      <Form.Control
                        className="text-danger"
                        value={convertRupiah.convert(item.priceSell)}
                        disabled
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control value={item.stock} disabled />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <div className="text-center pt-5">
          <h2 className="mt-3">{isLoading ? "Loading..." : "Loading"}</h2>
        </div>
      )}
    </>
  );
}

export default DetailItem;
