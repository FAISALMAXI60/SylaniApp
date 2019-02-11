import React from 'react';
import TextField from 'material-ui/TextField';
import { DatePicker } from 'antd';
import Header from './Header';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import {courseHandler} from '../../store/actions';
let port = process.env.PORT || 3000;


var courseName, componentThis;
class AddBatch extends React.Component {
    state = {
        value: 'Active',
        courseObj: {}
    };
    notify = () => {
        toast.success("Batch Added Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    handleChange = (event, index, value) => this.setState({ value });
    addBatchFormHandler = (e) => {
        e.preventDefault();
        let batchTitle = e.target.elements[0].value;
        let batchStartDate = e.target.elements[1].value;
        let batchEndDate = e.target.elements[2].value;
        let batchNote = e.target.elements[3].value;
        let batchTeacher1 = e.target.elements[6].value;
        let batchTeacher2 = e.target.elements[7].value;
        let batchTeacher3 = e.target.elements[8].value;
        let teachers = [batchTeacher1, batchTeacher2, batchTeacher3];
        let link = `/${courseName}/${batchTitle}/class`;
        teachers = JSON.stringify(teachers);
        let createdAt = new Date().toString();
        let status = this.state.value;
        let relatedCourse = this.state.courseObj._id ? this.state.courseObj._id : 'No Id Found';
        if (!batchTitle || !batchStartDate || !batchEndDate || !batchTeacher1) {
            return document.getElementById("errorAlertDiv").style.display = 'block';
        }
        document.getElementById("errorAlertDiv").style.display = 'none';
        componentThis = this;
        axios.post(`/course/batch/add`, {
            batchTitle, batchStartDate, batchEndDate, link,
            batchNote, teachers, status, createdAt, relatedCourse
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
                    componentThis.props.history.push(`/${courseName}/batch`);
                }, 2000);
            })
            .catch(function (error) {
                alert(error)
            });
            document.getElementById('addBtn').setAttribute('disabled','true');
    }
    componentDidMount() {
        let courseObj = this.props.courseObj;
        // let courseObj = JSON.parse(localStorage.getItem('courseObj'));
        this.setState(() => ({ courseObj }));
    }
    componentWillMount() {
        courseName = localStorage.getItem('courseName');
    }
    render() {
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
                <div>
                    <ToastContainer />
                </div>
                <h1 className="text-center m-5 display-2">Add Batch</h1>
                <div className="alert alert-danger" id="errorAlertDiv">
                    <strong>Batch Data!</strong> Please Add Batch Data Currectly.
                </div>
                <form onSubmit={this.addBatchFormHandler}>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Batch Title"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                            required={true}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Batch Start Date" mode="landscape" required={true}/>
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <DatePicker placeholder="Batch End Date" mode="landscape" required={true}/>
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            hintText="Note About The Batch"
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
                    <div className="row h-100 justify-content-center align-items-center">
                        <TextField
                            floatingLabelText="Enter Batch Teacher 1"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                            required={true}
                        />
                        <TextField
                            floatingLabelText="Enter Batch Teacher 2"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                        />
                        <TextField
                            floatingLabelText="Enter Batch Teacher 3"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            type="text"
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <button id='addBtn'  type="submit" className="btn btn-outline-success btn-lg text-center m-5">Add Batch</button>
                        <button className="btn btn-outline-success btn-lg text-center m-5" onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        courseObj: state.course
    }
}

export default connect(mapStateToProps)(AddBatch);