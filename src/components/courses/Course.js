import React from 'react';
import Header from './Header';
import Body from './Body';
import axios from 'axios';
import { Link } from "react-router-dom";
import LoadingScreen from '../loadingScreen';
import { func } from 'prop-types';



class Course extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
            loading: true,
            batchesName: [],
            batches: [],
            classesName: [],
            classes: [],
            sectionName: [],
            sections: []
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
    onCourseChange = (evt) => {
        // let selectedIndex = evt.target.value;
        debugger;
        let tCourse = this.state.dataArray.find((item) => {
            return item.name == evt.target.value;
        })

        if (tCourse) {
            let batchesName = tCourse.batches.map((item) => {
                return item.name
            });
            this.setState((res) => { return { batches: tCourse.batches, batchesName: batchesName } })

        }
    }

    onBatchChange = (evt) => {
        debugger;
        let tBatch = this.state.batches.find((item) => {
            return item.name == evt.target.value;
        })

        // if (tBatch) {

        // let sections = [];

        axios.post(`/course/batch/class/all`, { relatedBatch: tBatch._id })
            .then((response) => {
                let classesName = response.data.map((item) => {
                    return item.name
                });
                this.setState({
                    // sections:sections,
                    classes: response.data,
                    classesName: classesName
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onClassChange = (evt) => {
        debugger;


        let tClass = this.state.classes.find((item) => {
            return item.name == evt.target.value;
        })

        if (tClass) {
            let sectionName = tClass.sections.map((item) => {
                return item.name
            });

            this.setState({
                sections: tClass.sections,
                sectionName: sectionName
            })
        }
    }


    render() {
        if (this.state.loading) {
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
                <form>
                    <select className="form-control" id="form" onChange={this.onCourseChange.bind(this)}>

                        <option>Select a Course</option>
                        {this.state.dataArray.map((Obj) =>
                            < option value={Obj.id}>
                                {Obj.name}
                            </option>
                        )}
                    </select>

                    <select className="form-control" id="form2" onChange={this.onBatchChange.bind(this)}>

                        <option>Select a Batch</option>
                        {this.state.batchesName.map((Obj) =>
                            <option>
                                {Obj}
                            </option>
                        )}
                    </select>

                    <select className="form-control" id="form3" onChange={this.onClassChange.bind(this)}>

                        <option>Select a class</option>
                        {this.state.classesName.map((Obj) => {
                            return <option>
                                {Obj}
                            </option>
                        }

                        )}
                    </select>

                    <select className="form-control" id="form3">

                        <option>Select a class</option>
                        {this.state.sectionName.map((Obj) => {
                            return <option>
                                {Obj}
                            </option>
                        }

                        )}
                    </select>
                </form>
                <Body dataArray={this.state.dataArray} entity="Course" />
            </div>
        )
    }
}


export default Course;


{/* <FormControl
    id="user"
    componentClass="select"
    onChange={this.handleChange.bind(this)}
>
    {userlist.map((r, i) =>
        <option
            key={i}
            >
            {r.name}
        </option>
    )}
</FormControl> */}

