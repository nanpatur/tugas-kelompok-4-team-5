import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";

const user = {
  email: "user@mail.com",
  password: "123456",
};

const Home = () => {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    const getStudents = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance().get("/students");
        setStudentList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
    getStudents()
  }, [])

  return (
    <div
      className="App container-fluid"
      style={{ minHeight: "100vh" }}
    >
      <nav class="navbar navbar-expand-lg navbar-light bg-light px-5">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <button class="btn btn-primary" type="submit" onClick={() => history.push('/student-form')}>Tambah data +</button>
        </div>
      </nav>
      <div className='m-5'>

        <table className='table table-bordered' style={{ width: '100%'}}>
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Jenis Kelamin</th>
              <th>Hobi</th>
              <th>Lokasi</th>
              <th>Komentar</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr>
                <td>{student.nim}</td>
                <td>{student.name}</td>
                <td>{student.address}</td>
                <td>{student.gender === 'male' ? 'Laki-Laki' : 'Perempuan'}</td>
                <td>{student.hoby}</td>
                <td>{student.location}</td>
                <td>{student.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home