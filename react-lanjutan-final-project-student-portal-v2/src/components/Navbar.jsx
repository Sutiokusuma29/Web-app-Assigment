import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css'

const NavBar = () => {
    return (
       <div className="navbar">
           <h1>
               <Link as={RouterLink} data-testid="home-page" to="/" color="teal.500" _hover={{ textDecoration: 'underline' }}>Student Portal</Link>
           </h1>
           <h1>
               <Link  as={RouterLink} data-testid="student-page" to="/student" color="teal.500" _hover={{ textDecoration: 'underline' }}>All Student</Link>
           </h1>
           <h1>
               <Link  as={RouterLink} data-testid="add-page" to="/add" color="teal.500" _hover={{ textDecoration: 'underline' }}>Add Student</Link>
           </h1>
       </div>
    );
};

export default NavBar;
