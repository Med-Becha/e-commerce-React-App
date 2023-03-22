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

import SparkTek from "./logo/SparkTek.png";
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
  removeChatRoom,
} from "../redux/actions/chatActions";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
  const { categories } = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);

  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate("/product-list");
    }
  };

  useEffect(() => {
    if (userInfo.isAdmin) {
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.emit(
        "admin connected with server",
        "Admin" + Math.floor(Math.random() * 1000000000000)
      );
      socket.on(
        "server sends message from client to admin",
        ({ user, message }) => {
          dispatch(setSocket(socket));
          //   let chatRooms = {
          //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
          //   };
          dispatch(setChatRooms(user, message));
          dispatch(setMessageReceived(true));
          audio.play();
        }
      );
      socket.on("disconnected", ({ reason, socketId }) => {
        //   console.log(socketId, reason)
        dispatch(removeChatRoom(socketId));
      });
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin, dispatch]);

  return (
    <>
      <div className=" fixed-top">
        <Navbar className="backgroundNavbar">
          <Container>
            <LinkContainer className=" text-light" to="/apropos">
              <Navbar.Brand>
                <img style={{ height: "45px" }} src={SparkTek} alt="Logo" />
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
              <InputGroup className="me-1 ">
                <DropdownButton
                  variant="light"
                  id="dropdown-basic-button"
                  title={searchCategoryToggle}
                >
                  <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>
                    tous
                  </Dropdown.Item>
                  {categories.map((category, id) => (
                    <Dropdown.Item
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
                  <i className="bi bi-search text-dark"></i>
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
                        login {"  "}{" "}
                        <i className="bi bi-box-arrow-in-right"></i>
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
    </>
  );
};

export default HeaderComponent;
