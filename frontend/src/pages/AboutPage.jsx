import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us - GreenPackHub';
  }, []);

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1>About Us</h1>
          <p>
            Welcome to GreenPackHub, your trusted partner in sustainable packaging solutions. Our mission is to provide eco-friendly packaging options that help reduce environmental impact while maintaining quality and performance.
          </p>
          <p>
            At GreenPackHub, we believe in a greener future. Our products are designed to be biodegradable, compostable, or reusable, ensuring that they leave minimal impact on the planet. Join us in our journey to make the world a better place, one package at a time.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;