import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf, FaRecycle, FaSeedling } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProducts } from '../utils/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ limit: 4 });
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured products');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section bg-success text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">Sustainable Packaging for a Greener Future</h1>
              <p className="lead mb-4">
                Discover eco-friendly packaging solutions that reduce environmental impact
                without compromising on quality or performance.
              </p>
              <div className="d-flex gap-2">
                <Link to="/products">
                  <Button variant="light" size="lg">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline-light" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded"
                    src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Sustainable packaging"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 rounded"
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Eco-friendly materials"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose GreenPackHub?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <FaLeaf className="text-success mb-3" size={50} />
                <h3>Eco-Friendly</h3>
                <p>
                  All our packaging solutions are made from sustainable materials
                  that minimize environmental impact.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <FaRecycle className="text-success mb-3" size={50} />
                <h3>Recyclable</h3>
                <p>
                  Our products are designed for easy recycling, helping to reduce
                  waste and promote circular economy.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <FaSeedling className="text-success mb-3" size={50} />
                <h3>Biodegradable</h3>
                <p>
                  Many of our packaging options are biodegradable, breaking down
                  naturally without harming the environment.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Products</h2>
            <Link to="/products">
              <Button variant="outline-success">View All</Button>
            </Link>
          </div>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row>
              {featuredProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default HomePage;
