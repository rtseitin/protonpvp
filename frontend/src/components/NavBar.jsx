import React from "react";
import {
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

export const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand style={{ marginRight: "5px", padding: 1 }}>
          <Link to="/">
            <img
              alt="ProtonPvP logo"
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              fontSize: "25px",
              fontFamily: "Tahoma, sans-serif",
              fontWeight: "600",
              color: "#FFF9F4",
              left: "20px",
              marginRight: "1em",
            }}
          >
            PROTONPVP
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className="ml-auto">
            <Link to="/" style={{ textDecoration: "none" }}>
              <p className="tag">Home</p>
            </Link>
            <Link to="/staff" style={{ textDecoration: "none" }}>
              <p className="tag">Staff List</p>
            </Link>
            <Nav.Link href="http://buy.protonpvp.com/" style={{padding: "0em", margin: "0.5em"}}>Store</Nav.Link>
            <Nav.Link href="http://discord.gg/WeCyUbUNWS" style={{padding: "0em", margin: "0.5em"}}>Discord</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div
        style={{
          backgroundColor: "orange",
          width: "100vw",
          height: "7px",
          boxShadow: "0px 3px 8px -1px rgba(0,0,0,0.22)",
        }}
      />
    </>
    // <>
    //   <Navbar bg="dark" variant="dark">
    //     <Navbar.Brand style={{ marginRight: "5px", padding: 1 }}>
    //       <Link to="/">
    //         <img
    //           alt="ProtonPvP logo"
    //           src="https://cdn.discordapp.com/attachments/407705378361573378/804597808732176454/6cf04560ac8845df18c0e228b503f52c.png"
    //           width="60"
    //           height="60"
    //           className="d-inline-block align-top"
    //         />
    //       </Link>
    //     </Navbar.Brand>
    //     <Link to="/" style={{ textDecoration: "none" }}>
    //       <div
    //         style={{
    //           fontSize: "25px",
    //           fontFamily: "Tahoma, sans-serif",
    //           fontWeight: "600",
    //           color: "#FFF9F4",
    //           left: "20px",
    //           marginRight:"1em"
    //         }}
    //       >
    //         PROTONPVP
    //       </div>
    //     </Link>
    //     <Nav className="ml-auto">
    //       <Link to="/" style={{ textDecoration: "none" }}>
    //         <p className="tag">Home</p>
    //       </Link>
    //       <Link to="/staff" style={{ textDecoration: "none" }}>
    //         <p className="tag">Staff List</p>
    //       </Link>
    //       <Nav.Link href="http://buy.protonpvp.com/">Store</Nav.Link>
    //       <Nav.Link href="http://discord.gg/WeCyUbUNWS">Discord</Nav.Link>
    //     </Nav>
    //   </Navbar>
    //   <div
    //     style={{
    //       backgroundColor: "orange",
    //       width: "100vw",
    //       height: "6px",
    //       boxShadow: "0px 3px 8px -1px rgba(0,0,0,0.22)",
    //     }}
    //   />
    // </>
  );
};
