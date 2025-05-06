import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash, FaArrowLeft, FaLeaf } from 'react-icons/fa';
import CartContext from '../context/CartContext';
import Message from '../components/Message';

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, Number(quantity));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty. <Link to="/products">Go back to products</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="py-3">
                  <Row className="align-items-center">
                    <Col xs={3} sm={2}>
                      <Image 
                        src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                        alt={item.name} 
                        fluid 
                        rounded 
                      />
                    </Col>
                    <Col xs={9} sm={3}>
                      <Link to={`/products/${item._id}`} className="text-decoration-none">
                        {item.name}
                      </Link>
                      <div className="d-flex align-items-center mt-1">
                        <small className="text-muted me-2">Eco Score:</small>
                        {[...Array(item.ecoScore)].map((_, i) => (
                          <FaLeaf key={i} className="text-success" style={{ fontSize: '0.8rem' }} />
                        ))}
                      </div>
                    </Col>
                    <Col sm={2} className="text-center">
                      <span className="text-success fw-bold">₹{item.price.toFixed(2)}</span>
                    </Col>
                    <Col sm={3}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                        className="form-select"
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col sm={2} className="text-end">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        <FaTrash className="text-danger" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant="outline-danger" 
                    className="btn-sm"
                    onClick={clearCart}
                    disabled={cartItems.length === 0}
                  >
                    Clear Cart
                  </Button>
                  <Link to="/products" className="btn btn-outline-secondary btn-sm">
                    <FaArrowLeft className="me-1" /> Continue Shopping
                  </Link>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col className="text-end">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Subtotal:</Col>
                      <Col className="text-end text-success fw-bold">₹{cartTotal.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col className="text-end">
                        {cartTotal > 1000 ? (
                          <span className="text-success">Free</span>
                        ) : (
                          <span>₹100.00</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col className="text-end text-success fw-bold">
                        ₹{(cartTotal > 1000 ? cartTotal : cartTotal + 100).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  type="button"
                  className="btn btn-success w-100 mt-3"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
