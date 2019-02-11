import React from "react";
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import MyModal from "./showMore";

class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      totalCourses: 0,
      activeCourses: 0,
      deactiveCourses: 0,
      completedCourses: 0,
      loading: true
    };
  }
  componentDidMount() {
    var self = this;
    axios
      .post(`/dashboard/courses`)
      .then(function(response) {
        self.setState(() => ({
          courses: response.data.AllCourses,
          totalCourses: response.data.totalCourses,
          activeCourses: response.data.activeCourses,
          deactiveCourses: response.data.deactiveCourses,
          completedCourses: response.data.completedCourses,
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
          <h2 className="text-center display-4">Courses</h2>
          <div className="card-body m-2">
            <div className="row m-2 p-1">
              <div className="col-sm-3 ">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Total Courses</h5>
                    <p className="card-text">
                      {this.state.totalCourses ? this.state.totalCourses : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Active Courses</h5>
                    <p className="card-text">
                      {this.state.activeCourses ? this.state.activeCourses : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Deactive Courses</h5>
                    <p className="card-text">
                      {this.state.deactiveCourses
                        ? this.state.deactiveCourses
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Complete Courses</h5>
                    <p className="card-text">
                      {this.state.completedCourses
                        ? this.state.completedCourses
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <MyModal entity="Courses" data={this.state.courses} />
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
