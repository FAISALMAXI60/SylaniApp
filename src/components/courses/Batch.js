import React from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Body from './Body';
import { connect } from 'react-redux';
import { courseHandler } from '../../store/actions';
import LoadingScreen from '../loadingScreen';


var courseName;
class Batch extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        // let courseObj = this.props.location.name ? JSON.parse(this.props.location.name) : JSON.parse(localStorage.getItem('courseObj'));
        let courseObj = this.props.location.name ? JSON.parse(this.props.location.name) : this.props.courseObj;
        this.props.courseHandler(courseObj);
        localStorage.setItem('courseObj', JSON.stringify(courseObj));
        let relatedCourse = courseObj._id;
        courseName = courseObj.name;
        localStorage.setItem('courseName', courseName);
        var self = this;
        axios.post(`/course/batch`, {
            relatedCourse
        })
            .then(function (response) {
                self.setState(() => ({
                    dataArray: response.data,
                    loading: false
                }));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if(this.state.loading){
            return <LoadingScreen />
        }
        return (
            <div className="container-fluid">
                <Header entity="Batches" addEntity="Batch"
                    home={`/${courseName}/batch`}
                    add={`/${courseName}/batch/add`}
                    active={`/${courseName}/batch/active`}
                    deactive={`/${courseName}/batch/deactivated`}
                    completed={`/${courseName}/batch/completed`}
                    back='/course'
                />
                <h1 className="text-center m-5 display-3">
                    <Link to="/course">
                        <span className="text-dark">{courseName}</span>
                    </Link>
                </h1>
                <h2 className="text-center m-5 display-4">All Batches</h2>
                <Body dataArray={this.state.dataArray} entity="Batch" />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        courseObj: state.course
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseHandler: (courseObj) => dispatch(courseHandler(courseObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Batch);