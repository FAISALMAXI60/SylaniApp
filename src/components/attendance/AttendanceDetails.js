import React from "react";
import { Link } from "react-router-dom";

var className,
  batchName,
  courseName,
  sectionName,
  attendanceDate,
  attendanceArr;
class AttendanceDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: []
    };
  }
  componentDidMount() {
    attendanceArr = this.props.location.name
      ? JSON.parse(this.props.location.name)
      : JSON.parse(localStorage.getItem("attendanceArr"));
    localStorage.setItem("attendanceArr", JSON.stringify(attendanceArr));
    this.setState({
      dataArray: attendanceArr
    });
    attendanceDate = attendanceArr[0].date;
    attendanceArr.shift();
    attendanceArr.unshift({
      name: "Name",
      rollNo: "RollNo",
      status: "Attendance Status"
    });
    className = localStorage.getItem("className");
    batchName = localStorage.getItem("batchName");
    courseName = localStorage.getItem("courseName");
    sectionName = localStorage.getItem("sectionName");
  }
  ConvertToCSV = objArray => {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }
    console.log(str);
    var file = new Blob([str], {
      type: "text/plain;charset=utf-8"
    });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, "filename");
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = "filename";
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
    return str;
  };
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
            <Link to="/attendance/view">
              <button className="btn btn-outline-success btn-lg text-center mb-3">
                Back{" "}
              </button>{" "}
            </Link>{" "}
            <Link to="/attendance/view/details/edit">
              <button className="btn btn-outline-success btn-lg text-center mb-3">
                Edit{" "}
              </button>{" "}
            </Link>{" "}
            <button
              className="btn btn-outline-success btn-lg text-center mb-3"
              onClick={() => this.ConvertToCSV(attendanceArr)}
            >
              Export{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <h1 className="text-center m-5 display-4">
          {" "}
          Atendance Details Of {attendanceDate}{" "}
        </h1>
        <div className="row h-100 justify-content-center align-items-center">
          {this.state.dataArray.length === 0 ? (
            <h2 className="text-center">No Attendance Record</h2>
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
                  <div className="card-body outerEffect">
                    <h5 className="card-title text-center">
                      {attendance.rollNo}
                    </h5>
                    <h5 className="card-title text-center">
                      {attendance.name}
                    </h5>
                    <p className="card-text text-center">
                      {attendance.attendanceStatus}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default AttendanceDetails;
