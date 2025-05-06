import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products API
export const getProducts = async (filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await api.get(`/products?${queryString}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMyOrders = async () => {
  try {
    const response = await api.get('/orders/myorders');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateOrderToPaid = async (id, paymentResult) => {
  try {
    const response = await api.put(`/orders/${id}/pay`, paymentResult);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Feedback API
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMyFeedback = async () => {
  try {
    const response = await api.get('/feedback/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin API
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateOrderToDelivered = async (id) => {
  try {
    const response = await api.put(`/orders/${id}/deliver`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllFeedback = async () => {
  try {
    const response = await api.get('/feedback');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const uploadProductImage = async (formData) => {
  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
