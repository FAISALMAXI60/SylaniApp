import React from "react";
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import MyModal from "./showMore";

class Batches extends React.Component {
  state = {
    batches: [],
    totalBatches: 0,
    activeBatches: 0,
    deactiveBatches: 0,
    completedBatches: 0,
    loading: true
  }
  componentDidMount() {
    var self = this;
    axios
      .post(`/dashboard/batches`)
      .then(function(response) {
        self.setState(() => ({
          batches: response.data.AllBatches,
          totalBatches: response.data.totalBatches,
          activeBatches: response.data.activeBatches,
          deactiveBatches: response.data.deactiveBatches,
          completedBatches: response.data.completedBatches,
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
          <h2 className="text-center display-4">Batches</h2>
          <div className="card-body m-2">
            <div className="row  m-2">
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Total Batches</h5>
                    <p className="card-text">
                      {this.state.totalBatches ? this.state.totalBatches : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Active Batches</h5>
                    <p className="card-text">
                      {this.state.activeBatches ? this.state.activeBatches : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Deactive Batches</h5>
                    <p className="card-text">
                      {this.state.deactiveBatches
                        ? this.state.deactiveBatches
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-body outerEffect">
                    <h5 className="h3">Complete Batches</h5>
                    <p className="card-text">
                      {this.state.completedBatches
                        ? this.state.completedBatches
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <MyModal entity="Batches" data={this.state.batches} />
        </div>
      </div>
    );
  }
}

export default Batches;
