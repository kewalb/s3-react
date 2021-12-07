import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Drive() {
  const history = useHistory();
  const URL = "http://localhost:9000";
  const [selectedFile, setSelectedFile] = useState(null);
  const [keys, setKeys] = useState([]);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const handleSubmit = () => {
    var data = new FormData();
    data.append("file", selectedFile);
    const requestOptions = {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
        user: localStorage.getItem("user"),
      },
      body: data,
    };
    fetch(`${URL}/upload`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      history.push("/login");
    } else {
      fetch(`${URL}/getkeys`, {
        headers: { user: localStorage.getItem("user") },
      })
        .then((response) => response.json())
        .then((data) => setKeys(data));
    }
  });

  const user = localStorage.getItem("user");
  return (
    <div className="Login">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MyDrive</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ margin: 10 }}>
              <Nav.Item
                style={{
                  color: "white",
                  textDecoration: "inherit",
                  margin: 10,
                }}
              >
                welcome, {user}
              </Nav.Item>
              <Nav>
                <Link
                  to="/logout"
                  style={{
                    color: "white",
                    textDecoration: "inherit",
                    margin: 10,
                  }}
                >
                  Logout
                </Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h2 style={{ textAlign: "center", margin: 20 }}>Upload</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileInput}
            id="firstName"
            name="firstName"
          />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <Container style={{ marginTop: 30 }}>
        <Row>
          {keys.map((key, index) => (
            <Col sm={4} key={index}>
              <a href={`${URL}/image/${key}`} target="_parent">

                <iframe
                  src={`${URL}/image/${key}`}
                  title={key}
                  frameborder="0"
                  scrolling="no"
                  width="100%"
                  height="100%"
                  className="frame"
                />
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Drive;
