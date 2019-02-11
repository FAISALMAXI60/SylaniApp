import React from "react";
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import MyModal from "./showMore";

class Classes extends React.Component {
  constructor() {
    super();
    this.state = {
      Classes: [],
      totalClasses: 0,
      activeClasses: 0,
      deactiveClasses: 0,
      completedClasses: 0,
      loading: true
    };
  }
  componentDidMount() {
    var self = this;
    axios
      .post(`/dashboard/classes`)
      .then(function(response) {
        self.setState(() => ({
          Classes: response.data.AllClasses,
          totalClasses: response.data.totalClasses,
          activeClasses: response.data.activeClasses,
          deactiveClasses: response.data.deactiveClasses,
          completedClasses: response.data.completedClasses,
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
          <h2 className="text-center display-4">Classes</h2>
          <div className="card-body m-2">
            <div className="row  m-2">
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Total Classes</h5>
                    <p className="card-text">
                      {this.state.totalClasses ? this.state.totalClasses : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Active Classes</h5>
                    <p className="card-text">
                      {this.state.activeClasses ? this.state.activeClasses : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Deactive Classes</h5>
                    <p className="card-text">
                      {this.state.deactiveClasses
                        ? this.state.deactiveClasses
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Complete Classes</h5>
                    <p className="card-text">
                      {this.state.completedClasses
                        ? this.state.completedClasses
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <MyModal entity="Classes" data={this.state.Classes} />
        </div>
      </div>
    );
  }
}

export default Classes;
