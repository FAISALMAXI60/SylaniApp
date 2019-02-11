import React from 'react';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'antd';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Header from './Header';
// import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import { connect } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let port = process.env.PORT || 3000;


var className, batchName, courseName, componentThis;
class AddSection extends React.Component {
    state = {
        value: 'Active',
    };
    notify = () => {
        toast.success("Section Added Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    handleChange = (event, index, value) => this.setState({ value });
    addSectionFormHandler = (e) => {
        e.preventDefault();
        let sectionTitle = e.target.elements[0].value;
        let link = `/${courseName}/${batchName}/${className}/${sectionTitle}/student`;
        let sectionStartTime = e.target.elements[1].value;
        let sectionEndTime = e.target.elements[2].value;
        let sectionStartDate = e.target.elements[3].value;
        let sectionEndDate = e.target.elements[4].value;
        let sectionNote = e.target.elements[6].value;
        let sectionTeacher1 = e.target.elements[8].value;
        let sectionTeacher2 = e.target.elements[9].value;
        let sectionTeacher3 = e.target.elements[10].value;
        let teachers = [sectionTeacher1, sectionTeacher2, sectionTeacher3];
        teachers = JSON.stringify(teachers);
        let createdAt = new Date().toString();
        let status = this.state.value;
        // let courseObj = JSON.parse(localStorage.getItem('courseObj'));
        // let batchObj = JSON.parse(localStorage.getItem('batchObj'));
        // let classObj = JSON.parse(localStorage.getItem('classObj'));
        let courseObj = this.props.courseObj;
        let batchObj = this.props.batchObj;
        let classObj = this.props.classObj;
        let relatedCourse = courseObj._id;
        let relatedBatch = batchObj._id;
        let relatedClass = classObj._id;
        if (!sectionTitle || !sectionStartDate || !sectionEndDate || !sectionTeacher1) {
            return document.getElementById("errorAlertDiv").style.display = 'block';
        }
        componentThis = this;
        document.getElementById("errorAlertDiv").style.display = 'none';
        axios.post(`/course/batch/class/section/add`, {
            sectionTitle, sectionStartTime, sectionEndTime, sectionStartDate,
            sectionEndDate, sectionNote, teachers,
            createdAt, status, relatedCourse, relatedBatch, relatedClass, link
        })
            .then(function (response) {
                if (response.data.errors) {
                    let errorMessage = response.data.errors.note.stringValue;
                    document.getElementById("errorAlertDiv").style.display = 'block';
                    return document.getElementById("errorAlertDiv").innerText = `Error In ${errorMessage}`;
                }
                componentThis.notify();
                // document.getElementById('addBtn').removeAttribute('disabled');
                setTimeout(() => {
                    componentThis.props.history.push(`/${courseName}/${batchName}/${className}/section`);
                }, 2000);


            })
            .catch(function (error) {
                alert(error)
            });
        document.getElementById('addBtn').setAttribute('disabled', 'true');
    }
    componentDidMount() {
        className = this.props.classObj.name;
        batchName = this.props.batchObj.name;
        courseName = this.props.courseObj.name;
        // className = localStorage.getItem('className')
        // batchName = localStorage.getItem('batchName');
        // courseName = localStorage.getItem('courseName');
    }
    render() {
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
                <div>
                    <ToastContainer />
                </div>
                <h1 className="text-center m-5 display-2">Add Section</h1>
                <div className="alert alert-danger" id="errorAlertDiv">
                    <strong>Section Data!</strong> Please Add Section Data Currectly.
             </div>
                <form onSubmit={this.addSectionFormHandler}>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Section Title"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TimePicker
                            hintText="Section Start Time"
                            autoOk={true}
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TimePicker
                            hintText="Section End Time"
                            autoOk={true}
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Section Start Date" mode="landscape" required={true} />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Section End Date" mode="landscape" required={true} />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            hintText="Note About The Section"
                            floatingLabelText="Enter Some Note"
                            multiLine={true}
                            rows={2}
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
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Section Teacher 1"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            required={true}
                        />
                        <TextField
                            floatingLabelText="Enter Section Teacher 2"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                        <TextField
                            floatingLabelText="Enter Section Teacher 3"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <button id='addBtn' type="submit" className="btn btn-outline-success btn-lg text-center m-5">Add Section</button>
                        <button className="btn btn-outline-success btn-lg text-center m-5" onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>

                </form>
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

export default connect(mapStateToProps)(AddSection);