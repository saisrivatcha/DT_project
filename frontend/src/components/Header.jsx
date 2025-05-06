import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaLeaf } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <FaLeaf className="me-2" /> GreenPackHub
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/products" className="nav-link">
                Products
              </Link>
              <Link to="/cart" className="nav-link">
                <FaShoppingCart /> Cart
                {cartCount > 0 && (
                  <Badge pill bg="success" className="ms-1">
                    {cartCount}
                  </Badge>
                )}
              </Link>
              {isAuthenticated ? (
                <NavDropdown title={user.name} id="username">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item">
                    Orders
                  </Link>
                  {isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <Link to="/admin/products" className="dropdown-item">
                        Products
                      </Link>
                      <Link to="/admin/orders" className="dropdown-item">
                        Orders
                      </Link>
                      <Link to="/admin/feedback" className="dropdown-item">
                        Feedback
                      </Link>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link">
                  <FaUser /> Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
