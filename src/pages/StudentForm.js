import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";

const StudentForm = () => {
  const [studentData, setStudentData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getStudentById = async (studentId) => {
    try {
      const studentsResponse = await axiosInstance().get('/students/' + studentId);
      setStudentData(studentsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postStudent = async (student) => {
    try {
      await axiosInstance().post('/students', student);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  const putStudent = async (student) => {
    try {
      await axiosInstance().put('/students/' + student.id, student);
      history.push("/produk");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      const queryString = history.location.search
      const urlParams = new URLSearchParams(queryString);
      const studentId = urlParams.get('student_id')
      if (studentId) {
        getStudentById(studentId)
        setIsEditMode(true)
      }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const payload = {
        nim: e.target.nim?.value,
        name: e.target.name?.value,
        address: e.target.address?.value,
        gender: e.target.gender1?.checked ? 'male' : 'female',
        hoby: e.target.hoby?.value,
        comments: e.target.comments?.value,
      }
      if (isEditMode) {
        await putStudent({ ...studentData, ...payload })
      } else {
        await postStudent(payload)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
      <div className="p-5">
        <div class="card m-auto" style={{ width: '700px' }}>
          <h3 className="p-3">{isEditMode ? 'Ubah Murid' : 'Murid Baru'}</h3>
            <div class="card-body">
              <form onSubmit={onSubmit} onChange={e => console.log(e)}>
                <div class="mb-3">
                  <label for="nim" class="form-label">
                    NIM
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="nim"
                    aria-describedby="nim"
                    placeholder="NIM"
                    defaultValue={studentData?.nim}
                  />
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label">
                    Nama
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    aria-describedby="name"
                    placeholder="Nama"
                    defaultValue={studentData?.name}
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">
                    Alamat
                  </label>
                  <textarea
                    class="form-control"
                    id="address"
                    aria-describedby="address"
                    placeholder="Alamat"
                    defaultValue={studentData?.address}
                  />
                </div>
                <div class="mb-3">
                  <p class="form-label" style={{ margin: 0 }}>
                    Jenis Kelamin
                  </p>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender1" />
                    <label class="form-check-label" for="gender1">
                      Laki-Laki
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" id="gender2" />
                    <label class="form-check-label" for="gender2">
                      Perempuan
                    </label>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="hoby" class="form-label">
                    Hobi
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="hoby"
                    aria-describedby="hoby"
                    placeholder="Hobi"
                    defaultValue={studentData?.hoby}
                  />
                </div>
                <div class="mb-3">
                  <label for="comments" class="form-label">
                    Komentar
                  </label>
                  <textarea
                    class="form-control"
                    id="comments"
                    aria-describedby="comments"
                    placeholder="Komentar"
                    defaultValue={studentData?.comments}
                  />
                </div>
                <div className='container-fluid d-flex p-0'>
                  <button class="btn btn-primary me-2" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </>
                    ) : (
                      'Simpan'
                    )}
                  </button>
                  <button type="button" class="btn btn-outline-danger me-auto" onClick={() => history.push('/')}>
                    Batal
                  </button>
                  <button type="reset" class="btn btn-outline-secondary">
                    Reset
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
  );
};

export default StudentForm;
