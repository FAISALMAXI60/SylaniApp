import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../loadingScreen';



var className, batchName, courseName, sectionName, sectionId
class View extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        let sectionObj = JSON.parse(localStorage.getItem('sectionObj'));
        sectionId = sectionObj._id;
        sectionName = sectionObj.name;
        localStorage.setItem('sectionName', sectionName);
        className = localStorage.getItem('className');
        batchName = localStorage.getItem('batchName');
        courseName = localStorage.getItem('courseName');
        var self = this;
        axios.post(`/attendance`, {
            sectionId
        })
            .then(function (response) {
                let attendance = response.data.map((attendance) => {
                    return attendance.attendance
                })
                self.setState(() => ({
                    dataArray: attendance,
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
                    <h1 className="text-center m-5 display-4">
                        <Link to={`/attendance`}>
                            <span className="text-dark">{courseName}/</span>
                        </Link>
                        <Link to={`/attendance/course/batches`}>
                            <span className="text-dark">{batchName}/</span>
                        </Link>
                        <Link to={`/attendance/course/batches/classes`}>
                            <span className="text-dark">{className}/</span>
                        </Link>
                        <Link to={`/attendance/course/batches/classes/sections`}>
                            <span className="text-dark">{sectionName}</span>
                        </Link>
                    </h1>
                    <div className="container-fluid text-center">
                        <Link to="/attendance/course/batches/classes/sections/students">
                            <button className="btn btn-outline-success btn-lg text-center mb-3">
                                Back
                        </button>
                        </Link>
                    </div>
                </div>
                <h1 className="text-center m-5 display-4">All Atendance</h1>
                {this.state.dataArray.length == 0 ? <h2 className='text-center'>No Attendance Record</h2> : this.state.dataArray.map((attendance, i) => {
                    return <div className="card m-2 d-sm-inline-flex p-2 col-sm-2" key={i}>
                        <div className="card-body outerEffect">
                            <Link to={{
                                pathname: `/attendance/view/details`,
                                name: `${JSON.stringify(attendance)}`,
                                state: { fromDashboard: true }
                            }}><h5 className="card-title text-center linksStyle">{attendance[0].date}</h5></Link>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}



export default View;




