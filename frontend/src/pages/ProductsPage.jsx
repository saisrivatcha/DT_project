import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProducts } from '../utils/api';

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0
  });

  // Get category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);

  // Fetch products based on filters and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const queryParams = {
          page: pagination.page,
          limit: pagination.limit
        };
        
        // Add filters if they exist
        if (filters.category) queryParams.category = filters.category;
        if (filters.minPrice) queryParams.price[gte] = filters.minPrice;
        if (filters.maxPrice) queryParams.price[lte] = filters.maxPrice;
        
        // Add sorting
        if (filters.sort === 'newest') queryParams.sort = '-createdAt';
        else if (filters.sort === 'priceAsc') queryParams.sort = 'price';
        else if (filters.sort === 'priceDesc') queryParams.sort = '-price';
        else if (filters.sort === 'ecoScore') queryParams.sort = '-ecoScore';
        
        const response = await getProducts(queryParams);
        
        setProducts(response.data);
        setPagination({
          ...pagination,
          total: response.count,
          totalPages: Math.ceil(response.count / pagination.limit)
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, pagination.page, pagination.limit]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Sustainable Packaging Products</h1>
      
      <Row>
        {/* Filters Sidebar */}
        <Col md={3} className="mb-4">
          <div className="bg-light p-3 rounded">
            <h4 className="mb-3">
              <FaFilter className="me-2" /> Filters
            </h4>
            
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="Biodegradable">Biodegradable</option>
                  <option value="Reusable">Reusable</option>
                  <option value="Compostable">Compostable</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Price Range</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                >
                  <option value="newest">Newest</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="ecoScore">Eco Score</option>
                </Form.Select>
              </Form.Group>
              
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => setFilters({
                  category: '',
                  minPrice: '',
                  maxPrice: '',
                  sort: 'newest'
                })}
              >
                Clear Filters
              </Button>
            </Form>
          </div>
        </Col>
        
        {/* Products Grid */}
        <Col md={9}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : products.length === 0 ? (
            <Message>No products found matching your criteria</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First
                      onClick={() => handlePageChange(1)}
                      disabled={pagination.page === 1}
                    />
                    <Pagination.Prev
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    />
                    
                    {[...Array(pagination.totalPages).keys()].map((x) => (
                      <Pagination.Item
                        key={x + 1}
                        active={x + 1 === pagination.page}
                        onClick={() => handlePageChange(x + 1)}
                      >
                        {x + 1}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                    />
                    <Pagination.Last
                      onClick={() => handlePageChange(pagination.totalPages)}
                      disabled={pagination.page === pagination.totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
