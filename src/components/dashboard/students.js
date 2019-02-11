import React from "react";
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import MyModal from "./showMore";

class Students extends React.Component {
  state = {
    Students: [],
    totalStudents: 0,
    activeStudents: 0,
    deactiveStudents: 0,
    completedStudents: 0,
    dublicatedStudents: 0,
    loading: true
  };
  componentDidMount() {
    var self = this;
    axios
      .post(`/dashboard/students`)
      .then(function(response) {
        self.setState(() => ({
          Students: response.data.AllStudents,
          totalStudents: response.data.totalStudents,
          activeStudents: response.data.activeStudents,
          eliminatedStudents: response.data.eliminatedStudents,
          completedStudents: response.data.completedStudents,
          dublicatedStudents: response.data.dublicatedStudents,
          loading: false
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid mt-5 p-3 border rounded m-3 shadowBackground">
        <div className="card m-3 p-3 text-center">
          <h2 className="text-center display-4"> Students </h2>{" "}
          <div className="card-body m-2">
            <div className="row  m-2">
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3"> Total Students </h5>{" "}
                    <p className="card-text">
                      {" "}
                      {this.state.totalStudents
                        ? this.state.totalStudents
                        : 0}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3"> Active Students </h5>{" "}
                    <p className="card-text">
                      {" "}
                      {this.state.activeStudents
                        ? this.state.activeStudents
                        : 0}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3"> Eliminated Students </h5>{" "}
                    <p className="card-text">
                      {" "}
                      {this.state.eliminatedStudents
                        ? this.state.eliminatedStudents
                        : 0}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3"> Complete Students </h5>{" "}
                    <p className="card-text">
                      {" "}
                      {this.state.completedStudents
                        ? this.state.completedStudents
                        : 0}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="row h-100 justify-content-center align-items-center">
              <div className="card">
                <div className="card-body outerEffect">
                  <h5 className="h3"> Dublicated Students </h5>{" "}
                  <p className="card-text">
                    {" "}
                    {this.state.dublicatedStudents
                      ? this.state.dublicatedStudents
                      : 0}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <MyModal entity="Students" data={this.state.Students} />{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Students;
