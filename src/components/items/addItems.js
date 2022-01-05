import React, { useState, useRef } from "react";
import { Button, Form, Modal, Alert, ProgressBar } from "react-bootstrap";
import { API } from "../../config/api";
import storage from "../../firebase/index";

function AddItems() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filePickerRef = useRef();

  const [message, setMessage] = useState(null);

  const [images, setImages] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
    }
  };

  const [form, setForm] = useState({
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

  const SubmitData = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const uploadTask = storage.ref(`/images/${images.name}`).put(images);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(images.name)
            .getDownloadURL()
            .then((url) => {
              const dataInput = {
                image: url,
                name: form.name,
                priceBuy: form.priceBuy,
                priceSell: form.priceSell,
                stock: form.stock,
              };
              const body = JSON.stringify(dataInput);
              const response = API.post("/add-item", body, config);
              if (response.data.status === "success") {
                const alert = (
                  <Alert variant="success" className="py-1">
                    Upload success
                  </Alert>
                );
                setMessage(alert);
              }
            });
        }
      );
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Filed upload
        </Alert>
      );
      setMessage(alert);
    }
  };

  return (
    <>
      <h5 className="menu-card p-0 center" onClick={handleShow}>
        <div className="icon-add"></div>
        <label className="p-menu-label">Upload</label>
      </h5>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Barang</Modal.Title>
        </Modal.Header>
        <Form onSubmit={SubmitData}>
          <Modal.Body>
            {message && message}
            <Form.Group className="mb-3 mt-4">
              <Form.Label>Foto Barang</Form.Label>
              <Form.Control
                type="file"
                ref={filePickerRef}
                accept=".jpg,.png"
                onChange={handleUploadImage}
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
            <Form.Group className="mb-3">
              <Form.Label>Process Upload</Form.Label>
              <ProgressBar animated now={progress} label={`${progress}%`} />
            </Form.Group>
            {(() => {
              if (progress === 100) {
                return (
                  <form>
                    <div className="d-grid gap-2 mt-4">
                      <Button type="submit" variant="danger" size="lg">
                        Show Result
                      </Button>
                    </div>
                  </form>
                );
              } else {
                return (
                  <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="primary" size="lg">
                      Upload
                    </Button>
                  </div>
                );
              }
            })()}
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default AddItems;
