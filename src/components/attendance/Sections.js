import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../loadingScreen';


var className, batchName, courseName;
class Sections extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        let classObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('classObj'));
        localStorage.setItem('classObj', JSON.stringify(classObj));
        let classId = classObj._id;
        className = classObj.name;
        localStorage.setItem('className', className);
        batchName = localStorage.getItem('batchName');
        courseName = localStorage.getItem('courseName');
        var self = this;
        axios.post(`/course/batch/class/section/active`, {
            classId
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
            <div className="container-fluid">
                <div className="container-fluid border mt-3">
                    <h1 className="text-center m-5 display-3">
                        <Link to={`/attendance`}>
                            <span className="text-dark">{courseName}/</span>
                        </Link>
                        <Link to={`/attendance/course/batches`}>
                            <span className="text-dark">{batchName}/</span>
                        </Link>
                        <Link to={`/attendance/course/batches/classes`}>
                            <span className="text-dark">{className}</span>
                        </Link>
                    </h1>
                </div>
                <h2 className="text-center m-5 display-4">All Sections</h2>
                <div className="container-fluid p-3 m-3 border">
                    {this.state.dataArray.length == 0 ? <div className="card m-3">
                        <div className="card-body p-3 outerEffect">
                            <h4 className="card-title text-center">There Is No Section</h4>
                        </div>
                    </div> : this.state.dataArray.map((Obj, index) => {
                        return <div className="d-sm-inline-flex text-center p-2 col-sm-2" key={index}>
                            <Link to={{
                                pathname: `/attendance/course/batches/classes/sections/students`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}><div className="card mb-3 p-3 outerEffect">
                                    <div className="card-header">Section No {index + 1}</div>
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


export default Sections;