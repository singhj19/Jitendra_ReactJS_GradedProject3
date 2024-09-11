import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationMenuForDetails = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/InTheater');
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'white' }}>
      <Container fluid>
        <Nav className="me-auto">
          <Button
            onClick={handleBackToHome}
            style={{ backgroundColor: 'transparent', border: 'none', color: 'blue' , marginLeft:'30px'}}
          >
            Back to Home
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationMenuForDetails;
