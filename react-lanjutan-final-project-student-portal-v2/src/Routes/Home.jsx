import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; 
import './Home.css';
import './Halaman.css'

const Home = () => {
   const navigate = useNavigate();

    return (
        <Button 
            className="button" 
            data-testid="student-btn" 
            onClick={() => navigate("/student")}
            colorScheme="blue" 
        >
            ALL STUDENT
        </Button>
    );
};

export default Home;
