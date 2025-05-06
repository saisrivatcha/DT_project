import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '50px',
          height: '50px',
          margin: 'auto',
          display: 'block',
          color: '#28a745'
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
