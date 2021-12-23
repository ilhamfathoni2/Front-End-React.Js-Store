import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Image, Modal } from "react-bootstrap";
import "./items.css";

import { API } from "../../config/api";
import convertRupiah from "rupiah-format";

function DetailManage({ item }) {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteItem = async (e) => {
    try {
      await API.delete(`/delete-item/${item.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="space" key={item}>
        <Card style={{ width: "18rem" }}>
          <Card.Body className="pointer">
            <Image src={item.image} className="img mb-3" />
            <div className="d-flex justify-content-between">
              <h5 className="name-item">{item.name}</h5>
              <h5 className="text-danger">
                <b>{convertRupiah.convert(item.priceSell)}</b>
              </h5>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <Button variant="danger mr-3" onClick={handleShow}>
                Delete
              </Button>
              <Button
                variant="warning"
                onClick={() => navigate(`/edit-item/${item.id}`)}
              >
                Edit
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Modal.Title className="text-danger">Warning!!</Modal.Title>
            <h5 className="text-dark mt-3">
              Are you sure you <b>delete</b> this data?
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Form onSubmit={deleteItem}>
              <Button type="submit" variant="danger">
                Delete
              </Button>
            </Form>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default DetailManage;
