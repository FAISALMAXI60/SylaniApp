import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { classHandler } from "../../store/actions";
import LoadingScreen from "../loadingScreen";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "antd";
import "react-toastify/dist/ReactToastify.css";

var className, batchName, courseName;
class Section extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: [],
      loading: true,
      visible: false,
      sectionId: ""
    };
  }

  showModal = sectionId => {
    this.setState({
      visible: true,
      sectionId
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
    let sectionId = this.state.sectionId;
    var self = this;
    axios
      .post(`/course/batch/class/section/remove`, {
        sectionId
      })
      .then(function (response) {
        let dataArray = self.state.dataArray.filter(
          student => student._id !== sectionId
        );
        self.setState(() => ({
          dataArray: dataArray,
          loading: false,
          visible: false
        }));
        self.notify();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    let classObj = this.props.location.name
      ? JSON.parse(this.props.location.name)
      : this.props.classObj;
    // let classObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('classObj'));
    // localStorage.setItem('classObj', JSON.stringify(classObj));
    this.props.classHandler(classObj);
    let classId = classObj._id;
    className = classObj.name;
    localStorage.setItem("className", className);
    // batchName = localStorage.getItem('batchName');
    // courseName = localStorage.getItem('courseName');
    batchName = this.props.batchObj.name;
    courseName = this.props.courseObj.name;
    var self = this;
    axios
      .post(`/course/batch/class/section`, {
        classId
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
  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid">
        <Header
          entity="Sections"
          addEntity="Section"
          home={`/${courseName}/${batchName}/${className}/section`}
          add={`/${courseName}/${batchName}/${className}/section/add`}
          active={`/${courseName}/${batchName}/${className}/section/active`}
          deactive={`/${courseName}/${batchName}/${className}/section/deactivated`}
          completed={`/${courseName}/${batchName}/${className}/section/completed`}
          back={`/${courseName}/${batchName}/class`}
        />{" "}
        <div>
          <ToastContainer />
        </div>{" "}
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
          <Link to={`/course`}>
            <span className="text-dark"> {courseName}/</span>
          </Link>{" "}
          <Link to={`/${courseName}/batch`}>
            <span className="text-dark"> {batchName}/</span>
          </Link>{" "}
          <Link to={`/${courseName}/${batchName}/class`}>
            <span className="text-dark"> {className} </span>{" "}
          </Link>{" "}
        </h1>{" "}
        <h2 className="text-center m-5 display-4"> All Sections </h2>{" "}
        {this.state.dataArray.length == 0 ? (
          <div className="card m-3">
            <div className="card-body outerEffect">
              <h4 className="card-title text-center"> There Is No Section </h4>{" "}
              <p className="card-text text-center"> Please Add A Section. </p>{" "}
            </div>{" "}
          </div>
        ) : (
            this.state.dataArray.map((Obj, index) => {
              return (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Section Name</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Total Students</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>
                        <Link
                          to={{
                            pathname: `${Obj.link}`,
                            name: `${JSON.stringify(Obj)}`,
                            state: {
                              fromDashboard: true
                            }
                          }}
                        >
                          {Obj.name}
                        </Link>
                      </td>
                      <td>{Obj.startTime}</td>
                      <td>{Obj.endTime}</td>
                      <td>{Obj.students ? Obj.students.length : "None"}</td>
                      <td>{Obj.status}</td>
                      <td>{Obj.createdAt}</td>
                      <td>{Obj.startDate}</td>
                      <td>{Obj.endDate}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/${Obj.name}/details`,
                            name: `${JSON.stringify(Obj)}`,
                            state: {
                              fromDashboard: true
                            }
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
                            state: {
                              fromDashboard: true
                            }
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
                          onClick={() => this.showModal(Obj)}
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
    classObj: state.class
  };
};

const mapDispatchToProps = dispatch => {
  return {
    classHandler: classObj => dispatch(classHandler(classObj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Section);
