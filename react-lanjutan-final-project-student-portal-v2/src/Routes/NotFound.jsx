import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react';
import './NotFound.css'

const NotFound = () => {
    const navigate = useNavigate();

    return (
       <div>
        <h1>404 Not Found</h1>
        <Button data-testid="back" onClick={() => {navigate(-1)}} colorScheme="teal">back</Button>
       </div>
    );
};

export default NotFound;
