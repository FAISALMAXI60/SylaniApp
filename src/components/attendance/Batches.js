import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../loadingScreen';


var courseName;
class Batches extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        let courseObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('courseObj'));
        localStorage.setItem('courseObj', JSON.stringify(courseObj));
        let courseId = courseObj._id;
        courseName = courseObj.name;
        localStorage.setItem('courseName', courseName);
        var self = this;
        axios.post(`/course/batch/active`, {
            courseId
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
                        <Link to="/attendance">
                            <span className="text-dark">{courseName}</span>
                        </Link>
                    </h1>
                </div>
                <h2 className="text-center m-5 display-4">All Batches</h2>
                <div className="container-fluid p-3 m-3 border">
                    {this.state.dataArray.length == 0 ? <div className="card m-3">
                        <div className="card-body p-3">
                            <h4 className="card-title text-center">There Is No Batch</h4>
                        </div>
                    </div> : this.state.dataArray.map((Obj, index) => {
                        return <div className="d-sm-inline-flex text-center p-2 col-sm-2" key={index}>
                            <Link to={{
                                pathname: `/attendance/course/batches/classes`,
                                name: `${JSON.stringify(Obj)}`,
                                state: { fromDashboard: true }
                            }}><div className="card mb-3 p-3 outerEffect linksStyle rounded">
                                    <div className="card-header">Batch No {index + 1}</div>
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


export default Batches;