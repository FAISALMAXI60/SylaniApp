import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../loadingScreen';


var className, batchName, courseName, sectionName;
class ActiveStudents extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        let sectionObj = this.props.sectionObj;
        className = this.props.classObj.name;
        batchName = this.props.batchObj.name;
        courseName = this.props.courseObj.name;
        let sectionId = sectionObj._id;
        sectionName = sectionObj.name;
        var self = this;
        axios.post(`/course/batch/class/section/student/active`, {
            sectionId
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
                <Header entity="Students" addEntity="Student"
                    home={`/${courseName}/${batchName}/${className}/${sectionName}/student`}
                    add={`/${courseName}/${batchName}/${className}/${sectionName}/student/add`}
                    active={`/${courseName}/${batchName}/${className}/${sectionName}/student/active`}
                    deactive={`/${courseName}/${batchName}/${className}/${sectionName}/student/eliminated`}
                    completed={`/${courseName}/${batchName}/${className}/${sectionName}/student/completed`}
                    back={`/${courseName}/${batchName}/${className}/section`}
                />
                <h1 className="text-center m-5 display-4">
                    <Link to='/course'>
                        <span className="text-dark">{courseName}/</span>
                    </Link>
                    <Link to={`/${courseName}/batch`}>
                        <span className="text-dark">{batchName}/</span>
                    </Link>
                    <Link to={`/${courseName}/${batchName}/class`}>
                        <span className="text-dark">{className}/</span>
                    </Link>
                    <Link to={`/${courseName}/${batchName}/${className}/section`}>
                        <span className="text-dark">{sectionName}</span>
                    </Link>
                </h1><h2 className="text-center m-5 display-4">All Active Students</h2>
                {this.state.dataArray.length == 0 ? <div className="card m-3">
                    <div className="card-body outerEffect">
                        <h4 className="card-title text-center">There Is No Student</h4>
                        <p className="card-text text-center">Please Add A Student.</p>
                    </div>
                </div> : this.state.dataArray.map((Obj, index) => {
                    return <div className="card m-3 p-3 text-center" key={index}>
                        <div className="card-header bg-white text-dark rounded">
                            <h1 className="text-dark display-3 font-weight-bold">{Obj.rollNo}</h1>
                            <Link to={{
                                pathname: `/${Obj.name}/details`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}>
                                <button type="button" className="btn btn-outline-success btn-lg">
                                    Details
                         </button>
                            </Link>
                            <Link to={{
                                pathname: `/${Obj.name}/edit`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}>
                                <button type="button" className="btn btn-outline-success btn-lg ml-2">
                                    Edit
                         </button>
                            </Link>
                        </div>
                        <div className="card-body m-2">
                            <div className="row  m-2">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Student Name</h5>
                                            <p className="card-text">{Obj.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Student Contact</h5>
                                            <p className="card-text">{Obj.contact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Student Email</h5>
                                            <p className="card-text">{Obj.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Status</h5>
                                            <p className="card-text">{Obj.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid border rounded p-3 m-2 outerEffect">
                                <div className="container-fluid">
                                    <h3 className="text-center">Created At</h3>
                                </div>
                                <div className="container-fluid">
                                    <p className="card-text">{Obj.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        courseObj: state.course,
        batchObj: state.batch,
        classObj: state.class,
        sectionObj: state.section
    }
}

export default connect(mapStateToProps)(ActiveStudents);