import React from "react";
import axios from "axios";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import styles from "../courses/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../loadingScreen";
import {connect} from 'react-redux';
import socket from '../../sockets/socket';


var className,
  batchName,
  courseName,
  sectionName,
  sectionId,
  attendance = [],
  componentThis,
  rollNoFoundStatus = false,
  tempId = null;
class AttendanceStudents extends React.Component {
  constructor() {
    super();
    componentThis = this;
    this.state = {
      dataArray: [],
      markedStudents: [],
      tempararyAttendance: [],
      loading: true,
    };
  }
  markedSuccess = (rollNo, name) => {
    toast.success(
      `Successfully Marked Present of Roll No ${rollNo} And Name Is ${name}!`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      }
    );
  };
  rollNoError = () => {
    toast.error("Incorrect RollNo!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  alreadyMarked = () => {
    toast.error("Already Marked!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  notFound = () => {
    toast.error("Roll Number Not Found!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  attendanceSaved = () => {
    toast.success("Attendance Saved Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  dateSelect = () => {
    toast.info("Date Set Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  attendanceHandler = () => {
    let self = this;
    let date = document.getElementById("datePicker").firstChild.firstChild
      .value;
    if (date === "" || null || undefined) {
      return (document.getElementById("errorAlertDiv").style.display = "block");
    }
    document.getElementById("errorAlertDiv").style.display = "none";
    attendance.unshift({
      date
    });
    let temporaryAttendanceMark = document.getElementById("tempCheck").value;
    if (temporaryAttendanceMark === "temporary") {
      axios
        .post(`/attendance/temporary/add`, {
          attendance,
          sectionId
        })
        .then(function(response) {
          document
            .getElementById("attSaveBtn")
            .setAttribute("disabled", "true");
          if (response.data.errors) {
            let errorMessage = response.data.errors.note.stringValue;
            document.getElementById("errorAlertDiv").style.display = "block";
            document.getElementById(
              "errorAlertDiv"
            ).innerText = `Error In ${errorMessage}`;
          }
          document.getElementById("attSaveBtn").removeAttribute("disabled");
          self.props.history.push("/attendance/view");
        })
        .catch(function(error) {
          alert(error);
        });
    } else {
      if (tempId !== null) {
        axios
          .post(`/attendance/temporary/remove`, {
            tempId
          })
          .then(function(response) {})
          .catch(function(error) {
            alert(error);
          });
      }
      axios
        .post(`/attendance/add`, {
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
          // document.getElementById('attSaveBtn').removeAttribute('disabled');
          self.attendanceSaved();
          setTimeout(() => {
            self.props.history.push("/attendance/view");
          }, 1500);
        })
        .catch(function(error) {
          alert(error);
        });
    }

    document.getElementById("attSaveBtn").setAttribute("disabled", "true");
  };
  onMarkAttendance = (data) => {
    let rollNo = document.getElementById("attendanceRollNo").value || data;
    if (!rollNo) {
      this.props.qrAuth && socket.callBackMessage('Incorrect RollNo!');
      return this.rollNoError();
    }
    attendance = attendance.map(Obj => {
      if (Obj.rollNo == rollNo) {
        rollNoFoundStatus = true;
        if (Obj.attendanceStatus === "Present") {
          this.props.qrAuth && socket.callBackMessage('Already Marked!');
          this.alreadyMarked();
          return Obj;
        }
        this.props.qrAuth && socket.callBackMessage(`Successfully Marked Present of Roll No ${Obj.rollNo} And Name Is ${Obj.name}!`);
        this.markedSuccess(Obj.rollNo, Obj.name);
        return {
          name: Obj.name,
          rollNo: Obj.rollNo,
          attendanceStatus: "Present"
        };
      }
      return Obj;
    });
    if (rollNoFoundStatus === false) {
      this.props.qrAuth && socket.callBackMessage('Roll Number Not Found!');
      this.notFound();
    }
    rollNoFoundStatus = false;
    document.getElementById("attendanceRollNo").value = "";
    
  };
  temporaryAttendanceHandler = tempAttendance => {
    let date = tempAttendance.attendance[0].date;
    attendance = tempAttendance.attendance;
    tempId = tempAttendance._id;
    document.getElementById("datePicker").value = date;
    // document.getElementById('temAttDiv').setAttribute('style', 'display:none;');
    document.getElementById("tempCheck").setAttribute("disabled", "true");
    this.dateSelect();
    var tempDiv = document.getElementById("temAttDiv");
    tempDiv.parentNode.removeChild(tempDiv);
  };
  componentDidMount() {
    let sectionObj = this.props.location.name
      ? JSON.parse(this.props.location.name)
      : JSON.parse(localStorage.getItem("sectionObj"));
    localStorage.setItem("sectionObj", JSON.stringify(sectionObj));
    sectionId = sectionObj._id;
    sectionName = sectionObj.name;
    localStorage.setItem("sectionName", sectionName);
    className = localStorage.getItem("className");
    batchName = localStorage.getItem("batchName");
    courseName = localStorage.getItem("courseName");
    var self = this;
    axios
      .post(`/attendance/temporary`, {
        sectionId
      })
      .then(function(response) {
        self.setState(() => ({
          tempararyAttendance: response.data
        }));
        // attendance = response.data.map((Obj) => {
        //     return {
        //         rollNo: Obj.rollNo,
        //         name: Obj.name,
        //         attendanceStatus: 'Absent'
        //     }
        // });
      })
      .catch(function(error) {
        alert(error);
      });
    axios
      .post(`/course/batch/class/section/student/active`, {
        sectionId
      })
      .then(function(response) {
        self.setState(() => ({
          dataArray: response.data,
          loading: false
        }));
        attendance = response.data.map(Obj => {
          return {
            rollNo: Obj.rollNo,
            name: Obj.name,
            attendanceStatus: "Absent"
          };
        });
        if (response.data.length === 0) {
          document
            .getElementById("attSaveBtn")
            .setAttribute("disabled", "true");
        }
      })
      .catch(function(error) {
        alert(error);
      });
  }
  cancelHandler = () => {
    tempId = null;
    document.getElementById("tempCheck").remove("disabled");
  };
  componentWillUnmount() {
    attendance = [];
  }
  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid">
        <div>
          <ToastContainer />
        </div>{" "}
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
            <Link to="/attendance/view">
              <button className="btn btn-outline-success btn-lg text-center mb-3">
                View Attendance{" "}
              </button>{" "}
            </Link>{" "}
          </div>{" "}
        </div>
        <h2 className="text-center m-5 display-4"> Mark Attendance </h2>{" "}
        <div className="alert alert-danger" id="errorAlertDiv">
          <strong> Error! </strong> error.{" "}
        </div>{" "}
        <div className="row h-100 justify-content-center align-items-center">
          <DatePicker
            placeholder="Select Date"
            mode="landscape"
            id="datePicker"
          />
        </div>{" "}
        <div className="container-fluid p-3 m-3 border">
          {" "}
          {this.state.dataArray.length === 0 ? (
            <div className="card m-3">
              <div className="card-body p-3 outerEffect">
                <h4 className="card-title text-center">
                  {" "}
                  There Is No Student{" "}
                </h4>{" "}
              </div>{" "}
            </div>
          ) : (
            <div>
              {" "}
              <div className="row h-100 justify-content-center align-items-center">
                <TextField
                  floatingLabelText="Enter Roll No To Mark Attendance"
                  floatingLabelStyle={styles.floatingLabelFocusStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  type="number"
                  id="attendanceRollNo"
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      componentThis.onMarkAttendance();
                    }
                  }}
                />{" "}
              </div>{" "}
              <div className="row h-100 justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg text-center m-5"
                  onClick={this.onMarkAttendance}
                >
                  Mark Attendance{" "}
                </button>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div className="row h-100 justify-content-center align-items-center">
          <h2 className="m-4 text-center"> Select Attendance Type </h2>{" "}
        </div>{" "}
        <div className="row h-100 justify-content-center align-items-center">
          <select className="form-control w-50" id="tempCheck">
            <option value="normal"> Normal </option>{" "}
            <option value="temporary"> Temporary </option>{" "}
          </select>{" "}
        </div>
        <div className="container-fluid text-center">
          <button
            className="btn btn-outline-success btn-lg text-center m-3"
            id="attSaveBtn"
            onClick={this.attendanceHandler}
          >
            Save Attendance{" "}
          </button>{" "}
          <Link to="/attendance/course/batches/classes/sections">
            {" "}
            <button
              className="btn btn-outline-success btn-lg text-center m-3"
              onClick={this.cancelHandler}
            >
              Cancel{" "}
            </button>
          </Link>
        </div>{" "}
        <div className="container-fluid text-center" id="temAttDiv">
          <h2 className="mt-3">Temparary Attendance </h2>{" "}
          {this.state.tempararyAttendance.length === 0 ? (
            <h2 className="text-center"> No Temparary Attendance Record </h2>
          ) : (
            this.state.tempararyAttendance.map((attendance, i) => {
              return (
                <div className="card m-2 d-sm-inline-flex p-2 col-sm-2" key={i}>
                  <div
                    className="card-body outerEffect"
                    onClick={() => this.temporaryAttendanceHandler(attendance)}
                  >
                    <h5 className="card-title text-center linksStyle">
                      {" "}
                      {attendance.attendance[0].date}{" "}
                    </h5>{" "}
                  </div>{" "}
                </div>
              );
            })
          )}{" "}
        </div>{" "}
        {this.props.qrAuth?componentThis.onMarkAttendance(this.props.qrData):null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    qrAuth: state.qrAuth,
    qrData: state.qrData
  }
}

export default connect(mapStateToProps)(AttendanceStudents);
