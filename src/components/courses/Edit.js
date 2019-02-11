import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import styles from './styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let teacher1, teacher2, teacher3, statusChange = false, componentThis;
class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            object: {
                rollNo: '',
                name: '',
                note: '',
                relatedSection: [{ name: 'Name', _id: 'ID' }],
                fatherName: '',
                cnic: '',
                contact: '',
                guardianContact: '',
                email: '',
                status: 'Active',
            },
            teachers: [],
            sections: [{ name: '', id: '' }, { name: '', id: '' }, { name: '', id: '' }, { name: '', id: '' }, { name: '', id: '' }, { name: '', id: '' }, { name: '', id: '' }]

        }
    }
    notify = () => {
        toast.success("Changes Saved Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    formHandler = (e) => {
        e.preventDefault();
        let id = this.state.object._id;
        let rollNo = this.state.object.rollNo ? this.state.object.rollNo : 'None';
        let name = this.state.object.name ? this.state.object.name : 'None';
        let note = this.state.object.note;
        let oldSection = this.state.object.relatedSection || typeof (this.state.object.relatedSection) == Object ? this.state.object.relatedSection[0]._id : 'None';
        let relatedSection = e.target.elements.sectionsSelect.value;
        let relatedClass = this.state.object.relatedClass && typeof (this.state.object.relatedClass) == Object ? this.state.object.relatedClass[0]._id : 'None';
        let relatedBatch = this.state.object.relatedBatch && typeof (this.state.object.relatedBatch) == Object ? this.state.object.relatedBatch[0]._id : 'None';
        let relatedCourse = this.state.object.relatedCourse && typeof (this.state.object.relatedSection) == Object ? this.state.object.relatedCourse[0]._id : 'None';
        let fatherName = this.state.object.fatherName ? this.state.object.fatherName : 'None';
        let cnic = this.state.object.cnic ? this.state.object.cnic : 'None';
        let contact = this.state.object.contact ? this.state.object.contact : 'None';;
        let guardianContact = this.state.object.guardianContact;
        let email = this.state.object.email;
        let status = this.state.object.status;
        let startTime = e.target.elements[7].value ? e.target.elements[7].value : this.state.object.startTime;
        let endTime = e.target.elements[8].value ? e.target.elements[8].value : this.state.object.endTime;
        let startDate = e.target.elements[9].value ? e.target.elements[9].value : this.state.object.startDate;
        let endDate = e.target.elements[10].value ? e.target.elements[10].value : this.state.object.endDate;
        let teachers = JSON.stringify(this.state.teachers);
        if (!relatedCourse == 'None' && !relatedBatch == 'None' && !relatedClass == 'None' && !relatedSection == 'None') {
            if (!rollNo == 'None' || !name == 'None' || !cnic == 'None' || !contact == 'None')
                return document.getElementById("errorAlertDiv").style.display = 'block';
        }
        if (this.state.teachers[0] == '' && this.state.teachers[1] == '' && this.state.teachers[2] == '') {
            return document.getElementById("errorAlertDiv").style.display = 'block';
        }
        document.getElementById("errorAlertDiv").style.display = 'none';
        axios.post('/course/edit', {
            rollNo, name, note, relatedSection, relatedClass, relatedBatch, relatedCourse,
            fatherName, cnic, contact,
            guardianContact, email, status, teachers, id, startDate, endDate,
            startTime, endTime, statusChange, oldSection
        })
            .then(function (response) {
                componentThis.notify();
                setTimeout(() => {
                    componentThis.props.history.goBack();
                }, 2000);


            })
            .catch(function (error) {
                alert(error)
            });
    }
    handleChange = (e, i, value) => {
        let status = value;
        statusChange = true;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, status: status
            }
        }));
    }

    onChangeRollNo = (e) => {
        let rollNo = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, rollNo: rollNo
            }
        }));
    }

    onChangeName = (e) => {
        let name = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, name: name
            }
        }));
    }

    onChangeNote = (e) => {
        let note = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, note: note
            }
        }));
    }


    onChangeFatherName = (e) => {
        let fatherName = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, fatherName: fatherName
            }
        }));
    }

    onChangeCNIC = (e) => {
        let cnic = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, cnic: cnic
            }
        }));
    }

    onChangeContact = (e) => {
        let contact = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, contact: contact
            }
        }));
    }

    onChangeGuardianContact = (e) => {
        let guardianContact = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, guardianContact: guardianContact
            }
        }));
    }

    onChangeEmail = (e) => {
        let email = e.target.value;
        this.setState((prevState) => ({
            object: {
                ...prevState.object, email: email
            }
        }));
    }
    onChangeTeacher1 = (e) => {
        teacher1 = e.target.value;
        this.setState((prevState) => ({
            teachers: [teacher1, teacher2, teacher3]
        }));
    }
    onChangeTeacher2 = (e) => {
        teacher2 = e.target.value;
        this.setState((prevState) => ({
            teachers: [teacher1, teacher2, teacher3]
        }));
    }
    onChangeTeacher3 = (e) => {
        teacher3 = e.target.value;
        this.setState((prevState) => ({
            teachers: [teacher1, teacher2, teacher3]
        }));
    }
    componentDidMount() {
        componentThis = this;
        var self = this;
        let object = JSON.parse(this.props.location.name)
        if (object.teachers) {
            let teachers = JSON.parse(object.teachers);
            teacher1 = teachers[0];
            teacher2 = teachers[1];
            teacher3 = teachers[2];
            this.setState(() => ({ teachers }));
        }
        if (object.rollNo) {
            let relatedClass = object.relatedClass;
            axios.post('/course/edit/getSections', {
                relatedClass
            })
                .then(function (response) {
                    var sections = response.data.map((section) => {
                        return { name: section.name, id: section._id }
                    })
                    self.setState(() => ({ sections }))
                })
                .catch(function (error) {
                    alert(error);
                });

        }
        this.setState(() => ({ object }));

    }
    render() {
        return (
            <div className="container-fluid">
                <div className="card text-center mb-3 mt-3">
                    <div className="card-header">

                    </div>
                    <div className="card-body">
                        <h1>Edit</h1>
                    </div>
                    <div className="card-footer text-muted">

                    </div>
                </div>
                <div className="alert alert-danger" id="errorAlertDiv">
                    <strong>Edit Data!</strong> Please Edit Data Currectly.
                </div>
                <div>
                    <ToastContainer />
                </div>
                <form onSubmit={this.formHandler}>
                    <div className={this.state.object.rollNo != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.rollNo == undefined ? '' : this.state.object.rollNo}
                            onChange={this.onChangeRollNo}
                            floatingLabelText="Enter Roll Number"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                        />
                    </div>
                    <div className={this.state.object.rollNo != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.name == undefined ? '' : this.state.object.name}
                            onChange={this.onChangeName}
                            floatingLabelText="Enter Name"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                        />
                    </div>
                    <div className={this.state.object.fatherName != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.fatherName == undefined ? '' : this.state.object.fatherName}
                            onChange={this.onChangeFatherName}
                            floatingLabelText="Enter Father Name"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                        />
                    </div>
                    <div className={this.state.object.cnic != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.cnic == undefined ? '' : this.state.object.cnic}
                            onChange={this.onChangeCNIC}
                            floatingLabelText="Enter  CNIC"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                            type='number'
                            min='13'
                        />
                    </div>
                    <div className={this.state.object.contact != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.contact == undefined ? '' : this.state.object.contact}
                            onChange={this.onChangeContact}
                            floatingLabelText="Enter Contact Number"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                            type='number'
                            min='11'
                        />
                    </div>
                    <div className={this.state.object.guardianContact != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.guardianContact == undefined ? '' : this.state.object.guardianContact}
                            onChange={this.onChangeGuardianContact}
                            floatingLabelText="Enter Guardian Contact Number"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                            type='number'
                            min='11'
                        />
                    </div>
                    <div className={this.state.object.email != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.email == undefined ? '' : this.state.object.email}
                            onChange={this.onChangeEmail}
                            floatingLabelText="Enter Email"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}

                            type='email'
                        />
                    </div>
                    <div className={this.state.object.startTime ? 'row h-100 justify-content-center align-items-center mt-4' : 'd-none'}>
                        <h3 className='text text-muted'>Current Start Time {this.state.object.startTime}</h3>
                    </div>
                    <div className={this.state.object.startTime ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TimePicker hintText="Start Time" mode="landscape" />
                    </div>
                    <div className={this.state.object.endTime ? 'row h-100 justify-content-center align-items-center mt-4' : 'd-none'}>
                        <h3 className='text text-muted'>Current End Time {this.state.object.endTime}</h3>
                    </div>
                    <div className={this.state.object.endTime ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TimePicker hintText="End Time" mode="landscape" />
                    </div>
                    <div className={this.state.object.startDate ? 'row h-100 justify-content-center align-items-center mt-4' : 'd-none'}>
                        <h3 className='text text-muted'>Current Start Date {this.state.object.startDate}</h3>
                    </div>
                    <div className={this.state.object.startDate ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <DatePicker hintText="Start Date" mode="landscape" id='startDatePicker' />
                    </div>
                    <div className={this.state.object.endDate ? 'row h-100 justify-content-center align-items-center mt-4' : 'd-none'}>
                        <h3 className='text text-muted'>Current End Date {this.state.object.endDate}</h3>
                    </div>
                    <div className={this.state.object.endDate ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <DatePicker hintText="End Date" mode="landscape" id='endDatePicker' />
                    </div>
                    <div className={this.state.object.note != undefined ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.object.note == undefined ? '' : this.state.object.note}
                            onChange={this.onChangeNote}
                            hintText="Note"
                            floatingLabelText="Enter Some Note"
                            multiLine={true}
                            rows={2}
                        />
                    </div>
                    <div className={this.state.object.relatedSection ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <div className="form-group p-5">
                            <label htmlFor="sections">Section</label>
                            <select className="form-control" id="sectionsSelect">
                                <option
                                    value={this.state.object.relatedSection ? this.state.object.relatedSection[0]._id : 'None'}
                                    className={typeof (this.state.object.relatedSection) == Array ? this.state.object.relatedSection[0] : 'd-none'}
                                >
                                    {this.state.object.relatedSection && this.state.object.relatedSection[0] != undefined ? `${this.state.object.relatedSection[0].name} (Current)` : 'None'}</option>
                                <option value={this.state.sections[0] ? this.state.sections[0].id : "None"}
                                    className={this.state.sections[0] ? '' : 'd-none'}>
                                    {this.state.sections[0] ? this.state.sections[0].name : 'None'}</option>
                                <option value={this.state.sections[1] ? this.state.sections[1].id : "None"}
                                    className={this.state.sections[1] ? '' : 'd-none'}>
                                    {this.state.sections[1] ? this.state.sections[1].name : 'None'}
                                </option>
                                <option value={this.state.sections[2] ? this.state.sections[2].id : "None"}
                                    className={this.state.sections[2] ? '' : 'd-none'}>
                                    {this.state.sections[2] ? this.state.sections[2].name : 'None'}</option>
                                <option value={this.state.sections[3] ? this.state.sections[3].id : "None"}
                                    className={this.state.sections[3] ? '' : 'd-none'}>
                                    {this.state.sections[3] ? this.state.sections[3].name : 'None'}</option>
                                <option value={this.state.sections[4] ? this.state.sections[4].id : "None"}
                                    className={this.state.sections[4] ? '' : 'd-none'}>
                                    {this.state.sections[4] ? this.state.sections[4].name : 'None'}</option>
                                <option value={this.state.sections[5] ? this.state.sections[5].id : "None"}
                                    className={this.state.sections[5] ? '' : 'd-none'}>
                                    {this.state.sections[5] ? this.state.sections[5].name : 'None'}</option>
                            </select>
                        </div>
                    </div>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <SelectField
                            floatingLabelText="Status"
                            value={this.state.object.status == undefined ? 'Active' : this.state.object.status}
                            onChange={this.handleChange}
                        >
                            <MenuItem value='Active' primaryText="Active" />
                            <MenuItem value={this.state.object.rollNo ? `Eliminated` : 'Deactivate'} primaryText={this.state.object.rollNo ? `Eliminated` : 'Deactivate'} />
                            <MenuItem value="Completed" primaryText="Completed" />
                        </SelectField>
                    </div>
                    <div className={this.state.teachers.length != 0 ? 'row h-100 justify-content-center align-items-center' : 'd-none'}>
                        <TextField
                            value={this.state.teachers[0] == undefined ? ' ' : this.state.teachers[0]}
                            onChange={this.onChangeTeacher1}
                            floatingLabelText="Enter Teacher 1"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                        <TextField
                            value={this.state.teachers[1] == undefined ? ' ' : this.state.teachers[1]}
                            onChange={this.onChangeTeacher2}
                            floatingLabelText="Enter Teacher 2"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                        <TextField
                            value={this.state.teachers[2] == undefined ? ' ' : this.state.teachers[2]}
                            onChange={this.onChangeTeacher3}
                            floatingLabelText="Enter Teacher 3"
                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />
                    </div>
                    <div className="row h-100 justify-content-center align-items-center">
                        <button type="submit" className="btn btn-outline-success btn-lg text-center m-5">Save Changes</button>
                        <button className="btn btn-outline-success btn-lg text-center m-5" onClick={() => this.props.history.goBack()}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default Edit;



