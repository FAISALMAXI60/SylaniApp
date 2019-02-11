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
      .then(function(response) {
        let dataArray = self.state.dataArray.filter(Obj => Obj._id !== ObjId);
        self.setState(() => ({
          dataArray: dataArray,
          loading: false,
          visible: false
        }));
        self.notify();
      })
      .catch(function(error) {
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
              <div className="card m-3 p-3 text-center" key={index}>
                <div className="card-header bg-white text-dark rounded">
                  <Link
                    to={{
                      pathname: `${Obj.link}`,
                      name: `${JSON.stringify(Obj)}`,
                      state: {
                        fromDashboard: true
                      }
                    }}
                  >
                    <h1 className="text-dark display-3 font-weight-bold linksStyle">
                      {" "}
                      {Obj.name}{" "}
                    </h1>{" "}
                  </Link>{" "}
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
                      Details{" "}
                    </button>{" "}
                  </Link>{" "}
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
                      Edit{" "}
                    </button>{" "}
                  </Link>{" "}
                  <Button
                    type="danger"
                    className="btn btn-outline-danger btn-lg ml-2"
                    onClick={() => this.showModal(Obj)}
                    id="delBtn"
                  >
                    Delete{" "}
                  </Button>{" "}
                </div>{" "}
                <div className="card-body m-2">
                  <div className="row m-2">
                    <div className="col-sm-3">
                      <div className="card">
                        <div
                          className={
                            Obj.batches
                              ? "card-body outerEffect"
                              : "card-body text-muted"
                          }
                        >
                          <h5 className="h3"> Total Batches </h5>{" "}
                          <p className="card-text">
                            {" "}
                            {Obj.batches ? Obj.batches.length : "None"}{" "}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="col-sm-3">
                      <div className="card">
                        <div
                          className={
                            Obj.classes
                              ? "card-body outerEffect"
                              : "card-body text-muted"
                          }
                        >
                          <h5 className="h3"> Total Classes </h5>{" "}
                          <p className="card-text">
                            {" "}
                            {Obj.classes ? Obj.classes.length : "None"}{" "}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="col-sm-3">
                      <div className="card">
                        <div
                          className={
                            Obj.sections
                              ? "card-body outerEffect"
                              : "card-body text-muted"
                          }
                        >
                          <h5 className="h3"> Total Sections </h5>{" "}
                          <p className="card-text">
                            {" "}
                            {Obj.sections ? Obj.sections.length : "None"}{" "}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="col-sm-3">
                      <div className="card">
                        <div className="card-body outerEffect">
                          <h5 className="h3"> Total Students </h5>{" "}
                          <p className="card-text">
                            {" "}
                            {Obj.students ? Obj.students.length : "None"}{" "}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="row m-2">
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body outerEffect">
                          <h5 className="h3"> Status </h5>{" "}
                          <p className="card-text"> {Obj.status} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body outerEffect">
                          <h5 className="h3"> Created At </h5>{" "}
                          <p className="card-text"> {Obj.createdAt} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="card-footer bg-light text-success rounded">
                  <div className="row  m-2">
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body outerEffect">
                          <h5 className="h3"> Start Date </h5>{" "}
                          <p className="card-text"> {Obj.startDate} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body outerEffect">
                          <h5 className="h3"> End Date </h5>{" "}
                          <p className="card-text"> {Obj.endDate} </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            );
          })
        )}{" "}
      </div>
    );
  }
}

export default Body;
