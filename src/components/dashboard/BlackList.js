import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import styles from '../courses/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let port = process.env.PORT || 3000;


class BlackList extends React.Component {
    state = {
        dataArray: []
    }
    componentDidMount() {
        let self = this;
        axios.post(`/blacklist`, {

        })
            .then(function (response) {
                self.setState(() => ({ dataArray: response.data }));
            })
            .catch(function (error) {
                alert(error);
            });
    }
    notify = () => {
        toast.error("Fill Correctly!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    alreadyInList = () => {
        toast.error("Person Is Already BlackListed!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    dataError = () => {
        toast.error("Enter Data Currectly!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    errorServer = () => {
        toast.error("Error In Server!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    notifySuccess = () => {
        toast.success("Added Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    notifyRemoveInfo = () => {
        toast.info("Removed Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    handleAddBlackList = () => {
        let cnic = document.getElementById('personCNIC').value;
        let note = document.getElementById('personNote').value;
        if(!cnic || !note){
            return this.dataError()
        }
        if(this.state.dataArray.length != 0){
           let result = this.state.dataArray.find((BlackLIstPerson)=>{
                return BlackLIstPerson.cnic == cnic
            });
            if(result){
                return this.alreadyInList();
            }
        }
        let self = this;
        if (cnic.length < 13) {
            return this.notify();
        } else {
            axios.post(`/blacklist/add`, {
                cnic, note
            })
                .then((response) => {
                    if(response.data.errors){
                        return this.errorServer();
                    }
                    this.notifySuccess();
                    this.setState(() => ({ dataArray: response.data }));
                    document.getElementById('closeAddModal').click();

                })
                .catch((err) => {
                    alert(err);
                });
        }
        document.getElementById('personCNIC').value = '';
        document.getElementById('personNote').value = '';
    }
    removeCNIC = (id) => {
        let self = this;
        axios.post('/blacklist/remove', {
            id
        })
            .then(function (response) {
                self.setState(() => ({ dataArray: response.data }));
                self.notifyRemoveInfo();
            })
            .catch(function (error) {
                alert(error);
            })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="container-fluid mt-5 p-3 border rounded">
                    <div className="container-fluid">
                        <h1 className="text-center">
                            BlackList For SMTPF
                </h1>
                    </div>
                    <div>
                        <ToastContainer />
                    </div>
                    <div className="container-fluid text-center">
                        <button className="btn btn-outline-success btn-lg text-center m-3"
                            data-toggle="modal" data-target="#exampleModal">
                            Add A Person To BlackList
                </button>
                        <Link to="/dashboard"><button className="btn btn-outline-success btn-lg text-center m-3">
                            Dashboard
                </button></Link>
                    </div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Person CNIC</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row h-100 justify-content-center align-items-center">
                                        <TextField
                                            floatingLabelText="Enter Person CNC"
                                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            type="number"
                                            id='personCNIC'
                                            required={true}
                                        />
                                    </div>
                                    <div className="row h-100 justify-content-center align-items-center">
                                        <TextField
                                            floatingLabelText="Enter Note"
                                            floatingLabelStyle={styles.floatingLabelFocusStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            type="text"
                                            id='personNote'
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-danger btn-lg text-center m-3" id="closeAddModal" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-outline-success btn-lg text-center m-3" onClick={this.handleAddBlackList}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {this.state.dataArray.length == 0 ? <div className="card m-3">
                    <div className="card-body outerEffect">
                        <h4 className="card-title text-center">There Is No Person In BlackLIst</h4>
                    </div>
                </div> : this.state.dataArray.map((Obj, index) => {
                    return <div className="card d-sm-inline-flex text-center col-sm-2 p-2 m-3 " key={index}>
                        <div className="card-header">
                            <h3 className="card-text">{Obj.cnic}</h3>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{Obj.note}</h3>
                        </div>
                        <button type="button" className="btn btn-outline-danger btn-lg text-center" onClick={() => { this.removeCNIC(Obj._id) }} id="removeCNIC">Remove</button>
                    </div>

                })}
            </div>
        )
    }
}

export default BlackList;
