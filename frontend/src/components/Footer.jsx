import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>GreenPackHub</h5>
            <p className="text-muted">
              Sustainable packaging solutions for a greener future. We provide eco-friendly
              packaging options to reduce environmental impact.
            </p>
            <div className="d-flex gap-3 social-icons">
              <a href="#" className="text-light">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-light">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-light">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-muted text-decoration-none">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/products?category=Biodegradable" className="text-muted text-decoration-none">
                  Biodegradable
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=Reusable" className="text-muted text-decoration-none">
                  Reusable
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=Compostable" className="text-muted text-decoration-none">
                  Compostable
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <address className="text-muted">
              <p>123 Green Street</p>
              <p>Eco City, EC 12345</p>
              <p>Email: info@greenpackhub.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </Col>
        </Row>
        <hr className="my-4 bg-secondary" />
        <Row>
          <Col className="text-center text-muted">
            <p className="mb-0">
              &copy; {currentYear} GreenPackHub. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
