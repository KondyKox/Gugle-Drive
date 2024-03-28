import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfimRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfimRef.current.value)
      return setError("Passwords do not match");

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email)
      promises.push(updateEmail(emailRef.current.value));
    if (passwordRef.current.value)
      promises.push(updatePassword(passwordRef.current.value));

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account.");
      })
      .finally(() => {
        setLoading(false);
      });

    try {
      setError("");
      setLoading(true);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>

            <Form.Group id="password" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            <Form.Group id="password-confirm" className="mt-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfimRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
