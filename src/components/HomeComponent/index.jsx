import { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import {
  LocalizationProvider,
  DatePicker,
  AdapterDayjs,
} from "@mui/x-date-pickers";

import axios from "axios";
import * as s from "../HomeComponent/styles";
import { useNavigate } from "react-router-dom";
import deleteButton from "../../assets/delete-button.gif";
import editButton from "../../assets/edit-button.gif";
import newButton from "../../assets/new-button.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../contexts/AuthContext";

export default function HomeComponent() {
  const { url } = useContext(AuthContext);
  console.log(url, "URLLL");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) navigate("/signin");
  const [tasks, setTasks] = useState();
  const [newTask, setNewTasks] = useState(false);
  const [open, setOpen] = useState(false);
  const [infosTask, setInfosTask] = useState({
    title: "",
    describe: "",
    priority: "",
    finalDate: null,
  });
  const [infosModal, setInfosModal] = useState({
    title: "Add new task!",
    button: "ADD",
    taskId: "",
  });
  useEffect(() => {
    axios({
      method: "GET",
      url: `${url}/tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((err) => console.log(err.data.error));
  }, [newTask]);

  function handleDateChange(date) {
    setInfosTask({ ...infosTask, finalDate: date });
  }

  function handleChange(event) {
    setInfosTask({ ...infosTask, priority: event.target.value });
  }
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function changeStatus(taskId) {
    axios({
      method: "put",
      url: `${url}/tasks/status/${taskId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setNewTasks(!newTask);
      })
      .catch((err) => console.log(err));
  }

  function deleteTask(taskId) {
    if (confirm("Do you want to delete this task?")) {
      axios({
        method: "DELETE",
        url: `${url}/tasks/${taskId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          toast.success("task deleted!");
          setNewTasks(!newTask);
          if (tasks.length === 0) {
            setTasks("");
          }
        })
        .catch((err) => {
          alert(err.response.data);
          console.log(err.response.data);
        });
    }
  }
  function getInfosTask(taskId) {
    axios({
      method: "get",
      url: `${url}/tasks/${taskId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setInfosTask({
          title: response.data.title,
          describe: response.data.describe,
          finalDate: null,
          priority: response.data.priority,
        });
        handleOpen();
      })
      .catch((err) => console.log(err));
  }
  async function sendTask() {
    if (infosModal.button === "EDIT") {
      axios({
        method: "put",
        url: `${url}/tasks/${infosModal.taskId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: infosTask,
      })
        .then((response) => {
          console.log(response);
          setInfosTask({
            describe: "",
            finalDate: "",
            title: "",
            priority: "",
          });
          toast.success("task edited!");

          setOpen(true);
          setNewTasks(!newTask);
          handleClose();
        })
        .catch((err) => {
          setInfosTask({
            describe: "",
            finalDate: null,
            title: "",
            priority: "",
          });
          console.log(err);
        });
    } else {
      axios({
        method: "POST",
        url: `${url}/tasks`,
        data: infosTask,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setInfosTask({
            describe: "",
            finalDate: null,
            title: "",
            priority: "",
          });
          toast.success("created a new task!");
          console.log(response);
          setNewTasks(!newTask);
          handleClose();
        })
        .catch((error) => {
          setInfosTask({
            describe: "",
            finalDate: null,
            title: "",
            priority: "",
          });
          console.log(error.response.data);
        });
    }
  }
  async function openModal(type, taskId) {
    if (type === "add") {
      setInfosModal({ ...infosModal, title: "Add new task!", button: "ADD" });
      handleOpen();
    }
    if (type === "edit") {
      setInfosModal({
        ...infosModal,
        title: "Edit task!",
        button: "EDIT",
        taskId: taskId,
      });
      getInfosTask(taskId);
    }
  }
  const Modalstyle = {
    position: "absolute",

    flexDirection: "column",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };
  return (
    <s.HomeContainer>
      <ToastContainer />
      <button className="addBtn" onClick={() => openModal("add")}>
        <img className="addnew" src={newButton} alt="add" /> Add Task
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {infosModal.title}
          </Typography>
          <div>
            <div className="inputbox">
              <TextField
                className="inputTask"
                id="standard-basic"
                label="title"
                variant="standard"
                value={infosTask.title}
                onChange={(e) => {
                  setInfosTask({ ...infosTask, title: e.target.value });
                }}
              />
            </div>
            <div className="inputbox">
              <TextField
                id="standard-basic"
                label="describe"
                variant="standard"
                value={infosTask.describe}
                onChange={(e) => {
                  setInfosTask({ ...infosTask, describe: e.target.value });
                }}
              />
            </div>
            <div className="inputbox">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Completion date"
                    value={infosTask.finalDate}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="inputbox">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={infosTask.priority}
                  onChange={handleChange}
                  label="Priority"
                >
                  <MenuItem value={"alta"}>alta</MenuItem>
                  <MenuItem value={"media"}>media</MenuItem>
                  <MenuItem value={"baixa"}>baixa</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <s.ButtonSubmit className="btnSubmit" onClick={sendTask}>
            {infosModal.button}
          </s.ButtonSubmit>
        </Box>
      </Modal>

      {tasks ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Final date</TableCell>
                <TableCell align="right">Describe</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                return (
                  <TableRow
                    style={{
                      backgroundColor:
                        task.status === "feito" ? "#14c32047" : "initial",
                    }}
                    key={task.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        changeStatus(task.id);
                      }}
                    >
                      {task.title}
                    </TableCell>
                    <TableCell align="right">{task.priority}</TableCell>
                    <TableCell align="right">
                      {task.finalDate.slice(0, 10)}
                    </TableCell>
                    <TableCell align="right">{task.describe}</TableCell>
                    <TableCell
                      align="right"
                      style={{
                        backgroundColor: "initial",
                      }}
                    >
                      <div className="images">
                        <img
                          style={{
                            backgroundColor:
                              task.status === "feito" ? "#14c32047" : "initial",
                          }}
                          className="image"
                          src={deleteButton}
                          alt="delete"
                          onClick={() => deleteTask(task.id)}
                        />
                        <img
                          className="image"
                          src={editButton}
                          onClick={() => {
                            openModal("edit", task.id);
                          }}
                          alt="edit"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Priority</TableCell>
                <TableCell align="right">Final date</TableCell>
                <TableCell align="right">Describe</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      )}
    </s.HomeContainer>
  );
}
