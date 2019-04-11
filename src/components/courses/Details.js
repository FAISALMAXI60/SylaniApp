import React from "react";
import './App.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import Axios from "axios";
import axios from 'axios';
var totalBatches,
  activeBatches = 0,
  deactiveBatches = 0,
  completedBatches = 0,
  totalClasses,
  activeClasses = 0,
  deactiveClasses = 0,
  completeClasses = 0,
  totalSections,
  activeSections = 0,
  deactiveSections = 0,
  completeSections = 0,
  totalStudents,
  activeStudents = 0,
  eliminatedStudents = 0,
  completedStudents = 0;
let statusChange = false;
class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      object: {},
      teachers: [],
      studentsData: [],
      allStudents: [],
    };
  }
  componentDidMount() {
    let object = JSON.parse(this.props.location.name);
    if (object.teachers) {
      let teachers = JSON.parse(object.teachers);
      this.setState(() => ({ teachers }));
    }
    if (object.batches) {
      totalBatches = object.batches.length;
      object.batches.map(batch => {
        if (batch.status == "Active") {
          activeBatches++;
        }
        if (batch.status == "Deactivate") {
          deactiveBatches++;
        }
        if (batch.status == "Completed") {
          completedBatches++;
        }
      });
    }
    if (object.classes) {
      totalClasses = object.classes.length;
      object.classes.map(eachClass => {
        if (eachClass.status == "Active") {
          activeClasses++;
        }
        if (eachClass.status == "Deactivate") {
          deactiveClasses++;
        }
        if (eachClass.status == "Completed") {
          completeClasses++;
        }
      });
    }
    if (object.sections) {
      totalSections = object.sections.length;
      object.sections.map(section => {
        if (section.status == "Active") {
          activeSections++;
        }
        if (section.status == "Deactivate") {
          deactiveSections++;
        }
        if (section.status == "Completed") {
          completeSections++;
        }
      });
    }

    if (object.students) {
      totalStudents = object.students.length;
      // var stud=object.students;
      object.students.map(student => {
        if (student.status == "Active") {
          activeStudents++;
        }
        if (student.status == "Eliminated") {
          eliminatedStudents++;
        }
        if (student.status == "Completed") {
          completedStudents++;
        }
      });
    }
    this.setState(() => ({ object, studentsData: object.students }));
  }
  handleChange = obj => (event, value) => {
    let targetValue = event.target.innerText;
    let statusvalue = {
      status: targetValue.trim()
    }
    axios.put('/course/batch/class/section/student/edit/' + obj._id, statusvalue).
      then((response) => {
        let getid = response.data._id;
        //   if(getid) {
        let updatedStudent = this.state.studentsData.find((item) => {
          return item._id == getid;
        });

        if (updatedStudent) {
          let index = this.state.studentsData.indexOf(updatedStudent);
          this.state.studentsData.splice(index, 1, response.data);
          this.setState({
            studentsData: this.state.studentsData,
            allStudents:this.state.studentsData
          })

          this.filterStudents(this.state.currentStudentFilter);
        }
        // }
      });
  }
  onValueChange = (evt) => {
    let getValue = evt.target.value;

    this.filterStudents(getValue);

  }
  filterStudents=(getValue)=>{
     // alert(getValue);
     if (getValue == "All Students") {
      let getAll = this.state.studentsData.filter((item) => {
        return item.name;
      });
      this.setState({
        currentStudentFilter:getValue,
        allStudents: getAll
      })
    }
    if (getValue == "Eliminated Students") {
      let getElim = this.state.studentsData.filter((item) => {
        if (item.status == "Eliminated") {
          return item.name;
        }
      });
      this.setState({
        currentStudentFilter:getValue,
        allStudents: getElim
      });
    }
    if (getValue == "Active Students") {
      let getAct = this.state.studentsData.filter((item) => {
        if (item.status == "Active") {
          return item.name;
        }
      });
      this.setState({
        currentStudentFilter:getValue,
        allStudents: getAct
      });
    }
    if (getValue == "Blacklist Studets") {
      let getBlack = this.state.studentsData.filter((item) => {
        if (item.status == "Blacklist") {
          return item.name;
        }
      });
      this.setState({
        currentStudentFilter:getValue,
        allStudents: getBlack
      });
    }
    if (getValue == "Completed Studets") {
      let getCom = this.state.studentsData.filter((item) => {
        if (item.status == "Completed") {
          return item.name;
        }
      });
      this.setState({
        currentStudentFilter:getValue,
        allStudents: getCom
      });
    }
  }
  componentWillUnmount() {
    (totalBatches = 0);
    (activeBatches = 0);
    (deactiveBatches = 0);
    (completedBatches = 0);
    (totalClasses = 0);
    (activeClasses = 0);
    (deactiveClasses = 0);
    (completeClasses = 0);
    (totalSections = 0);
    (activeSections = 0);
    (deactiveSections = 0);
    (completeSections = 0);
    (totalStudents = 0);
    (activeStudents = 0);
    (eliminatedStudents = 0);
    (completedStudents = 0);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="card text-center mb-3 mt-3">
          <div className="card-header" />
          <div className="card-body outerEffect">
            <h1>{this.state.object.name}</h1>
          </div>
          <div className="card-footer text-muted" />
        </div>
        <ul id="UL" className="nav nav-pills">
          <li className="active"><a data-toggle="pill" href="#home">Summary</a></li>
          <li><a data-toggle="pill" href="#menu1">Show Studets</a></li>
        </ul>
        <div class="tab-content">
          <div id="menu1" class="tab-pane fade">
            <select className="form-control" id="sel1" onChange={this.onValueChange.bind(this)}>
              <option>Select an option</option>
              <option>All Students</option>
              <option>Eliminated Students</option>
              <option>Active Students</option>
              <option>Blacklist Studets</option>
              <option>Completed Studets</option>
            </select>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Father Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>CNIC</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allStudents.map((Obj) => {
                  return (
                    <tr className={Obj.status}>
                      <td>{Obj.rollNo}</td>
                      <td>{Obj.name}</td>
                      <td>{Obj.fatherName}</td>
                      <td>{Obj.email}</td>
                      <td>{Obj.contact}</td>
                      <td>{Obj.cnic}</td>
                      <td>
                        <SelectField
                          // floatingLabelText="Status"
                          value={Obj.status == undefined ? 'Active' : Obj.status}
                          onChange={this.handleChange(Obj)}
                        >
                          <MenuItem value='Active' primaryText="Active" />
                          <MenuItem value={Obj.rollNo ? `Eliminated` : 'Deactivate'} primaryText={Obj.rollNo ? `Eliminated` : 'Deactivate'} />
                          <MenuItem value="Completed" primaryText="Completed" />
                          <MenuItem value="Blacklist" primaryText="Blacklist" />
                        </SelectField>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table>
          </div>
          <div id="home" class="tab-pane fade in active">
            <table className="table table-striped">
              <tr>
                <th>Id</th>
                <td>{this.state.object._id}</td>
              </tr>
              <tr
                className={this.state.object.batches ? "table table-primary" : "d-none"}
              >
                <th>Total Batches</th>
                <td>{totalBatches}</td>
              </tr>
              <tr
                className={this.state.object.batches ? "table table-primary" : "d-none"}
              >
                <th>Active Batches</th>
                <td>{activeBatches}</td>
              </tr>
              <tr
                className={this.state.object.batches ? "table table-primary" : "d-none"}
              >
                <th>Deactive Batches</th>
                <td>{deactiveBatches}</td>
              </tr>
              <tr
                className={this.state.object.batches ? "table table-primary" : "d-none"}
              >
                <th>Completed Batches</th>
                <td>{completedBatches}</td>
              </tr>
              <tr
                className={this.state.object.classes ? "table table-primary" : "d-none"}
              >
                <th>Total Classes</th>
                <td>{totalClasses}</td>
              </tr>
              <tr
                className={this.state.object.classes ? "table table-primary" : "d-none"}
              >
                <th>Active Classes</th>
                <td>{activeClasses}</td>
              </tr>
              <tr
                className={this.state.object.classes ? "table table-primary" : "d-none"}
              >
                <th>Deactive Classes</th>
                <td>{deactiveClasses}</td>
              </tr>
              <tr
                className={this.state.object.classes ? "table table-primary" : "d-none"}
              >
                <th>Completed Classes</th>
                <td>{completeClasses}</td>
              </tr>
              <tr
                className={
                  this.state.object.students
                    ? "table table-primary"
                    : "table table-danger d-none"
                }>
                <th>Active Students</th>
                <td>{activeStudents}</td>
              </tr>
              <tr
                className={
                  this.state.object.note ? "table table-primary" : "table table-danger d-none"
                }
              >
                <th>Note</th>
                <td>{this.state.object.note ? this.state.object.note : "None"}</td>
              </tr>
              <tr
                className={this.state.object.sections ? "table table-primary" : "d-none"}
              >
                <th>Total Sections</th>
                <td>{totalSections}</td>
              </tr>
              <tr
                className={
                  this.state.object.students
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Eliminated Students</th>
                <td>{eliminatedStudents}</td>
              </tr>
              <tr
                className={
                  this.state.object.teachers
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Teachers</th>
                <td>
                  {this.state.teachers.map((teacher, index) => {
                    return <p key={index}>{teacher}</p>;
                  })}
                </td>
              </tr>
              <tr
                className={this.state.object.sections ? "table table-primary" : "d-none"}
              >
                <th>Active Sections</th>
                <td>{activeSections}</td>
              </tr>
              <tr
                className={
                  this.state.object.students
                    ? "table table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Completed Students</th>
                <td>{completedStudents}</td>
              </tr>
              <tr
                className={
                  this.state.object.link ? "table table-primary" : "table table-danger d-none"
                }
              >
                <th>link</th>
                <td>{this.state.object.link ? this.state.object.link : "None"}</td>
              </tr>
              <tr
                className={this.state.object.sections ? "table table-primary" : "d-none"}
              >
                <th>Deactivate Sections</th>
                <td>{deactiveSections}</td>
              </tr>
              <tr
                className={
                  this.state.object.startTime
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Start Time</th>
                <td>{this.state.object.startTime
                  ? this.state.object.startTime
                  : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.startDate
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Start Date</th>
                <td>
                  {this.state.object.startDate
                    ? this.state.object.startDate
                    : "None"}
                </td>
              </tr>
              <tr
                className={
                  this.state.object.relatedCourse
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Related Course</th>
                <td>
                  {this.state.object.relatedCourse
                    ? this.state.object.relatedCourse[0].name
                    : "None"}
                </td>
              </tr>
              <tr
                className={this.state.object.sections ? "table table-primary" : "d-none"}
              >
                <th>Completed Sections</th>
                <td>{completeSections}</td>
              </tr>
              <tr
                className={
                  this.state.object.endTime
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>End Time</th>
                <td>{this.state.object.endTime ? this.state.object.endTime : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.endDate
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>End Date</th>
                <td> {this.state.object.endDate ? this.state.object.endDate : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.relatedBatch
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Related Batch</th>
                <td>
                  {this.state.object.relatedBatch
                    ? this.state.object.relatedBatch[0].name
                    : "None"}
                </td>
              </tr>
              <tr
                className={
                  this.state.object.relatedClass
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Related Class</th>
                <td> {this.state.object.relatedClass
                  ? this.state.object.relatedClass[0].name
                  : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.relatedSection
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Related Section</th>
                <td> {this.state.object.relatedSection
                  ? this.state.object.relatedSection[0].name
                  : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.relatedSection
                    ? "table table-primary"
                    : "table table-primarydanger d-none"
                }
              >
                <th>Roll Number</th>
                <td> {this.state.object.rollNo ? this.state.object.rollNo : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.fatherName
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Father Name</th>
                <td> {this.state.object.fatherName
                  ? this.state.object.fatherName
                  : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.email
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Email</th>
                <td> {this.state.object.email ? this.state.object.email : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.contact
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Contact Number</th>
                <td>  {this.state.object.contact ? this.state.object.contact : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.guardianContact
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Guardian Contact Number</th>
                <td>  {this.state.object.guardianContact
                  ? this.state.object.guardianContact
                  : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.cnic ? "table table-primary" : "table table-danger d-none"
                }
              >
                <th>CNIC</th>
                <td>  {this.state.object.cnic ? this.state.object.cnic : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.students
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Total Students</th>
                <td>{totalStudents}</td>
              </tr>
              <tr
                className={
                  this.state.object.status
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Status</th>
                <td>{this.state.object.status ? this.state.object.status : "None"}</td>
              </tr>
              <tr
                className={
                  this.state.object.createdAt
                    ? "table table-primary"
                    : "table table-danger d-none"
                }
              >
                <th>Created At</th>
                <td>
                  {this.state.object.createdAt
                    ? this.state.object.createdAt
                    : "None"}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <button
            className="btn btn-outline-success btn-lg text-center mb-5"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default Details;