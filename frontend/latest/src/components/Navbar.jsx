import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/student" className="nav-link">Student</Link>
      <Link to="/driver" className="nav-link">Driver</Link>
      <Link to="/schedule" className="nav-link">Schedule</Link>
    </nav>
  );
};

export default Navbar; 