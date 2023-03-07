import { Fragment, useState } from "react";
import { Toast, Form, Button } from "react-bootstrap";


const AdminChatRoomComponent = () => {
    const [toast1, closeToast1] = useState(true)
    const close1 = () => closeToast1(false)
  return (
    <>
      <Toast show={toast1} onClose={close1} className="ms-4 mb-5 mt-3">
        <Toast.Header>
          <strong className="me-auto">Chat with med becha</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "450px", overflow: "auto" }}>
            {Array.from({ length: 30 }).map((_, idx) => (
              <Fragment key={idx}>
                <p className="bg-primary rounded-pill p-3 ms-4">
                  <b>User Wrote: </b> Hello, world! This is a chat message.
                </p>
                <p className="text-dark">
                  <b>Admin Wrote: </b> Hello, world! This is a chat message.
                </p>
              </Fragment>
            ))}
            <Form className="w-100">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextareal"
              >
                <Form.Label className="text-primary">Write a message</Form.Label>
                <Form.Control as="textarea" rows="2" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AdminChatRoomComponent;
