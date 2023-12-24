import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "./Student.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Student = () => {
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [student, setStudents] = useState([]);
  const [input, setInput] = useState({
    name: "",
    class: "",
    roll: "",
    age: "",
    gender: "",
    photo: "",
  });

  const handleInputValue = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStudentData = async () => {
    const getData = await axios.get("http://localhost:7070/students");

    setStudents(getData.data);
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    if (
      !input.name ||
      !input.class ||
      !input.roll ||
      !input.age ||
      !input.gender
    ) {
      toast("All Fields Are required");
    } else {
      toast("Data Has Saved");
      await axios.post("http://localhost:7070/students", input);
      setInput({
        name: "",
        class: "",
        roll: "",
        age: "",
        gender: "",
        photo: "",
      });

      handleModalOff();
      handleStudentData();
    }
  };
  // Update Students
  const handleStudentEdit = (id) => {
    setInput(student.find((data) => data.id === id));
    handleModalEditShow();
  };
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:7070/students/${input.id}`, input);
    handleStudentData();
    handleModalEditOff();
  };
  // Delete Student
  const handleStudentDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:7070/students/${id}`);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        handleStudentData();
      }
    });
  };

  const handleModalShow = () => {
    setModal(true);
  };

  const handleModalOff = () => {
    setModal(false);
    setInput({
      name: "",
      class: "",
      roll: "",
      age: "",
      gender: "",
      photo: "",
    });
  };

  const handleModalEditShow = () => {
    setModalEdit(true);
  };

  const handleModalEditOff = () => {
    setModalEdit(false);
  };

  useEffect(() => {
    handleStudentData();
  }, []);

  return (
    <>
      <Container className="my-5">
        <Row className="my-5 justify-content-center">
          <Col md={8}>
            <Button
              className="mb-3"
              variant="success"
              onClick={handleModalShow}
            >
              Create a Student
            </Button>
            <Card>
              <Card.Header>
                <Card.Title>All Students Data</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Roll</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.map((item, index) => {
                      return (
                        <tr className="align-middle" key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              style={{
                                width: "65px",
                                height: "65px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              src={item.photo}
                              alt=""
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.class}</td>
                          <td>{item.roll}</td>
                          <td>{item.age}</td>
                          <td>{item.gender}</td>
                          <td>
                            <Button variant="info" className="btn-sm me-2">
                              <FaRegEye />
                            </Button>
                            <Button
                              variant="warning"
                              className="btn-sm me-2"
                              onClick={() => {
                                handleStudentEdit(item.id);
                              }}
                            >
                              <FaRegEdit />
                            </Button>
                            <Button
                              variant="danger"
                              className="btn-sm mr-2"
                              onClick={() => {
                                handleStudentDelete(item.id);
                              }}
                            >
                              <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Student Create Modal */}
      <Modal show={modal} centered onHide={handleModalOff}>
        <Modal.Header>Create New Student</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCreateStudent}>
            <div className="my-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Class"
                className="form-control"
                name="class"
                value={input.class}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Roll"
                className="form-control"
                name="roll"
                value={input.roll}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Age"
                className="form-control"
                name="age"
                value={input.age}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Gender"
                className="form-control"
                name="gender"
                value={input.gender}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Photo"
                className="form-control"
                name="photo"
                value={input.photo}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Student Edit Modal */}
      <Modal show={modalEdit} centered onHide={handleModalEditOff}>
        <Modal.Header>Update Student</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateStudent}>
            <div className="my-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                name="name"
                value={input.name}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Class"
                className="form-control"
                name="class"
                value={input.class}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Roll"
                className="form-control"
                name="roll"
                value={input.roll}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Age"
                className="form-control"
                name="age"
                value={input.age}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Gender"
                className="form-control"
                name="gender"
                value={input.gender}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="Photo"
                className="form-control"
                name="photo"
                value={input.photo}
                onChange={handleInputValue}
              />
            </div>
            <div className="my-3">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Student;
