import React from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Body from './Body';
import { connect } from 'react-redux';
import LoadingScreen from '../loadingScreen';

var nameCourse;
class ActiveBatches extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true
        }
    }
    componentDidMount() {
        var self = this;
        let courseObj = this.props.courseObj;
        // let courseObj = JSON.parse(localStorage.getItem('courseObj'));
        nameCourse = courseObj.name;
        let courseId = courseObj._id;
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
                <Header addEntity="Batch" entity="Batches"
                    home={`/${nameCourse}/batch`}
                    add={`/${nameCourse}/batch/add`}
                    active={`/${nameCourse}/batch/active`}
                    deactive={`/${nameCourse}/batch/deactivated`}
                    completed={`/${nameCourse}/batch/completed`}
                    back={`/course`}
                />
                <h1 className="text-center m-5 display-3">
                    <Link to="/course">
                        <span className="text-dark">{nameCourse}</span>
                    </Link>
                </h1>
                <h2 className="text-center m-5 display-4">All Active Batches</h2>
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

export default connect(mapStateToProps)(ActiveBatches);

