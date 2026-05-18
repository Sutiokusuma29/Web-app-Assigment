import Navbar  from "../components/Navbar"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Button, Select } from "@chakra-ui/react";
import './Student.css'

const url = 'http://localhost:3001/student'


const Student = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStudent, setFilterStudent] = useState("All")

    const setDaftarFakultas = new Set()
    for(const val of students){
        setDaftarFakultas.add(val.faculty)
    }
    
    const daftarFakultas = [...setDaftarFakultas]

    const namaStudents = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setStudents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
        const onDeleteStudent = (id) => {
            fetch(`${url}/${id}`, {
               method: 'DELETE',
            })
            .then(() => { namaStudents()})
            .catch((err) => {
                console.log(err)
            })
           }
        useEffect(() => {
            namaStudents()
        }, []);

    return (
       <div>
        <Navbar />
        <Select data-testid="filter" onChange={(e) => setFilterStudent(e.target.value)} placeholder="Select Faculty">
                <option value="All">All</option>
                {daftarFakultas.map((faculty, index) => {
                    return (
                        <option key={index} value={faculty}>{faculty}</option>
                    );
                })}
            </Select>
       {
       
            loading ? (
                <p>Loading ...</p>
            ) : (
                <table  className="test-table test-table-container" id="table-student">
            <thead className="test-thead">
                <tr className="test-tr">
                    <th className="test-th">No</th>
                    <th className="test-th">ID</th>
                    <th className="test-th">Full Name</th>
                    <th className="test-th">Birth Date</th>
                    <th className="test-th">Gender</th>
                    <th className="test-th">Faculty</th>
                    <th className="test-th">Program Study</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody className="test-tbody">
    {students
        .filter((student) => {
           
            return filterStudent === "All" || student.faculty === filterStudent;
        })
        .map((student, index) => {
            return (
                <tr key={student.id} className="test-tr student-data-row">
                    <td className="test-td">{index + 1}</td>
                    <td className="test-td">{student.id}</td>
                    <td className="test-td"><Link to={`/student/${student.id}`}>{student.fullname}</Link></td>
                    <td className="test-td">{student.birthDate}</td>
                    <td className="test-td">{student.gender}</td>
                    <td className="test-td">{student.faculty}</td>
                    <td className="test-td">{student.programStudy}</td>
                    <td className="test-td">
                    <Button 
                        colorScheme="red" 
                        onClick={() => onDeleteStudent(student.id)} 
                        data-testid={`delete-${student.id}`}
                        >
                         Delete
                        </Button>
                    </td>
                </tr>
            );
        })}
</tbody>

         </table>
       )
      }
</div>
);
};

export default Student;



