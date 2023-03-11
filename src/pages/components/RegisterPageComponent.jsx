import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
const RegisterPageComponent = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      name &&
      lastName &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        .catch((er) =>
          setRegisterUserResponseState({
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
        className="alert alert-dark text-1 fw-bold  mx-1 text-center h3 p-2"
        role="alert"
      >
        S'inscrire <i className="bi bi-person-plus"></i>
      </div>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Votre nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Entrez votre nom"
                  name="name"
                />
                <Form.Control.Feedback type="invalid">
                Veuillez saisir un nom
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Votre nom de famille</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Saisissez votre nom de famille"
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                Veuillez saisir votre nom de famille
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control
                  name="email"
                  required
                  type="email"
                  placeholder="Saisir l'adresse e-mail"
                />
                <Form.Control.Feedback type="invalid">
                Veuillez saisir une adresse e-mail valide
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  name="password"
                  required
                  type="password"
                  placeholder="Mot de passe"
                  minLength={6}
                  onChange={onChange}
                  isInvalid={!passwordsMatchState}
                />
                <Form.Control.Feedback type="invalid">
                Veuillez saisir un mot de passe valide
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                Le mot de passe doit comporter au moins 6 caractères
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Répéter le mot de passe</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  required
                  type="password"
                  placeholder="Répéter le mot de passe"
                  minLength={6}
                  onChange={onChange}
                  isInvalid={!passwordsMatchState}
                />
                <Form.Control.Feedback type="invalid">
                Les deux mots de passe doivent correspondre
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="pb-2">
                <Col>
                Avez-vous déjà un compte ?
                  <Link to={"/login"}> Login <i className="bi bi-box-arrow-in-right"></i></Link>
                </Col>
              </Row>

              <Button variant="outline-dark" className="text-1 w-100" type="submit">
                {registerUserResponseState &&
                registerUserResponseState.loading === true ? (
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
                Envoyer
              </Button>
              <Alert
                show={
                  registerUserResponseState &&
                  registerUserResponseState.error === "user exists"
                }
                variant="danger"
                className="mt-1"
              >
                Utilisateur avec cet e-mail existe déjà !
              </Alert>
              <Alert
                show={
                  registerUserResponseState &&
                  registerUserResponseState.success === "User created"
                }
                variant="info"
                className="mt-1"
              >
                Utilisateur a été créé
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPageComponent;
