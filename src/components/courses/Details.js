import React from "react";

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
class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      object: {},
      teachers: []
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
    this.setState(() => ({ object }));
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
        <div className="card-columns">
          <div className="card bg-light">
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Id</h3>
              <p>{this.state.object._id}</p>
            </div>
          </div>
          <div
            className={this.state.object.batches ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Total Batches</h3>
              <p>{totalBatches}</p>
            </div>
          </div>
          <div
            className={this.state.object.batches ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Active Batches</h3>
              <p>{activeBatches}</p>
            </div>
          </div>
          <div
            className={this.state.object.batches ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Deactive Batches</h3>
              <p>{deactiveBatches}</p>
            </div>
          </div>
          <div
            className={this.state.object.batches ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Completed Batches</h3>
              <p>{completedBatches}</p>
            </div>
          </div>
          <div
            className={this.state.object.classes ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Total Classes</h3>
              <p>{totalClasses}</p>
            </div>
          </div>
          <div
            className={this.state.object.classes ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Active Classes</h3>
              <p>{activeClasses}</p>
            </div>
          </div>
          <div
            className={this.state.object.classes ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Deactive Classes</h3>
              <p>{deactiveClasses}</p>
            </div>
          </div>
          <div
            className={this.state.object.classes ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Completed Classes</h3>
              <p>{completeClasses}</p>
            </div>
          </div>
          <div
            className={this.state.object.sections ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Total Sections</h3>
              <p>{totalSections}</p>
            </div>
          </div>
          <div
            className={this.state.object.sections ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Active Sections</h3>
              <p>{activeSections}</p>
            </div>
          </div>
          <div
            className={this.state.object.sections ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Deactivate Sections</h3>
              <p>{deactiveSections}</p>
            </div>
          </div>
          <div
            className={this.state.object.sections ? "card bg-light" : "d-none"}
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Completed Sections</h3>
              <p>{completeSections}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.students
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Total Students</h3>
              <p>{totalStudents}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.students
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Active Students</h3>
              <p>{activeStudents}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.students
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Eliminated Students</h3>
              <p>{eliminatedStudents}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.students
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Completed Students</h3>
              <p>{completedStudents}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.startTime
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Start Time</h3>
              <p>
                {this.state.object.startTime
                  ? this.state.object.startTime
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.endTime
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">End Time</h3>
              <p>
                {this.state.object.endTime ? this.state.object.endTime : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.startDate
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Start Date</h3>
              <p>
                {this.state.object.startDate
                  ? this.state.object.startDate
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.endDate
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">End Date</h3>
              <p>
                {this.state.object.endDate ? this.state.object.endDate : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.status
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Status</h3>
              <p>
                {this.state.object.status ? this.state.object.status : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.note ? "card bg-light" : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Note</h3>
              <p>{this.state.object.note ? this.state.object.note : "None"}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.teachers
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Teachers</h3>
              {this.state.teachers.map((teacher, index) => {
                return <p key={index}>{teacher}</p>;
              })}
            </div>
          </div>
          <div
            className={
              this.state.object.link ? "card bg-light" : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">link</h3>
              <p>{this.state.object.link ? this.state.object.link : "None"}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.relatedCourse
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Related Course</h3>
              <p>
                {this.state.object.relatedCourse
                  ? this.state.object.relatedCourse[0].name
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.relatedBatch
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Related Batch</h3>
              <p>
                {this.state.object.relatedBatch
                  ? this.state.object.relatedBatch[0].name
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.relatedClass
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Related Class</h3>
              <p>
                {this.state.object.relatedClass
                  ? this.state.object.relatedClass[0].name
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.relatedSection
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Related Section</h3>
              <p>
                {this.state.object.relatedSection
                  ? this.state.object.relatedSection[0].name
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.relatedSection
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Roll Number</h3>
              <p>
                {this.state.object.rollNo ? this.state.object.rollNo : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.fatherName
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Father Name</h3>
              <p>
                {this.state.object.fatherName
                  ? this.state.object.fatherName
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.email
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Email</h3>
              <p>
                {this.state.object.email ? this.state.object.email : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.contact
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Contact Number</h3>
              <p>
                {this.state.object.contact ? this.state.object.contact : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.guardianContact
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Guardian Contact Number</h3>
              <p>
                {this.state.object.guardianContact
                  ? this.state.object.guardianContact
                  : "None"}
              </p>
            </div>
          </div>
          <div
            className={
              this.state.object.cnic ? "card bg-light" : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">CNIC</h3>
              <p>{this.state.object.cnic ? this.state.object.cnic : "None"}</p>
            </div>
          </div>
          <div
            className={
              this.state.object.createdAt
                ? "card bg-light"
                : "card bg-danger d-none"
            }
          >
            <div className="card-body text-center outerEffect">
              <h3 className="card-text">Created At</h3>
              <p>
                {this.state.object.createdAt
                  ? this.state.object.createdAt
                  : "None"}
              </p>
            </div>
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
