import React from "react";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container fluid>
        <AddFolderButton />
      </Container>
    </>
  );
};

export default Dashboard;
