import Footer from "./components/Footer";
import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './Routes/Home';
import AddStudent from './Routes/AddStudent';
import EditStudent from './Routes/EditStudent';
import Student from './Routes/Student';
import NotFound from './Routes/NotFound';


const App = () => {
    return (
        <div>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="add" element={<AddStudent />}></Route>
            <Route path="student">
                <Route index element={<Student/>}></Route>
                <Route path=":id" element={<EditStudent/>}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
        </div>
    );
};

export default App;
