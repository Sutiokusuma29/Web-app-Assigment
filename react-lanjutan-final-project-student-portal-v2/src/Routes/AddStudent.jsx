import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import './AddStudent.css'
const url='http://localhost:3001/student'


const AddStudents = () => {
    const navigate = useNavigate()
    const [nameStudent, setNameStudent] = useState("");
    const [dateStudent, setDateStudent] = useState("");
    const [genderStudent, setGenderStudent] = useState("");
    const [prodyStudy, setProdyStudy] = useState("");
    const [pictureStudent, setPictureStudent] = useState("");
    const [addressStudent, setAddressStudent] = useState("");
    const [phoneStudent, setPhoneStudent] = useState("");

    const [loading, setLoading] = useState(false);


const daftarFakultas = (prody) => {
    switch (prody) {
        case "Ekonomi":
        case "Manajemen":
        case "Akuntansi":
            return "Fakultas Ekonomi";
        case "Administrasi Publik":
        case "Administrasi Bisnis":
        case "Hubungan Internasional":
            return "Fakultas Ilmu Sosial dan Politik";
        case "Teknik Sipil":
        case "Arsitektur":
            return "Fakultas Teknik";
        case "Matematika":
        case "Fisika":
        case "Informatika":
            return "Fakultas Teknologi Informasi dan Sains";
        default:
            return "Fakultas Tidak Diketahui"; 
            
    }
}

const handleAddStudent = (e) => {
    e.preventDefault()
    setLoading(true);
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            fullname: nameStudent,	
            birthDate: dateStudent,	
            gender:	genderStudent,
            faculty: daftarFakultas(prodyStudy),	
            programStudy: prodyStudy,
            profilePicture: pictureStudent,
            address: addressStudent,
            phoneNumber: phoneStudent,
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.error){
            console.log(data.error)
            return
        }
        console.log("Data berhasil ditambahkan:", data);
        navigate("/student")
      
        
    })
    .catch((err) =>{
        console.log(err)
        setLoading(false);
    })
}

    return (
        <div>
            <Navbar />
           
            {
            loading ? (
                <p>Loading ...</p>
            ) :
            (
                <form id="form-student" onSubmit={handleAddStudent}>

            <label 
             htmlFor="input-name">
                Fullname
            </label>
                  <input id="input-name" name="input-name" type="text" data-testid="name"
                  onChange={(e) => setNameStudent(e.target.value)} className="test-input"/>

            <label 
             htmlFor="profilPicture">
               profilePicture
            </label>
                 <input id="profilPicture" name="profilPicture" type="text" data-testid="profilePicture"
                 onChange={(e) => setPictureStudent(e.target.value)} className="test-input"/>

            <label 
             htmlFor="address">
               address
            </label>
                 <input id="address" name="address" type="text" data-testid="address"
                  onChange={(e) => setAddressStudent(e.target.value)} className="test-input"/>

            <label 
             htmlFor="phoneNumber">
              phoneNumber
            </label>
                 <input id="phoneNumber" name="phoneNumber" type="text" data-testid="phoneNumber"
                  onChange={(e) => setPhoneStudent(e.target.value)} className="test-input"/>

            <label 
             htmlFor="input-date">
             Birth Date
            </label>
                  <input id="input-date" name="input-date" type="date" data-testid="date"
                   onChange={(e) => setDateStudent(e.target.value)}/>

            <label 
            htmlFor="input-gender">
              Gender
            </label>
              <select id="input-gender" name="input-gender" data-testid="gender"  onChange={(e) => setGenderStudent(e.target.value)}>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
              </select>

            <label 
             htmlFor="input-prody">
             Program Study
            </label>
            <select id="input-prody" name="input-prody" data-testid="prody" onChange={(e) => setProdyStudy(e.target.value)} className="test-input">
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen"> Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional"> Hubungan Internasional </option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika"> Fisika</option>
            <option value="Informatika">Informatika</option>
           </select>
             <Button 
                colorScheme="blue" 
                type="submit" 
                id="add-btn" 
                value="Add student" 
                name="add-btn" 
                data-testid="add-btn"
                className="test-button">
                  Add student
            </Button>
            

              </form>
            )}
           </div>
           
        
        
        );
};



export default AddStudents;