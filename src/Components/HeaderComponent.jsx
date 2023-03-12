import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";
import logo from "../logo.png";
import CategoriesNavBarComponent from "./CategoriesNavBarComponent";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories } from "../redux/actions/categoryActions";
import socketIOClient from "socket.io-client";
import {
  setChatRooms,
  setSocket,
  setMessageReceived,
} from "../redux/actions/chatActions";

function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const { categories } = useSelector((state) => state.getCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const { messageReceived } = useSelector((state) => state.adminChat);
  const [searchCategoryToggle, setSearchCategoryToggle] =
    useState("categories");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "tous les categories") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "tous les categories") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate("/product-list");
    }
  };

  useEffect(() => {
    if (userInfo.isAdmin) {
      const socket = socketIOClient();
      var audio = new Audio("/audio/chat-msg.mp3");
      socket.on("server sends message from client to admin", ({ message }) => {
        dispatch(setSocket(socket));
        dispatch(setChatRooms("exampleUser", message));
        dispatch(setMessageReceived(true));
        audio.play();
      });
      return () => socket.disconnect();
      
    }
    //eslint-disable-next-line
  }, [userInfo.isAdmin]);
  return (
    <div className=" fixed-top">
      <Navbar className="backgroundNavbar">
        <Container>
          <LinkContainer className=" text-light" to="/apropos">
            <Navbar.Brand>
              <img style={{ height: "45px" }} src={logo} alt="Logo" />
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/cart" className="text-white">
            <Navbar.Brand>
              <Badge pill className="border border-white text-1 " bg="none">
                {cartSubtotal === 0 ? "0,00 DT" : cartSubtotal + " DT"}
              </Badge>
              <i className="bi bi-cart-dash text-white h3">
                <span className="position-absolute translate-middle text-1 h6 ">
                  {itemsCount === 0 ? "" : itemsCount}
                </span>
              </i>
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
      {/* second navbar */}
      <Navbar collapseOnSelect expand="md" className="backgroundNavbar ">
        <Container className="">
          <Navbar.Toggle
            className="bg-light mb-1"
            aria-controls="responsive-navbar-nav "
          />
          <Navbar.Collapse id="responsive-navbar-nav " className="text-light">
            <Link to="/" className="mx-1">
              <Button variant="outline-light" className="text-1 px-5 w-100">
                Acceil
              </Button>
            </Link>
            {/* 3 */}
            <InputGroup className="mx-2 text-1">
              <DropdownButton
                variant="light"
                id="dropdown-basic-button"
                title={searchCategoryToggle}
              >
                <Dropdown.Item
                  className="text-1"
                  onClick={() => setSearchCategoryToggle("tous les categories")}
                >
                  tous les categories
                </Dropdown.Item>
                {categories.map((category, id) => (
                  <Dropdown.Item
                    className="text-1"
                    key={id}
                    onClick={() => setSearchCategoryToggle(category.name)}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <Form.Control
                onKeyUp={submitHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search in shop ..."
              />
              <Button onClick={submitHandler} variant="light">
                <i className="bi bi-search  text-1 font-weight-bold"></i>
              </Button>
            </InputGroup>
            {/* 1 */}
            <Nav className="  ">
              {userInfo.isAdmin ? (
                <LinkContainer to="/admin/orders">
                  <Button variant="outline-light" className="text-1">
                    Admin
                    {messageReceived && (
                      <span className="position-absolute top-1 start-10 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                    )}
                  </Button>
                </LinkContainer>
              ) : userInfo.name && !userInfo.isAdmin ? (
                <DropdownButton
                  title={`${userInfo.name} ${userInfo.lastName}`}
                  variant="outline-light"
                  className="text-1"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey="/user/my-orders"
                    as={Link}
                    to="/user/my-orders"
                  >
                    <i className="bi bi-list-ul"> My orders</i>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                    <i className="bi bi-person"> My profile</i>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => dispatch(logout())}
                    className=" "
                  >
                    <i className="bi bi-box-arrow-right"> Logout</i>
                  </NavDropdown.Item>
                </DropdownButton>
              ) : (
                <>
                  <LinkContainer to="/login" className="mx-1">
                    <Button
                      variant="outline-light"
                      className="text-1 d-inline-flex"
                    >
                      login {"  "} <i className="bi bi-box-arrow-in-right"></i>
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/register" className="mx-1">
                    <Button
                      variant="outline-light"
                      className="text-1 d-inline-flex"
                    >
                      Register <i className="bi bi-person-fill-add "></i>
                    </Button>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CategoriesNavBarComponent />
    </div>
  );
}

export default HeaderComponent;
