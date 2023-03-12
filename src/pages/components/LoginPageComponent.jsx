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
        className="alert alert-dark text-1  fw-bold  mx-2 text-center h3 p-2"
        role="alert"
      >
        Connexion <i className="bi bi-box-arrow-in-right"></i>
      </div>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 text-dark"
                controlId="formBasicPassword"
              >
                <Form.Label>Mot de passe</Form.Label>
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
                  label="Ne pas se déconnecter"
                />
              </Form.Group>

              <Row className="pb-2">
                <Col>
                Vous n'avez pas de compte  ?
                  <Link to={"/register"}> Registre <i className="bi bi-person-plus"></i></Link>
                </Col>
              </Row>

              <Button variant="secondary" className="text-1 w-100" type="submit">
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
                Connexion <i className="bi bi-box-arrow-in-right"></i>
              </Button>
              <Alert
                show={
                  loginUserResponseState &&
                  loginUserResponseState.error === "wrong credentials"
                }
                variant="secondary"
                className="mt-1 text-1 text-center"
              >
                Mauvaises informations d'identification <i className="bi bi-exclamation-circle"></i>
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPageComponent;
