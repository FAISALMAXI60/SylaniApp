import React from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { batchHandler } from "../../store/actions";
import LoadingScreen from "../loadingScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "antd";

var courseName, batchName;
class Class extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: [],
      loading: true,
      visible: false,
      classId: ""
    };
  }

  showModal = classId => {
    this.setState({
      visible: true,
      classId
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
    var self = this;
    let classId = this.state.classId;
    console.log(classId)
    axios
      .post(`/course/batch/class/remove`, { classId })
      .then(function (response) {
        let dataArray = self.state.dataArray.filter(Obj => Obj._id !== classId);
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
    var self = this;
    let batchObj = this.props.location.name
      ? JSON.parse(this.props.location.name)
      : this.props.batchObj;
    this.props.batchHandler(batchObj);
    // let batchObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('batchObj'));
    // localStorage.setItem('batchObj', JSON.stringify(batchObj));
    batchName = batchObj.name;
    localStorage.setItem("batchName", batchName);
    let batchId = batchObj._id;
    courseName = this.props.courseObj.name;
    // courseName = localStorage.getItem('courseName');
    axios
      .post(`/course/batch/class`, {
        batchId
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
      <div className="container-fluid border">
        <Header
          entity="Classes"
          addEntity="Class"
          home={`/${courseName}/${batchName}/class`}
          add={`/${courseName}/${batchName}/class/add`}
          active={`/${courseName}/${batchName}/class/active`}
          deactive={`/${courseName}/${batchName}/class/deactivated`}
          completed={`/${courseName}/${batchName}/class/completed`}
          back={`/${courseName}/batch`}
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
        <h1 className="text-center m-5 display-3">
          <Link to={`/course`}>
            <span className="text-dark">{courseName}/</span>
          </Link>
          <Link to={`/${courseName}/batch`}>
            <span className="text-dark">{batchName}</span>
          </Link>
        </h1>
        <h2 className="text-center m-5 display-4">All Classes</h2>
        {this.state.dataArray.length == 0 ? (
          <div className="card m-3">
            <div className="card-body outerEffect">
              <h4 className="card-title text-center">There Is No Class</h4>
              <p className="card-text text-center">Please Add A Class.</p>
            </div>
          </div>
        ) : (
            this.state.dataArray.map((Obj, index) => {
              return (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Total Students</th>
                      <th>Total Sections</th>
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
                      <td>{Obj.students ? Obj.students.length : "None"}</td>
                      <td>{Obj.sections ? Obj.sections.length : 0}</td>
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
    batchObj: state.batch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    batchHandler: batchObj => dispatch(batchHandler(batchObj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Class);
