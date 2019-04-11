import React from "react";
import './App.css';
import Header from "./Header";
import { connect } from "react-redux";
import { sectionHandler } from "../../store/actions";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "../loadingScreen";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "antd";
import "react-toastify/dist/ReactToastify.css";

var className, batchName, courseName, sectionName;
class Students extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: [],
      loading: true,
      visible: false,
      studentId: '',
    };
  }
  showModal = studentId => {
    this.setState({
      visible: true,
      studentId
    });
  };
  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  notify = () => {
    toast.success("Deleted Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  deleteHandler = () => {
    let studentId = this.state.studentId;
    var self = this;
    document.getElementById("delBtn").setAttribute("disabled", "true");
    axios
      .post(`/course/batch/class/section/student/remove`, {
        studentId
      })
      .then(function (response) {
        let dataArray = self.state.dataArray.filter(
          student => student._id !== studentId
        );
        self.setState(() => ({
          dataArray: dataArray,
          loading: false,
          visible: false
        }));
        self.notify();
        document.getElementById("delBtn").removeAttribute("disabled");
      })
      .catch(function (error) {
        document.getElementById("delBtn").removeAttribute("disabled");
        console.log(error);
      });
  };
  componentDidMount() {
    let sectionObj = this.props.location.name
      ? JSON.parse(this.props.location.name)
      : this.props.sectionObj;
    className = this.props.classObj.name;
    batchName = this.props.batchObj.name;
    courseName = this.props.courseObj.name;
    this.props.sectionHandler(sectionObj);
    // let sectionObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('sectionObj'));
    // localStorage.setItem('sectionObj', JSON.stringify(sectionObj));
    let sectionId = sectionObj._id;
    sectionName = sectionObj.name;
    // localStorage.setItem('sectionName', sectionName);
    var self = this;
    axios
      .post(`/course/batch/class/section/student`, {
        sectionId
      })
      .then(function (response) {
        self.setState(() => ({
          dataArray: response.data,
          loading: false
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // checkStarus(status) {

  //   switch (status) {
  //     case "Eliminated":

  //   }
  // }
  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid">
        <Header
          entity="Students"
          addEntity="Student"
          home={`/${courseName}/${batchName}/${className}/${sectionName}/student`}
          add={`/${courseName}/${batchName}/${className}/${sectionName}/student/add`}
          active={`/${courseName}/${batchName}/${className}/${sectionName}/student/active`}
          deactive={`/${courseName}/${batchName}/${className}/${sectionName}/student/eliminated`}
          completed={`/${courseName}/${batchName}/${className}/${sectionName}/student/completed`}
          back={`/${courseName}/${batchName}/${className}/section`}
        />
        <div>
          <ToastContainer />
        </div>
        <Modal
          title="Confirmation"
          visible={this.state.visible}
          onOk={this.deleteHandler}
          onCancel={this.hideModal}
          okText="Confirm"
          cancelText="Cancel"
        >
          <h2>Your are going to delete data</h2>
        </Modal>
        <h1 className="text-center m-5 display-4">
          <Link to="/course">
            <span className="text-dark">{courseName}/</span>
          </Link>
          <Link to={`/${courseName}/batch`}>
            <span className="text-dark">{batchName}/</span>
          </Link>
          <Link to={`/${courseName}/${batchName}/class`}>
            <span className="text-dark">{className}/</span>
          </Link>
          <Link to={`/${courseName}/${batchName}/${className}/section`}>
            <span className="text-dark">{sectionName}</span>
          </Link>
        </h1>
        <h2 className="text-center m-5 display-4">All Students</h2>
        {this.state.dataArray.length == 0 ? (
          <div className="card m-3">
            <div className="card-body outerEffect">
              <h4 className="card-title text-center">There Is No Student</h4>
              <p className="card-text text-center">Please Add A Student.</p>
            </div>
          </div>
        ) : (
            this.state.dataArray.map((Obj, index) => {
              return (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Student Contact</th>
                      <th>Student Email</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={Obj.status}>

                      <td>{Obj.rollNo}</td>
                      <td>{Obj.name}</td>
                      <td>{Obj.contact}</td>
                      <td>{Obj.email}</td>
                      <td>{Obj.status}</td>
                      <td>{Obj.createdAt}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/${Obj.name}/details`,
                            name: `${JSON.stringify(Obj)}`,
                            state: { fromDashboard: true }
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-outline-success btn-lg"
                          >
                            Details
                    </button>
                        </Link>
                        <Link
                          to={{
                            pathname: `/${Obj.name}/edit`,
                            name: `${JSON.stringify(Obj)}`,
                            state: { fromDashboard: true }
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-outline-success btn-lg ml-2"
                          >
                            Edit
                    </button>
                        </Link>
                        <Button
                          type="danger"
                          className="btn btn-outline-danger btn-lg ml-2"
                          onClick={() => this.showModal(Obj._id)}
                          id="delBtn"
                        >
                          Delete
                      </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })
          )}
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

const mapDispatchToProps = dispatch => {
  return {
    sectionHandler: sectionObj => dispatch(sectionHandler(sectionObj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
