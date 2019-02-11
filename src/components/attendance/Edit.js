import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var className,
  batchName,
  courseName,
  sectionName,
  sectionId,
  attendanceDate,
  attendance = [];
class AttendanceEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: []
    };
  }
  editSuccess = () => {
    toast.success("Attendance Edit Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  attendanceEditHandler = () => {
    let self = this;
    let rollNo, name, attendanceStatus;
    attendance.push({
      date: attendanceDate
    });
    if (this.state.dataArray.length !== 0) {
      for (let i = 1; i < this.state.dataArray.length; i++) {
        rollNo = document.getElementById(i).firstChild.innerHTML;
        name = document.getElementById(i).children[1].innerHTML;
        attendanceStatus = document.getElementById(i).children[2].firstChild
          .value;
        attendance.push({
          rollNo,
          name,
          attendanceStatus
        });
      }
    }
    localStorage.setItem("attendanceArr", JSON.stringify(attendance));
    axios
      .post("/attendance/edit", {
        attendance,
        sectionId
      })
      .then(function(response) {
        if (response.data.errors) {
          let errorMessage = response.data.errors.note.stringValue;
          document.getElementById("errorAlertDiv").style.display = "block";
          document.getElementById(
            "errorAlertDiv"
          ).innerText = `Error In ${errorMessage}`;
        }
        self.editSuccess();
        setTimeout(() => {
          self.props.history.push("/attendance/view/details");
        }, 2000);
      })
      .catch(function(error) {
        alert(error);
      });
  };
  componentDidMount() {
    let attendanceArr = JSON.parse(localStorage.getItem("attendanceArr"));
    this.setState({
      dataArray: attendanceArr
    });
    let sectionObj = JSON.parse(localStorage.getItem("sectionObj"));
    sectionId = sectionObj._id;
    attendanceDate = attendanceArr[0].date;
    className = localStorage.getItem("className");
    batchName = localStorage.getItem("batchName");
    courseName = localStorage.getItem("courseName");
    sectionName = localStorage.getItem("sectionName");
  }
  componentWillUnmount() {
    attendance = [];
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="container-fluid border mt-3">
          <h1 className="text-center m-5 display-4">
            <Link to={`/attendance`}>
              <span className="text-dark"> {courseName}/</span>
            </Link>{" "}
            <Link to={`/attendance/course/batches`}>
              <span className="text-dark"> {batchName}/</span>
            </Link>{" "}
            <Link to={`/attendance/course/batches/classes`}>
              <span className="text-dark"> {className}/</span>
            </Link>{" "}
            <Link to={`/attendance/course/batches/classes/sections`}>
              <span className="text-dark"> {sectionName} </span>{" "}
            </Link>{" "}
          </h1>{" "}
          <div className="container-fluid text-center">
            <Link to="/attendance/view/details">
              <button className="btn btn-outline-success btn-lg text-center mb-3">
                Back{" "}
              </button>{" "}
            </Link>{" "}
          </div>{" "}
        </div>
        <h1 className="text-center m-5 display-4">
          {" "}
          Edit Atendance Of {attendanceDate}{" "}
        </h1>{" "}
        <div>
          <ToastContainer />
        </div>{" "}
        <div className="alert alert-danger" id="errorAlertDiv">
          <strong> Error! </strong> error.{" "}
        </div>{" "}
        <div className="row h-100 justify-content-center align-items-center">
          {" "}
          {this.state.dataArray.length === 0 ? (
            <h2 className="text-center"> No Attendance Record </h2>
          ) : (
            this.state.dataArray.map((attendance, i) => {
              return (
                <div
                  className={
                    i === 0
                      ? "d-none"
                      : "card m-2 text-center d-sm-inline-flex p-2"
                  }
                  key={i}
                >
                  <div className="card-body outerEffect" id={i}>
                    <h5 className="card-title text-center">
                      {" "}
                      {attendance.rollNo}{" "}
                    </h5>{" "}
                    <h5 className="card-title text-center">
                      {" "}
                      {attendance.name}{" "}
                    </h5>{" "}
                    <div className="form-group">
                      <select className="form-control">
                        <option value={attendance.attendanceStatus}>
                          {" "}
                          {`${attendance.attendanceStatus} (Current)`}{" "}
                        </option>{" "}
                        <option value="Absent"> Absent </option>{" "}
                        <option value="Present"> Present </option>{" "}
                        <option value="Leave"> Leave </option>{" "}
                      </select>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              );
            })
          )}{" "}
        </div>{" "}
        <div className="container-fluid text-center">
          <button
            className="btn btn-outline-success btn-lg text-center mb-5"
            onClick={this.attendanceEditHandler}
          >
            Save Changes{" "}
          </button>{" "}
          <Link to="/attendance/view/details">
            <button className="btn btn-outline-success btn-lg text-center mb-5">
              Cancel{" "}
            </button>{" "}
          </Link>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default AttendanceEdit;
