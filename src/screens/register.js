import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import Header from "../components/header";

function Register() {
  const URL = "https://s3-react-backend.herokuapp.com";
  const history = useHistory();

  const formValidationSchema = yup.object({
    password: yup.string().min(8, "Enter a longer Password").required(),
    email: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      authenticateUser(values);
    },
  });

  const authenticateUser = ({ email, password, firstName, lastName }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password: password, firstName: firstName, lastName:lastName }),
    };
    // console.log(email, password);
    fetch(`${URL}/user/register`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.message !== "Try with different username"){
            alert(data.message)
            history.push("/login")
        }else{
        alert(data.message)
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="Login">
        <Header/>
      <h2 style={{ textAlign: "center", margin: 20 }}>Register</h2>
      <Form onSubmit={formik.handleSubmit}>

      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            id="firstName"
            name="firstName"
          />
          {formik.errors.firstName && formik.touched.firstName
            ? formik.errors.firstName
            : ""}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            id="lastName"
            name="lastName"
          />
          {formik.errors.lastName && formik.touched.lastName
            ? formik.errors.lastName
            : ""}
        </Form.Group>

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

export default Register;
