import React, { useState, useRef } from "react";

import { Button, Form, Modal, Alert } from "react-bootstrap";

import { API } from "../../config/api";

function AddItems() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filePickerRef = useRef();

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
    e.preventDefault();
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

      const res = await API.post("/add-item", body, config);
      if (res.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success add new item
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

  return (
    <>
      <h5 className="menu-card" onClick={handleShow}>
        Tambah Barang
      </h5>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={SubmitData}>
          <Modal.Body>
            <Modal.Title>Tambah Barang</Modal.Title>
            {message && message}
            <Form.Group className="mb-3 mt-4">
              <Form.Label>Foto Barang</Form.Label>
              <Form.Control
                type="file"
                ref={filePickerRef}
                accept=".jpg,.png"
                name="image"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Barang</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                name="priceBuy"
                value={form.priceBuy}
                onChange={handleChange}
                type="number"
                min="0"
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
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                name="stock"
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Item
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddItems;
