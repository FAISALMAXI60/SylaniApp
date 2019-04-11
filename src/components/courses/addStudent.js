import { Upload, message, Button, Icon } from "antd";
import React from "react";
import TextField from "material-ui/TextField";
import Header from "./Header";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import styles from "./styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import readXlsxFile from "read-excel-file";

let port = process.env.PORT || 3000;

var className, batchName, courseName, sectionName, componentThis;
class AddStudent extends React.Component {
  state = {
    value: "Active",
    file: false
  };
  addStudentExcel = () => {
    let inputElement = document.getElementById("customFile"),
      componentThis = this;
    var elem = document.getElementById("myBar");
    var width = 1;
    this.setState({ file: inputElement.files[0] ? true : false });
    if (inputElement.files[0]) {
      readXlsxFile(inputElement.files[0]).then(studentsArray => {
        let arrLength = studentsArray.length;
        var rollNo,
          studentName,
          link,
          fatherName,
          cnic,
          studentContactNumber,
          guardianContactNumber,
          email,
          note,
          status,
          num;
        num = 100 / (arrLength - 1);
        studentsArray.map((studentPropertyArr, i) => {
          if (i !== 0) {
            studentName = studentPropertyArr[0];
            fatherName = studentPropertyArr[1];
            cnic = studentPropertyArr[2];
            studentContactNumber = studentPropertyArr[3];
            guardianContactNumber = studentPropertyArr[4];
            link = `/${courseName}/${batchName}/${className}/${sectionName}/student/${studentName}`;
            email = studentPropertyArr[5];
            note = studentPropertyArr[6];
            rollNo = studentPropertyArr[8];
            status = studentPropertyArr[7];
            var courseObj = componentThis.props.courseObj;
            var batchObj = componentThis.props.batchObj;
            var classObj = componentThis.props.classObj;
            var sectionObj = componentThis.props.sectionObj;
            var relatedCourse = courseObj._id;
            var relatedBatch = batchObj._id;
            var relatedClass = classObj._id;
            var relatedSection = sectionObj._id;
            var createdAt = new Date().toString();
            componentThis.addStudentHandler(
              studentName,
              fatherName,
              cnic,
              studentContactNumber,
              guardianContactNumber,
              link,
              email,
              note,
              relatedClass,
              status,
              createdAt,
              relatedCourse,
              relatedBatch,
              relatedSection,
              rollNo
            );
            width = width + num;
            elem.style.width = width + "%";
            elem.innerHTML = width.toFixed(0) - 1 + "%";
            if (i >= arrLength - 1) {
              componentThis.notify();
            }
          }
        });
      });
    }
  };
  addStudentHandler = (
    studentName,
    fatherName,
    cnic,
    studentContactNumber,
    guardianContactNumber,
    link,
    email,
    note,
    relatedClass,
    status,
    createdAt,
    relatedCourse,
    relatedBatch,
    relatedSection,
    rollNo
  ) => {
    componentThis = this;
    axios
      .post(`/course/batch/class/section/student/addexcel`, {
        studentName,
        fatherName,
        cnic,
        studentContactNumber,
        guardianContactNumber,
        link,
        email,
        note,
        relatedClass,
        status,
        createdAt,
        relatedCourse,
        relatedBatch,
        relatedSection,
        rollNo
      })
      .then(function (response) {
        componentThis.notify();
        // setTimeout(() => {
        //   componentThis.props.history.push(
        //     `/${courseName}/${batchName}/${className}/${sectionName}/student`
        //   );
        // }, 2000);
      })
      .catch(function (error) {
        alert(error);
      });
  };
  notify = () => {
    toast.success("Student Added Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  handleChange = (event, index, value) => this.setState({ value });
  addStudentFormHandler = e => {
    e.preventDefault();
    let rollNo = e.target.elements[0].value;
    let studentName = e.target.elements[1].value;
    let link = `/${courseName}/${batchName}/${className}/${sectionName}/student/${studentName}`;
    let fatherName = e.target.elements[2].value;
    let cnic = e.target.elements[3].value;
    let studentContactNumber = e.target.elements[4].value;
    let guardianContactNumber = e.target.elements[5].value;
    let email = e.target.elements[6].value;
    let note = e.target.elements[8].value;
    let courseObj = this.props.courseObj;
    let batchObj = this.props.batchObj;
    let classObj = this.props.classObj;
    let sectionObj = this.props.sectionObj;
    let relatedCourse = courseObj._id;
    let relatedBatch = batchObj._id;
    let relatedClass = classObj._id;
    let relatedSection = sectionObj._id;
    let createdAt = new Date().toString();
    let status = this.state.value;
    if (
      !rollNo ||
      !studentName ||
      !fatherName ||
      !cnic ||
      !studentContactNumber
    ) {
      return (document.getElementById("errorAlertDiv").style.display = "block");
    }
    e.target.elements[0].value = "";
    e.target.elements[1].value = "";
    e.target.elements[2].value = "";
    e.target.elements[3].value = "";
    e.target.elements[4].value = "";
    e.target.elements[5].value = "";
    e.target.elements[6].value = "";
    e.target.elements[8].value = "";
    componentThis = this;
    document.getElementById("addBtn").setAttribute("disabled", "true");
    document.getElementById("errorAlertDiv").style.display = "none";
    axios
      .post(`/course/batch/class/section/student/add`, {
        studentName,
        fatherName,
        cnic,
        studentContactNumber,
        guardianContactNumber,
        link,
        email,
        note,
        relatedClass,
        status,
        createdAt,
        relatedCourse,
        relatedBatch,
        relatedSection,
        rollNo
      })
      .then(function (response) {
        if (response.data.errors) {
          let errorMessage = response.data.errors.note.stringValue;
          document.getElementById("errorAlertDiv").style.display = "block";
          document.getElementById("addBtn").setAttribute("disabled", "false");
          return (document.getElementById(
            "errorAlertDiv"
          ).innerText = `Error In ${errorMessage}`);
        }
        if (response.data.error) {
          let errorMessage = response.data.relatedCourses;
          document.getElementById("errorAlertDiv").style.display = "block";
          document.getElementById("addBtn").setAttribute("disabled", "false");
          return (document.getElementById(
            "errorAlertDiv"
          ).innerText = `Already In Two Courses and Active Related Courses ${errorMessage}`);
        }
        if (response.data.blacklist) {
          let errorMessage = response.data.blacklist;
          document.getElementById("errorAlertDiv").style.display = "block";
          document.getElementById("addBtn").setAttribute("disabled", "false");
          return (document.getElementById(
            "errorAlertDiv"
          ).innerText = `${errorMessage}`);
        }
        document.getElementById("addBtn").removeAttribute("disabled");
        componentThis.notify();
        // setTimeout(() => {
        //     componentThis.props.history.push(`/${courseName}/${batchName}/${className}/${sectionName}/student`);
        // }, 2000);
      })
      .catch(function (error) {
        document.getElementById("addBtn").removeAttribute("disabled");
        alert(error);
      });
  };
  onChangeFile = () => {
    let inputElement = document.getElementById("customFile");
    inputElement.setAttribute("disabled", "true");
  };
  componentWillMount() {
    let sectionObj = this.props.sectionObj;
    className = this.props.classObj.name;
    batchName = this.props.batchObj.name;
    courseName = this.props.courseObj.name;
    sectionName = sectionObj.name;
  }
  render() {
    const props = {
      name: "file",
      action: "//jsonplaceholder.typicode.com/posts/",
      headers: {
        authorization: "authorization-text"
      }
    };
    return (
      <div className="container-fluid">
        <Header
          entity="Students"
          addEntity="Student"
          home={`/${courseName}/${batchName}/${className}/${sectionName}/student`}
          add={`/${courseName}/${batchName}/${className}/${sectionName}/student/add`}
          active={`/${courseName}/${batchName}/${className}/${sectionName}/student/active`}
          deactive={`/${courseName}/${batchName}/${className}/${sectionName}/student/deactivated`}
          completed={`/${courseName}/${batchName}/${className}/${sectionName}/student/completed`}
          back={`/${courseName}/${batchName}/${className}/section`}
        />
        <div>
          <ToastContainer />
        </div>
        <h1 className="text-center m-5 display-2">Add Student</h1>
        <div className="alert alert-danger" id="errorAlertDiv">
          <strong>Student Data!</strong> Please Add Student Data Currectly.
        </div>
        <form onSubmit={this.addStudentFormHandler}>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Student Roll Number"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              type="number"
              required={true}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Student Name"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              required={true}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Father Name"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              required={true}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Student CNIC"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              type="number"
              min="13"
              required={true}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Student Contact Number"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              type="number"
              min="11"
              required={true}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Guardian Contact Number"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              type="number"
              min="11"
              required={true}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              floatingLabelText="Enter Student Email"
              floatingLabelStyle={styles.floatingLabelFocusStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              required={true}
              type="email"
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <TextField
              hintText="Note About The Student"
              floatingLabelText="Enter Some Note"
              multiLine={true}
              rows={2}
            />
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <SelectField
              floatingLabelText="Status"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value="Active" primaryText="Active" />
              <MenuItem value="Eliminated" primaryText="Eliminated" />
              <MenuItem value="Completed" primaryText="Completed" />
              <MenuItem value="Blacklist" primaryText="Blacklist" />
            </SelectField>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <button
              id="addBtn"
              type="submit"
              className="btn btn-outline-success btn-lg text-center m-5"
            >
              Add Student
            </button>
            <button
              className="btn btn-outline-success btn-lg text-center m-5"
              onClick={() => this.props.history.goBack()}
            >
              Cancel
            </button>
            <button
              type="reset"
              className="btn btn-outline-success btn-lg text-center m-5"
            >
              Reset
            </button>
          </div>
        </form>
        <h1 className="text-center m-5 display-3">Import Students</h1>
        <div className="row h-100 justify-content-center align-items-center mt-4 mb-4">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              onChange={this.onChangeFile}
              id="customFile"
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose file
            </label>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center mt-4 mb-4">
          <Button onClick={this.addStudentExcel}>
            <Icon ghost="true" type="submit" /> Submit
          </Button>
          <div id="myProgress" className="mt-5">
            <div id="myBar">0%</div>
          </div>
        </div>
        {/* <h1 className="text-center m-5 display-3">Import Students</h1>
                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.addStudentExcel}>
                        <input type='file' className='btn btn-outline-success btn-lg text-center m-5' id='excelFile' />
                        <div className="row h-100 justify-content-center align-items-center">
                            <button type='submit'
                                className='btn btn-outline-success btn-lg text-center m-5'
                                id='excelSubmitBtn'>Submit</button>
                        </div>
                    </form>
                    <div id="myProgress">
                        <div id="myBar">0%</div>
                    </div>
                </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courseObj: state.course,
    batchObj: state.batch,
    classObj: state.class,
    sectionObj: state.section
  };
};

export default connect(mapStateToProps)(AddStudent);
