import React from "react";
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import MyModal from "./showMore";

class Sections extends React.Component {
  constructor() {
    super();
    this.state = {
      Sections: [],
      totalSections: 0,
      activeSections: 0,
      deactiveSections: 0,
      completedSections: 0,
      loading: true
    };
  }
  componentDidMount() {
    var self = this;
    axios
      .post(`/dashboard/Sections`)
      .then(function(response) {
        self.setState(() => ({
          Sections: response.data.AllSections,
          totalSections: response.data.totalSections,
          activeSections: response.data.activeSections,
          deactiveSections: response.data.deactiveSections,
          completedSections: response.data.completedSections,
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
          <h2 className="text-center display-4">Sections</h2>
          <div className="card-body m-2">
            <div className="row  m-2">
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Total Sections</h5>
                    <p className="card-text">
                      {this.state.totalSections ? this.state.totalSections : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Active Sections</h5>
                    <p className="card-text">
                      {this.state.activeSections
                        ? this.state.activeSections
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Deactive Sections</h5>
                    <p className="card-text">
                      {this.state.deactiveSections
                        ? this.state.deactiveSections
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Complete Sections</h5>
                    <p className="card-text">
                      {this.state.completedSections
                        ? this.state.completedSections
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <MyModal entity="Sections" data={this.state.Sections} />
        </div>
      </div>
    );
  }
}

export default Sections;
