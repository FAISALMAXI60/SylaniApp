import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../loadingScreen';



class Attendance extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        var self = this;
        axios.get(`/course/active`)
            .then(function (response) {
                self.setState(() => ({
                    dataArray: response.data,
                    loading: false
                }));
            })
            .catch(function (error) {
                alert(error);
            });
    }
    render() {
        if(this.state.loading){
            return <LoadingScreen />
        }
        return (
            <div className='container-fluid border rounded'>
                <Header />
                <h1 className='text-center display-3'>Courses</h1>
                <div className="container-fluid p-3 m-3">
                    {this.state.dataArray.length == 0 ? <div className="card m-3">
                        <div className="card-body p-3 outerEffect">
                            <h4 className="card-title text-center">There Is No Course</h4>
                        </div>
                    </div> : this.state.dataArray.map((Obj, index) => {
                        return <div className="d-sm-inline-flex m-3 p-2 col-sm-2" key={index}>
                            <Link to={{
                                pathname: `/attendance/course/batches`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}><div className="card mb-3 p-3 outerEffect linksStyle rounded text-center center-block">
                                    <div className="card-header">Course No {index + 1}</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{Obj.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    })}
                </div>
            </div>
        )
    }
}


class Header extends React.Component {
    render() {
        return (
            <div className="container-fluid mt-5 p-3  border rounded">
                <div className="container-fluid">
                    <h1 className="text-center display-3">
                        Attendance System
                    </h1>
                </div>
                <div className="container-fluid text-center">
                    <Link to="/dashboard"><button className="btn btn-outline-success btn-lg text-center mb-3">
                        Dashboard
                    </button></Link>

                </div>
            </div>
        )
    }
}

export default Attendance;