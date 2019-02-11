import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../loadingScreen';


var courseName, batchName;
class Classes extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        var self = this;
        let batchObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('batchObj'));
        localStorage.setItem('batchObj', JSON.stringify(batchObj));
        batchName = batchObj.name;
        localStorage.setItem('batchName', batchName);
        let batchId = batchObj._id;
        courseName = localStorage.getItem('courseName');
        axios.post(`/course/batch/class/active`, {
            batchId
        })
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
            <div className="container-fluid border">
                <div className="container-fluid border mt-3">
                    <h1 className="text-center m-5 display-3">
                        <Link to="/attendance">
                            <span className="text-dark">{courseName}/</span>
                        </Link>
                        <Link to="/attendance/course/batches">
                            <span className="text-dark">{batchName}</span>
                        </Link>
                    </h1>
                </div>
                <h2 className="text-center m-5 display-4">All Classes</h2>
                <div className="container-fluid p-3 m-3 border">
                    {this.state.dataArray.length == 0 ? <div className="card m-3">
                        <div className="card-body p-3 outerEffect">
                            <h4 className="card-title text-center">There Is No Class</h4>
                        </div>
                    </div> : this.state.dataArray.map((Obj, index) => {
                        return <div className="d-sm-inline-flex text-center p-2 col-sm-2" key={index}>
                            <Link to={{
                                pathname: `/attendance/course/batches/classes/sections`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}><div className="card mb-3 p-3 outerEffect">
                                    <div className="card-header">Class No {index + 1}</div>
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


export default Classes;