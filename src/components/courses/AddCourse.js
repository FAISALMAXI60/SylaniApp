import React from 'react';
import TextField from 'material-ui/TextField';
import Header from './Header';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from 'antd';



class AddCourse extends React.Component {
    state = {
        value: 'Active',
    };
    notify = () => {
        toast.success("Course Added Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    handleChange = (event, index, value) => this.setState({ value })
    addCourseFormHandler = (e) => {
        e.preventDefault();
        let courseTitle = e.target.elements[0].value;
        let link = `/${courseTitle}/batch`;
        let courseStartDate = e.target.elements[1].value;
        let courseEndDate = e.target.elements[2].value;
        let courseNote = e.target.elements[3].value;
        // let courseTeacher1 = e.target.elements[6].value;
        // let courseTeacher2 = e.target.elements[7].value;
        // let courseTeacher3 = e.target.elements[8].value;
        // let teachers = [courseTeacher1, courseTeacher2, courseTeacher3];
        // teachers = JSON.stringify(teachers);
        if (!courseTitle || !courseStartDate || !courseEndDate) {
            return document.getElementById("errorAlertDiv").style.display = 'block';
        }
        let status = this.state.value;
        let createdAt = new Date().toString();
        document.getElementById("errorAlertDiv").style.display = 'none';
        axios.post(`/course/add`, {
            courseTitle, courseStartDate, courseEndDate, link,
            courseNote, status, createdAt
        })
            .then((response) => {
                let self = this;
                if (response.data.errors) {
                    let errorMessage = response.data.errors.note.stringValue;
                    document.getElementById("errorAlertDiv").style.display = 'block';
                    return document.getElementById("errorAlertDiv").innerText = `Error In ${errorMessage}`;
                }
                this.notify();
                // document.getElementById('addBtn').removeAttribute('disabled');
                setTimeout(() => {
                    self.props.history.push('/course');
                }, 2000);

            })
            .catch((err) => {
                alert(err);
            });
        document.getElementById('addBtn').setAttribute('disabled', 'true');
    }

    render() {
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
                <div>
                    <ToastContainer />
                </div>
                <h1 className="text-center m-5 display-2">Add Course</h1>
                <div className="alert alert-danger" id="errorAlertDiv">
                    <strong>Course Data!</strong> <span id='errSpan'>Please Add Course Data Currectly.</span>
                </div>
                <form onSubmit={this.addCourseFormHandler}>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Course Title"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker className='materialDatePicker' placeholder="Course Start Date" mode="landscape" required={true} />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Course End Date" mode="landscape" required={true} />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            hintText="Note About The Course"
                            floatingLabelText="Enter Some Note"
                            multiLine={true}
                            rows={2}
                            type="text"
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <SelectField
                            floatingLabelText="Status"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value='Active' primaryText="Active" />
                            <MenuItem value='Deactivate' primaryText="Deactivate" />
                            <MenuItem value="Completed" primaryText="Completed" />
                        </SelectField>
                    </div>

                    {/* <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Course Teacher 1"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                            required={true}
                        />
                        <TextField
                            floatingLabelText="Enter Course Teacher 2"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                        />
                        <TextField
                            floatingLabelText="Enter Course Teacher 3"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                        />
                    </div> */}
                    <div className="row h-100 justify-content-center align-items-center">
                        <button id='addBtn' type="submit" className="btn btn-outline-success btn-lg text-center m-5">Add Course</button>
                        <button className="btn btn-outline-success btn-lg text-center m-5" onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
}


export default AddCourse;


