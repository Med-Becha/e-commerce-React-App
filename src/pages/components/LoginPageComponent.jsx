import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginPageComponent = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });

          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }

          if (res.success === "user logged in" && !res.userLoggedIn.isAdmin)
            window.location.href = "/user";
          else window.location.href = "/admin/orders";
        })
        .catch((er) =>
          setLoginUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  return (
    <>
      <div
        className="alert alert-primary fw-bold mt-2 mx-1 text-center h3 p-2"
        role="alert"
      >
        Connexion
      </div>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 text-primary"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  name="doNotLogout"
                  type="checkbox"
                  label="Do not logout"
                />
              </Form.Group>

              <Row className="pb-2">
                <Col>
                  Don't you have an account?
                  <Link to={"/register"}> Register </Link>
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                {loginUserResponseState &&
                loginUserResponseState.loading === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                Login
              </Button>
              <Alert
                show={
                  loginUserResponseState &&
                  loginUserResponseState.error === "wrong credentials"
                }
                variant="danger"
              >
                Wrong credentials
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPageComponent;
