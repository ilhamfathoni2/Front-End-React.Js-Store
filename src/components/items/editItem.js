import React, { useState, useEffect, useRef } from "react";

import { Link, useParams } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Card,
  Image,
  Alert,
  Overlay,
  Tooltip,
  Popover,
} from "react-bootstrap";
import "./items.css";
import Nav from "../nav/navbar";
import { API } from "../../config/api";

import convertRupiah from "rupiah-format";

function EditItem() {
  const title = "Edit";
  document.title = "Store | " + title;

  let { id } = useParams();

  const [datasItem, setDatasItem] = useState([]);

  const getItems = async () => {
    try {
      const response = await API.get(`/detail-item/${id}`);
      setDatasItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    image: "",
    name: "",
    priceBuy: "",
    priceSell: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const SubmitData = async (e) => {
    // e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const body = new FormData();
      body.set("image", form.image[0]);
      body.set("name", form.name);
      body.set("priceBuy", form.priceBuy);
      body.set("priceSell", form.priceSell);
      body.set("stock", form.stock);

      const res = await API.patch(`/edit-item/${id}`, body, config);
      if (res.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success edit data
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Image must be exist & jpg/png, max size 100kb
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      <Nav />
      {datasItem.length !== 0 ? (
        <Container>
          <div className="d-flex justify-content-center">
            {datasItem.map((item, index) => (
              <div className="space" key={item}>
                <div className="d-flex justify-content-between mb-2">
                  <h4>Edit</h4>
                  <div ref={ref}>
                    <Button variant="warning" onClick={handleClick}>
                      Requirement !
                    </Button>
                    <Overlay
                      show={show}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <Popover.Header as="h3">Requirement !</Popover.Header>
                        <Popover.Body>
                          <strong>All data </strong> must be filled
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                </div>
                <Card style={{ width: "40rem" }}>
                  <Card.Body>
                    {message && message}
                    <Form onSubmit={SubmitData}>
                      <div className="d-flex justify-content-between mt-2">
                        <Image src={item.image} className="img mb-3" />
                        <div className="d-flex flex-column">
                          <Form.Group className="mb-3">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control
                              type="file"
                              name="image"
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control
                              value={form.name}
                              name="name"
                              onChange={handleChange}
                              placeholder={item.name}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Harga Jual</Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              value={form.priceSell}
                              name="priceSell"
                              onChange={handleChange}
                              placeholder={convertRupiah.convert(
                                item.priceSell
                              )}
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <Form.Group className="mb-3">
                        <Form.Label>Harga Beli</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={form.priceBuy}
                          name="priceBuy"
                          onChange={handleChange}
                          placeholder={convertRupiah.convert(item.priceBuy)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={form.stock}
                          name="stock"
                          onChange={handleChange}
                          placeholder={item.stock}
                        />
                      </Form.Group>
                      <div className="d-grid gap-2">
                        <Button type="submit" variant="primary" size="lg">
                          Save Change
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <div className="text-center pt-5">
          <h2 className="mt-3">No data</h2>
        </div>
      )}
    </>
  );
}

export default EditItem;
