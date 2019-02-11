import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../loadingScreen';


var className, batchName, courseName;
class ActiveSections extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        let classObj = this.props.classObj;
        // let classObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('classObj'));
        // localStorage.setItem('classObj', JSON.stringify(classObj));
        let classId = classObj._id;
        className = classObj.name;
        batchName = this.props.batchObj.name;
        courseName = this.props.courseObj.name;
        // courseName = localStorage.getItem('courseName');
        // batchName = localStorage.getItem('batchName');
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
                <Header entity="Sections" addEntity="Section"
                    home={`/${courseName}/${batchName}/${className}/section`}
                    add={`/${courseName}/${batchName}/${className}/section/add`}
                    active={`/${courseName}/${batchName}/${className}/section/active`}
                    deactive={`/${courseName}/${batchName}/${className}/section/deactivated`}
                    completed={`/${courseName}/${batchName}/${className}/section/completed`}
                    back={`/${courseName}/${batchName}/class`}
                />
                <h1 className="text-center m-5 display-3">
                    <Link to={`/course`}>
                        <span className="text-dark">{courseName}/</span>
                    </Link>
                    <Link to={`/${courseName}/batch`}>
                        <span className="text-dark">{batchName}/</span>
                    </Link>
                    <Link to={`/${courseName}/${batchName}/class`}>
                        <span className="text-dark">{className}</span>
                    </Link>
                </h1><h2 className="text-center m-5 display-4">All Active Sections</h2>
                {this.state.dataArray.length == 0 ? <div className="card m-3">
                    <div className="card-body outerEffect">
                        <h4 className="card-title text-center">There Is No Section</h4>
                        <p className="card-text text-center">Please Add A Section.</p>
                    </div>
                </div> : this.state.dataArray.map((Obj, index) => {
                    return <div className="card m-3 p-3 text-center" key={index}>
                        <div className="card-header bg-white text-dark rounded">
                            <Link to={{
                                pathname: `${Obj.link}`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}><h1 className="text-dark display-3 font-weight-bold">{Obj.name}</h1></Link>
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
                                            <h5 className="h3">Start Time</h5>
                                            <p className="card-text">{Obj.startTime}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">End Time</h5>
                                            <p className="card-text">{Obj.endTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row  m-2">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Total Students</h5>
                                            <p className="card-text">{Obj.students ? Obj.students.length : 'None'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                </div>
                            </div>
                            <div className="row m-2">

                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Status</h5>
                                            <p className="card-text">{Obj.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Created At</h5>
                                            <p className="card-text">{Obj.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-light text-success rounded">
                            <div className="row  m-2">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">Start Date</h5>
                                            <p className="card-text">{Obj.startDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-body outerEffect">
                                            <h5 className="h3">End Date</h5>
                                            <p className="card-text">{Obj.endDate}</p>
                                        </div>
                                    </div>
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
        classObj: state.class
    }
}

export default connect(mapStateToProps)(ActiveSections);
