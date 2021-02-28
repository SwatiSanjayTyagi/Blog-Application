import React , {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom' // adding Link
import {connect} from 'react-redux'

class Login extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            userLogin:[],
            errorMessage: '',
            tokenDetails: []
            
        }
    }

    
    handleSubmit = (e)=>{
        e.preventDefault()
        const userCredentialsLogin = {
            username : e.currentTarget['username'].value,
            password : e.currentTarget['password'].value
        }

        axios.post('http://127.0.0.1:8000/api-auth/',userCredentialsLogin)
        .then(response=>{
            console.log("token data",response.data);
            this.setState({tokenDetails: response.data})
            this.props.verify(response.data)
            this.props.history.push('/Blogs')
        })
        .catch((error)=> {
            console.log(error.data,'inside error')
            this.setState({errorMessage: 'User credentials do not match. Please register.'})
        })   
    }
    
    render(){
        return(

          <>
          
            
            <div id="login-container" className="row justify-content-center">
                <div className="col-xl-6 col-lg-7 col-md-9">
                    <div className="card shadow-lg bg-link p-3 mb-5">
                        <div className="card-body p-4 p-md-5 mx-3 rounded">
                            <h1>Login</h1><br /><br /><br />
                            <form className="row g-6" onSubmit={this.handleSubmit}>
                                <div className="col-md-6">
                                    <label for="validationDefault01" className="form-label">Username</label>
                                    <input type="text" name="username" placeholder="Type Your Username" className="form-control" id="validationDefault01" />
                                </div>
                                <div className="col-md-6">
                                    <label for="validationDefault02" className="form-label">Password</label>
                                    <input type="password" name="password" placeholder="Type Your Password" className="form-control" id="validationDefault02" />
                                </div>
                                <div className="col-12 mt-2 " >
                                    <button className="btn btn-primary mt-3" type="submit">Login</button>
                                </div>
                                <div className="col-12 mt-2 " >
                                    <p> {this.state.errorMessage} </p>
                                </div>
                                <br></br>
                                <Link to="/Blogs">Continue as Guest</Link>
                                <br></br>
                                <Link to="/Register">Register</Link>
                                {/* <Link to="/Reset">Reset Password</Link> */}
                            </form>
                            {/* <input className="btn btn-primary mt-3" type="button" 
                                    onClick={this.props.history.push('/blogs')} 
                                    >Continue as guest</input>
                            <input className="btn btn-primary mt-3" type="button"
                                    onClick={this.props.history.push('/Register')}
                                    >Register</input> */}
                        </div>
                    </div>
                </div>
                
                
        </div>
        </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
        userData: state.userData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verify: (val) => dispatch({ type: 'LOGIN', payload: val })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
