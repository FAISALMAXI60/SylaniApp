import React from 'react';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'antd';
// import TimePicker from 'material-ui/TimePicker';
import Header from './Header';
// import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let port = process.env.PORT || 3000;


var courseName, batchName, componentThis;
class AddClass extends React.Component {
    state = {
        value: 'Active',
    };
    notify = () => {
        toast.success("Class Added Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    handleChange = (event, index, value) => this.setState({ value });
    addClassFormHandler = (e) => {
        e.preventDefault();
        let classTitle = e.target.elements[0].value;
        let link = `/${courseName}/${batchName}/${classTitle}/section`;
        let classStartDate = e.target.elements[1].value;
        let classEndDate = e.target.elements[2].value;
        let classNote = e.target.elements[4].value;
        let classTeacher1 = e.target.elements[6].value;
        let classTeacher2 = e.target.elements[7].value;
        let classTeacher3 = e.target.elements[8].value;
        let teachers = [classTeacher1, classTeacher2, classTeacher3];
        teachers = JSON.stringify(teachers);
        let createdAt = new Date().toString();
        let status = this.state.value;
        let courseObj = this.props.courseObj;
        let batchObj = this.props.batchObj;
        // let courseObj = JSON.parse(localStorage.getItem('courseObj'));
        // let batchObj = JSON.parse(localStorage.getItem('batchObj'));
        let relatedCourse = courseObj._id;
        let relatedBatch = batchObj._id;
        if (!classTitle || !classStartDate || !classEndDate || !classTeacher1) {
            return document.getElementById("errorAlertDiv").style.display = 'block';
        };
        componentThis = this;
        document.getElementById("errorAlertDiv").style.display = 'none';
        axios.post(`/course/batch/class/add`, {
            classTitle, classStartDate, classEndDate, link,
            classNote, teachers, status, createdAt, relatedCourse,
            relatedBatch
        })
            .then(function (response) {
                if (response.data.errors) {
                    let errorMessage = response.data.errors.note.stringValue;
                    document.getElementById("errorAlertDiv").style.display = 'block';
                    return document.getElementById("errorAlertDiv").innerText = `Error In ${errorMessage}`;
                }
                // document.getElementById('addBtn').removeAttribute('disabled');
                componentThis.notify();
                setTimeout(() => {
                    componentThis.props.history.push(`/${courseName}/${batchName}/class`);
                }, 2000);
                
            })
            .catch(function (error) {
                alert(error)
            });
            document.getElementById('addBtn').setAttribute('disabled','true');
        }
    componentDidMount() {
        batchName = this.props.batchObj.name;
        courseName = this.props.courseObj.name;
        // batchName = localStorage.getItem('batchName');
        // courseName = localStorage.getItem('courseName');
    }
    render() {
        return (
            <div className="container-fluid">
                <Header entity="Classes" addEntity="Class"
                    home={`/${courseName}/${batchName}/class`}
                    add={`/${courseName}/${batchName}/class/add`}
                    active={`/${courseName}/${batchName}/class/active`}
                    deactive={`/${courseName}/${batchName}/class/deactivated`}
                    completed={`/${courseName}/${batchName}/class/completed`}
                    back={`/${courseName}/batch`}
                />
                <div>
                    <ToastContainer />
                </div>
                <h1 className="text-center m-5 display-2">Add Class</h1>
                <div className="alert alert-danger" id="errorAlertDiv">
                    <strong>Class Data!</strong> Please Add Class Data Currectly.
                </div>
                <form onSubmit={this.addClassFormHandler}>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Classes Title"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Classes Start Date" mode="landscape" required={true}/>
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Classes End Date" mode="landscape" required={true}/>
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            hintText="Note About The Classes"
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
                            floatingLabelText="Enter Classes Teacher 1"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            required={true}
                        />
                        <TextField
                            floatingLabelText="Enter Classes Teacher 2"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                        <TextField
                            floatingLabelText="Enter Classes Teacher 3"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <button id='addBtn'  type="submit" className="btn btn-outline-success btn-lg text-center m-5">Add Class</button>
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
        batchObj: state.batch
    }
}

export default connect(mapStateToProps)(AddClass);
