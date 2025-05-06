import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaLeaf, FaShoppingCart } from 'react-icons/fa';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  // Function to render eco score as leaf icons
  const renderEcoScore = (score) => {
    const leafs = [];
    for (let i = 0; i < score; i++) {
      leafs.push(<FaLeaf key={i} className="text-success" />);
    }
    return leafs;
  };

  return (
    <Card className="h-100 product-card">
      <div className="position-relative">
        <Link to={`/products/${product._id}`}>
          <Card.Img 
            variant="top" 
            src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
            alt={product.name}
            className="product-image"
          />
        </Link>
        <Badge 
          bg="success" 
          className="position-absolute top-0 end-0 m-2"
        >
          {product.category}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Link to={`/products/${product._id}`} className="text-decoration-none">
          <Card.Title as="h5">{product.name}</Card.Title>
        </Link>
        <Card.Text className="text-muted mb-1">
          Material: {product.material}
        </Card.Text>
        <Card.Text className="mb-2">
          <small className="text-muted">Eco Score: </small>
          <span>{renderEcoScore(product.ecoScore)}</span>
        </Card.Text>
        <Card.Text className="product-price mb-3">
        ₹{product.price.toFixed(2)}
        </Card.Text>
        <div className="mt-auto">
          <Button 
            variant="outline-success" 
            className="w-100"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <FaShoppingCart className="me-2" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
