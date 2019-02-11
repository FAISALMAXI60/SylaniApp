import React from 'react';
// import { Link } from 'react-router-dom';


class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            dataArray: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ dataArray: nextProps.dataArray }))
    }
    render() {
        return (
            <div className="container-fluid p-3 m-3">
                {this.state.dataArray.length === 0 ? <div className="card m-3">
                    <div className="card-body p-3">
                        <h4 className="card-title text-center">There Is No {this.props.entity}</h4>
                    </div>
                </div> : this.state.dataArray.map((Obj, index) => {
                    return <div className="d-inline-flex p-2 col-sm-4" key={index}>
                        <div className="card border-success mb-3 p-3">
                            <div className="card-header bg-transparent border-success">{this.props.entity} No {index+1}</div>
                            <div className="card-body text-success">
                                <h5 className="card-title">{Obj.name}</h5>
                            </div>
                        </div>
                    </div>

                })}
            </div>
        )
    }
}




export default Body;
