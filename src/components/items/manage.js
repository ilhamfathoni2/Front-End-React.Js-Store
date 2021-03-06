import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Image, Modal, Badge } from "react-bootstrap";
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
      navigate("/items");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="space" key={item}>
        <Card className="card-items">
          <Card.Body>
            <Image src={item.image} className="img mb-3" />
            <div className="d-flex justify-content-between rs">
              <h5 className="name-item">{item.name}</h5>
              <h5 className="text-danger Rp">
                <b>{convertRupiah.convert(item.priceSell)}</b>
              </h5>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <h5 onClick={handleShow}>
                <Badge bg="danger pointer mr-3">Delete</Badge>
              </h5>
              <h5 onClick={() => navigate(`/edit-item/${item.id}`)}>
                <Badge bg="warning pointer">Edit</Badge>
              </h5>
            </div>
          </Card.Body>
        </Card>
      </div>

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
          <Button onClick={deleteItem} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailManage;
