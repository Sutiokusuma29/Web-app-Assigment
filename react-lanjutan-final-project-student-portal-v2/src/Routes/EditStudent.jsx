import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react';
import { Button, Input,} from '@chakra-ui/react'; 
import './EditStudent.css'
const url='http://localhost:3001/student'


const EditStudent = () => {
    const navigate = useNavigate()
    
    let { id } = useParams()
    const [siswa, setSiswa] = useState([]);
    const [loading, setLoading] = useState(true);


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


useEffect(() => {
    const fetchData = async () => {
        try {
            const dataStudent = await fetch(`${url}/${id}`);
            if (!dataStudent) {
                return (`HTTP error! status: ${dataStudent.status}`);
            }
            const data = await dataStudent.json();

            
            if (data && typeof data === 'object') {
                setSiswa(data);
            } else {
                console.error('Data tidak valid:', data);
            }
        } catch (err) {
            console.error('Gagal mengambil data siswa:', err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [id]);



const editSiswa = (e) => {
    e.preventDefault()
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...siswa,
            faculty :daftarFakultas(siswa.programStudy),
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.error){
            console.log(data.error)
            return
        }
        navigate("/student")
        e.target.reset()
        
    })
    .catch((err) =>{
        console.log(err)
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

            <form id="form-student" onSubmit={editSiswa}>

            <label 
            htmlFor="input-name">
                Fullname
            </label>
            <input id="input-name" name="input-name" type="text" data-testid="name"
             onChange={(e) => setSiswa({...siswa, fullname: e.target.value})} defaultValue={siswa?.fullname} className="test-input"/>
            
            <img src={siswa?.profilPicture} />
            <label 
            htmlFor="profilPicture">
                profilePicture
            </label>
            <input id="profilPicture" name="profilPicture" type="text" data-testid="profilPicture"
             onChange={(e) => setSiswa({...siswa, profilPicture: e.target.value})} defaultValue={siswa?.profilePicture} className="test-input"/>

            <label 
            htmlFor="address">
                address
            </label>
            <input id="address" name="address" type="text" data-testid="address"
             onChange={(e) => setSiswa({...siswa, address: e.target.value})} defaultValue={siswa?.address} className="test-input"/>

            <label 
            htmlFor="phoneNumber">
                phoneNumber
            </label>
            <input id="phoneNumber" name="phoneNumber" type="text" data-testid="phoneNumber"
             onChange={(e) => setSiswa({...siswa, phoneNumber: e.target.value})} defaultValue={siswa?.phoneNumber} className="test-input"/>

            <label 
            htmlFor="input-date">
                Birth Date
            </label>
            <input id="input-date" name="input-date" type="date" data-testid="date"
             onChange={(e) => setSiswa({...siswa, birthDate: e.target.value})} defaultValue={siswa?.birthDate} className="test-input"/>

            <label 
            htmlFor="input-gender">
                Gender
            </label>
            <select id="input-gender" name="input-gender" data-testid="gender"  onChange={(e) =>setSiswa({...siswa, gender: e.target.value})} defaultValue={siswa?.gender} className="test-input">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label 
            htmlFor="input-prody">
                Program Study
            </label>
            <select id="input-prody" name="input-prody" data-testid="prody" onChange={(e) => setSiswa({...siswa, programStudy: e.target.value})} defaultValue={siswa?.programStudy} className="test-input">
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
                data-testid="edit-btn">
                        Edit Student
                    </Button>
        
       
        </form>
            )}
        </div>

    );

};



export default EditStudent;
