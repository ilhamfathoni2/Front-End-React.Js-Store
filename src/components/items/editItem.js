import React, { useState, useEffect, useRef } from "react";
import storage from "../../firebase/index";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Card,
  Image,
  Alert,
  Overlay,
  Popover,
  ProgressBar,
} from "react-bootstrap";
import "./items.css";
import Nav from "../nav/navbar";
import { API } from "../../config/api";

import convertRupiah from "rupiah-format";

function EditItem() {
  const title = "Edit";
  document.title = "Store | " + title;

  let navigate = useNavigate();

  let { id } = useParams();
  const filePickerRef = useRef();
  const [datasItem, setDatasItem] = useState([]);
  const [message, setMessage] = useState(null);
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
              const data = {
                image: url,
                name: form.name,
                priceBuy: form.priceBuy,
                priceSell: form.priceSell,
                stock: form.stock,
              };
              const body = JSON.stringify(data);
              API.patch(`/edit-item/${id}`, body, config);
              navigate("/items");
            });
        }
      );
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Filed upload image
        </Alert>
      );
      setMessage(alert);
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
          <div className="d-flex justify-content-center mt-4 mb-5">
            {datasItem.map((item) => (
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
                <Card className="edit-page">
                  <Card.Body>
                    {message && message}
                    <Form.Group className="mb-3">
                      <Form.Label>Process</Form.Label>
                      <ProgressBar
                        animated
                        now={progress}
                        label={`${progress}%`}
                      />
                    </Form.Group>
                    <Form onSubmit={SubmitData}>
                      <Image src={item.image} className="img mb-3" />
                      <Form.Group className="mb-3">
                        <Form.Label>Foto</Form.Label>
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
                          placeholder={convertRupiah.convert(item.priceSell)}
                        />
                      </Form.Group>
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
          <h2 className="mt-3">{isLoading ? "Loading..." : "Loading"}</h2>
        </div>
      )}
    </>
  );
}

export default EditItem;
