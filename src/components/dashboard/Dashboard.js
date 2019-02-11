import React from "react";
import Courses from "./courses";
import Batches from "./batches";
import Classes from "./classes";
import Sections from "./sections";
import Students from "./students";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Dashboard extends React.Component {
  logOutUser = () => {
    this.success();
    let self = this;
    setTimeout(() => {
      return self.props.logout();
    }, 2000);
  };
  success = () => {
    toast.success("Logout Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <Header logOutUser={this.logOutUser} />
        <Courses />
        <Batches />
        <Classes />
        <Sections />
        <Students />
      </div>
    );
  }
}
class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid mt-5 p-3 border rounded shadowBackground">
        <div className="container-fluid">
          <h1 className="text-center">
            Saylani Mass Training And Job Creation Programe Faisalabad
          </h1>
        </div>
        <div>
          <ToastContainer />
        </div>
        <div className="container-fluid text-center">
          <Link to="/course">
            <button className="btn btn-outline-success btn-lg text-center m-3">
              Manage Data
            </button>
          </Link>
          <Link to="/attendance">
            <button className="btn btn-outline-success btn-lg text-center">
              Attendance System
            </button>
          </Link>
        </div>
        <div className="container-fluid text-center">
          <Link to="/blacklist">
            <button className="btn btn-outline-success btn-lg text-center ml-3">
              BlackList
            </button>
          </Link>
          <button
            className="btn btn-outline-danger btn-lg text-center m-3"
            onClick={this.props.logOutUser}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
