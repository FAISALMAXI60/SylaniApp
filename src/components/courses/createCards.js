import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { sectionHandler } from "../../store/actions";
import axios from "axios";
import LoadingScreen from "../loadingScreen";
import "react-toastify/dist/ReactToastify.css";
import './customStyles/createCards.css';
import SaylaniImg from './customStyles/images/Saylani-logo.png';
import studentImg from './customStyles/images/student.png';
import { QRCode } from 'react-qr-svg';

var className, batchName, courseName, sectionName;
class Students extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArray: [],
      loading: true,
      visible:false,
      studentId:'',
      printArray:[],
      check : 0
    };
  }
  componentDidMount() {
    let sectionObj = this.props.location.name
      ? JSON.parse(this.props.location.name)
      : this.props.sectionObj;
    className = this.props.classObj.name;
    batchName = this.props.batchObj.name;
    courseName = this.props.courseObj.name;
    this.props.sectionHandler(sectionObj);
    let sectionId = sectionObj._id;
    sectionName = sectionObj.name;
    var self = this;
    axios
      .post(`/course/batch/class/section/student`, {
        sectionId
      })
      .then(function(response) {
        self.setState(() => ({
          dataArray: response.data,
          loading: false,
          printArray:response.data.slice(0,8)
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  nextFun(){
    if(this.state.dataArray.length-8 > this.state.check){
        this.setState({
            check : this.state.check+8,
            printArray: this.state.dataArray.slice(this.state.check+8,this.state.check+16)
        });
    }
  }

  previousFun(){
    if(this.state.check > 7){
        this.setState({
            check:this.state.check-8,
            printArray: this.state.dataArray.slice(this.state.check-8,this.state.check)
        })
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="container-fluid">
        <Header
          entity="Students"
          addEntity="Student"
          home={`/${courseName}/${batchName}/${className}/${sectionName}/student`}
          add={`/${courseName}/${batchName}/${className}/${sectionName}/student/add`}
          active={`/${courseName}/${batchName}/${className}/${sectionName}/student/active`}
          deactive={`/${courseName}/${batchName}/${className}/${sectionName}/student/eliminated`}
          completed={`/${courseName}/${batchName}/${className}/${sectionName}/student/completed`}
          back={`/${courseName}/${batchName}/${className}/section`}
        />


        <div className="btnsForNextPreviousPrint">
            <button className="btn btn-default hidden-print" type="submit" onClick={this.previousFun.bind(this)}>&laquo; Previous</button>
            <button className="btn btn-primary hidden-print" onClick={()=>{window.print();}}><span className="glyphicon glyphicon-print" aria-hidden="true"></span> Print</button>
            <button className="btn btn-success hidden-print" type="submit" onClick={this.nextFun.bind(this)}>Next &raquo;</button>
        </div>

        {this.state.printArray.map((Obj, index) => {
                return (
                    <div className="admitCard" key={index}>
                <div className="admitCardHeader">
                    <div className="saylaniImage">
                        <img width = '260px' height= '60px' src={SaylaniImg} alt="saylani-img"/>
                    </div>
                    <div className="headerText">
                        <b>SAYLANI MASS TRAINING & JOB CREATION PROGRAM</b>
                    </div>
                </div>

                <div className="admitCardContent">
                    <div className="textDataDiv">
                    <div className="textDataHeader">
                        ADMIT CARD
                    </div>
                    <div className="textFieldsMainDiv">
                        <div className="fields">
                            <div className="fields-inner-heading">
                                Roll No:
                            </div>
                            <div className="fields-inner-heading">
                                Name:
                            </div>
                            <div className="fields-inner-heading">
                                Course:
                            </div>
                            <div className="fields-inner-heading">
                                Batch:
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fields-inner-value">
                            {Obj.rollNo}
                            </div>
                            <div className="fields-inner-value">
                            {Obj.name}
                            </div>
                            <div className="fields-inner-value">
                            {courseName}
                            </div>
                            <div className="fields-inner-value">
                            {batchName}
                            </div>
                        </div>
                    </div>
                    <div className="authorizedSignDiv">
                        <div className="fields">
                        Authorized Sign:
                        </div>
                        <div className="authorizedSignValue">

                        </div>
                        
                    </div>
                    </div>
                    <div className="imageAndQrDiv">
                        <div className="studentImageDiv">
                            <img width="192px" height="215px" src={studentImg} alt="student-img"/>
                        </div>
                        <div className="qrDiv">
                        <QRCode
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            level="Q"
                            style={{ width: `100%`,height:`100%` }}
                            value={`${Obj.rollNo}`}
                        />
                        </div>
                    </div>
                </div>
            </div>
            
            )
            })
        }
          



      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    courseObj: state.course,
    batchObj: state.batch,
    classObj: state.class,
    sectionObj: state.section
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sectionHandler: sectionObj => dispatch(sectionHandler(sectionObj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
