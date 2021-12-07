import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import Header from "../components/header";

function Login() {
  const URL = "https://s3-react-backend.herokuapp.com";
  const history = useHistory();

  const formValidationSchema = yup.object({
    password: yup.string().min(8, "Enter a longer Password").required(),
    email: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      authenticateUser(values);
    },
  });

  const authenticateUser = ({ email, password }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password: password }),
    };
    console.log(email, password);
    fetch(`${URL}/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.token);
        if (data.token) {
          localStorage.setItem("x-auth-token", data.token);
          localStorage.setItem("user", email)

          history.push("/drive");
        } else {
          alert("invalid credentials");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="Login">
      <Header/>
      <h2 style={{ textAlign: "center", margin: 20 }}>Login</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : ""}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : ""}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
