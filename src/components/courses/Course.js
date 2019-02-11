import React from 'react';
import Header from './Header';
import Body from './Body';
import axios from 'axios';
import LoadingScreen from '../loadingScreen';



class Course extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true,
        }
    }
    componentDidMount() {
        var self = this;
        axios.get(`/course`)
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
                <Header entity="Courses" addEntity="Course"
                    home='/course'
                    add='/course/add'
                    active='/course/active'
                    deactive='/course/deactivated'
                    completed='/course/completed'
                    back='/dashboard'
                />
                <h1 className="text-center m-5 display-2">All Courses</h1>
                <Body dataArray={this.state.dataArray} entity="Course" />
            </div>
        )
    }
}


export default Course;

