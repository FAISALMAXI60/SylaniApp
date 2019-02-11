import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Login extends React.Component {
    componentDidMount(){
        if(document.getElementById('loadingAnimationWeb')){
            document.getElementById('loadingAnimationWeb').remove()
        };
    }
    loginHandler = () => {
        let code = document.getElementById('code').value;
        if (code == '1@a2@b') {
            this.success();
            let self = this;
            setTimeout(() => {
                return self.props.login();
            }, 2000)
        } else {
            return this.error()
        }

    }
    success = () => {
        toast.success("Login Successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    error = () => {
        toast.error("Code Incorrect!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });

    }
    render() {
        return (
            <div>
                <div>
                    <ToastContainer />
                </div>
                <div className="form-group row h-100 justify-content-center align-items-center mt-5">
                    <label htmlFor="code">Enter Code</label>
                    <input type="password" className="form-control m-3" required id="code" aria-describedby="helperText" placeholder="Enter Code" />
                    <small id="helperText" className="form-text text-muted">Enter Code Or Contact Office To Get Code.</small>
                </div>
                <div className='row h-100 justify-content-center align-items-center'>
                    <button type="submit" className="btn btn-outline-success btn-lg text-center mb-5" onClick={this.loginHandler}>Login</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(login()),
    }
}

export default connect(undefined, mapDispatchToProps)(Login);