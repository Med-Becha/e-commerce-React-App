import { Container, Row, Col, Form, Button, Alert,  } from "react-bootstrap";
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
const UserProfilePageComponent = ({
  updateUserApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [user, setUser] = useState({});
  const userInfo = userInfoFromRedux;

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => toast("error",er));
  }, [userInfo._id, fetchUser]);

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

    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;

    const password = form.password.value;

    if (
      event.currentTarget.checkValidity() === true &&
      form.password.value === form.confirmPassword.value
    ) {
      updateUserApiRequest(
        name,
        lastName,
        phoneNumber,
        address,
        country,
        zipCode,
        city,
        password
      )
        .then((data) => {
          setUpdateUserResponseState({ success: data.success, error: "" });
          reduxDispatch(
            setReduxUserState({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        })
        .catch((er) =>
          setUpdateUserResponseState(
            {
            error: er.response.data.message
              ? er.response.data.message 
              : er.response.data,
            
          }),
          
        );
    }

    setValidated(true);
  };
  return (
    <>
      <div
        className="alert alert-dark text-1 fw-bold  mx-2 text-center h3 p-2"
        role="alert"
      >
        Mettre à jour votre profil <i className="bi bi-person"></i>
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
                  defaultValue={user.name || ""}
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
                  defaultValue={user.lastName || ""}
                  name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                Veuillez saisir votre nom de famille
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control disabled value={user.email || ""} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre numéro de téléphone"
                  defaultValue={user.phoneNumber || ""}
                  name="phoneNumber"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre ville"
                  defaultValue={user.city || ""}
                  name="city"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Route</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre Route"
                  defaultValue={user.address || ""}
                  name="address"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre adress"
                  defaultValue={user.country || ""}
                  name="country"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicZip">
                <Form.Label>Code postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez votre code postal"
                  defaultValue={user.zipCode || ""}
                  name="zipCode"
                />
              </Form.Group>
            
              {/* <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                defaultValue={user.state} 
                name="state"
              />
            </Form.Group> */}
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
                Entrer un mot de passe valide s'il vous plait
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

              <Button variant="secondary"  className="w-100 text-1" type="submit">
              Mise à jour
              </Button>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.error !== ""
                }
                variant="danger"
              >
                Quelque chose s'est mal passé
              </Alert>
              <Alert
                show={
                  updateUserResponseState &&
                  updateUserResponseState.success === "user updated"
                }
                variant="info"
              >
                Utilisateur mis à jour
              </Alert>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfilePageComponent;
