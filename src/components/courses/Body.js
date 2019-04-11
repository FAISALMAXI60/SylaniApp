import React from "react";
import Details from "./Details";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal, Button } from "antd";

class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: [],
      visible: false,
      Obj: {}
    };
  }
  showModal = Obj => {
    this.setState({
      visible: true,
      Obj
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
    let Obj = this.state.Obj;
    var self = this;
    let ObjId = Obj._id;
    axios
      .post(Obj.relatedCourse ? `course/batch/remove` : `/course/remove`, {
        ObjId
      })
      .then(function (response) {
        let dataArray = self.state.dataArray.filter(Obj => Obj._id !== ObjId);
        self.setState(() => ({
          dataArray: dataArray,
          loading: false,
          visible: false
        }));
        self.notify();
      })
      .catch(function (error) {
        alert(error);
      });
  };
  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      dataArray: nextProps.dataArray
    }));
  }
  componentDidMount() {
    this.setState(() => ({
      dataArray: this.props.dataArray
    }));
  }
  render() {
    return (
      <div className="container-fluid border">
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
        {this.state.dataArray.length == 0 ? (
          <div className="card m-3">
            <div className="card-body p-3 outerEffect">
              <h4 className="card-title text-center">
                There Is No {this.props.entity}{" "}
              </h4>{" "}
              <p className="card-text text-center">
                Please Add A {this.props.entity}.{" "}
              </p>{" "}
            </div>{" "}
          </div>
        ) : (
            this.state.dataArray.map((Obj, index) => {
              return (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Total Baches</th>
                      <th>Total Classes</th>
                      <th>Total Sections</th>
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
                      <td>{Obj.batches ? Obj.batches.length : "None"}</td>
                      <td>{Obj.classes ? Obj.classes.length : "None"}</td>
                      <td>{Obj.sections ? Obj.sections.length : "None"}</td>
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

export default Body;
