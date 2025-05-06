import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaShoppingBag } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getMyOrders } from '../utils/api';

const ProfilePage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile update validation schema
  const profileValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  // Password change validation schema
  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required')
      .min(6, 'Password must be at least 6 characters'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
  });

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (isAuthenticated) {
        try {
          setLoadingOrders(true);
          const data = await getMyOrders();
          setOrders(data.orders || []);
          setLoadingOrders(false);
        } catch (err) {
          setOrdersError('Failed to load orders');
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  // Handle profile update
  const handleProfileUpdate = async (values) => {
    try {
      setLoading(true);
      setError(null);

      // This would be implemented with an API call to update the user profile
      // For now, we'll just show a success message
      toast.success('Profile updated successfully!');

      setLoading(false);
    } catch (err) {
      setError('Failed to update profile');
      toast.error('Failed to update profile');
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (values, { resetForm }) => {
    try {
      setLoading(true);
      setError(null);

      // This would be implemented with an API call to change the password
      // For now, we'll just show a success message
      toast.success('Password changed successfully!');

      resetForm();
      setLoading(false);
    } catch (err) {
      setError('Failed to change password');
      toast.error('Failed to change password');
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex flex-column align-items-center text-center mb-4">
                <div className="bg-success rounded-circle p-3 mb-3">
                  <FaUser size={40} className="text-white" />
                </div>
                <h5 className="mb-0">{user?.name}</h5>
                <p className="text-muted">{user?.email}</p>
                <small className="badge bg-success">{user?.role}</small>
              </div>

              <div className="list-group">
                <Button
                  variant={activeTab === 'profile' ? 'success' : 'outline-success'}
                  className="list-group-item list-group-item-action mb-2"
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className="me-2" /> Profile Information
                </Button>
                <Button
                  variant={activeTab === 'password' ? 'success' : 'outline-success'}
                  className="list-group-item list-group-item-action mb-2"
                  onClick={() => setActiveTab('password')}
                >
                  <FaLock className="me-2" /> Change Password
                </Button>
                <Button
                  variant={activeTab === 'orders' ? 'success' : 'outline-success'}
                  className="list-group-item list-group-item-action"
                  onClick={() => setActiveTab('orders')}
                >
                  <FaShoppingBag className="me-2" /> My Orders
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          {activeTab === 'profile' && (
            <Card>
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Profile Information</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Formik
                  initialValues={{
                    name: user?.name || '',
                    email: user?.email || ''
                  }}
                  validationSchema={profileValidationSchema}
                  onSubmit={handleProfileUpdate}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? <Loader /> : 'Update Profile'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'password' && (
            <Card>
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Change Password</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }}
                  validationSchema={passwordValidationSchema}
                  onSubmit={handlePasswordChange}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter current password"
                          name="currentPassword"
                          value={values.currentPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.currentPassword && errors.currentPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.currentPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter new password"
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.newPassword && errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm new password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.confirmPassword && errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? <Loader /> : 'Change Password'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card>
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">My Orders</h4>
              </Card.Header>
              <Card.Body>
                {ordersError && <Alert variant="danger">{ordersError}</Alert>}

                {loadingOrders ? (
                  <Loader />
                ) : orders.length === 0 ? (
                  <Message>You have no orders yet.</Message>
                ) : (
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>₹{order.totalPrice.toFixed(2)}</td>
                          <td>
                            {order.isPaid ? (
                              <span className="text-success">
                                {new Date(order.paidAt).toLocaleDateString()}
                              </span>
                            ) : (
                              <span className="text-danger">Not Paid</span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <span className="text-success">
                                {new Date(order.deliveredAt).toLocaleDateString()}
                              </span>
                            ) : (
                              <span className="text-danger">Not Delivered</span>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="light"
                              size="sm"
                              className="btn-sm"
                              onClick={() => {
                                // This would navigate to order details
                                // For now, we'll just show a message
                                toast.info(`View Order ${order._id}`);
                              }}
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
