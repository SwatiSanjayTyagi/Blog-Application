import React , {Component} from 'react';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password:'',
            errorMessage:'',
            msg: ''
        }
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        this.setState({errorMessage: ''})
        const userCredentialsRegister = {
            first_name: e.currentTarget['first_name'].value,
            last_name: e.currentTarget['last_name'].value,
            email: e.currentTarget['email'].value,
            username: e.currentTarget['username'].value,
            password: e.currentTarget['password'].value
        }
        
        this.setState({errorMessage: ''})
        axios.post('http://127.0.0.1:8000/users/', userCredentialsRegister )
        .then(res =>{
            console.log(res);
            this.setState({errorMessage: 'Data added successfully!! '})
            this.setState({msg: 'Please login to continue'})
        })
        .catch(error => {
            this.setState({ errorMessage: 'User already exists!!' });
            this.setState({msg: 'Please retry ...'})
            console.error('There was an error!', error);
        });
        // .catch(error => {console.log(error)}
        // this.setState({errorMessage: 'User already exists!!'}))
    }
    render(){
        return(
            //justify-content-center
            
            <div id="register-container" className="row  mb-4"> 
                <h1> Register - New User </h1>
                <form onSubmit={this.submitHandler}> 
                    <div class="input-group md-3">
                        <input type="text" class="form-control" placeholder="First Name" 
                        name="first_name"  /><br></br>
                    </div>
                    <div class="input-group md-3">
                        <input type="text" class="form-control" placeholder="Last Name" 
                        name="last_name"  ></input><br></br>
                    </div>
                    <div class="input-group md-3">
                        <input type="email" class="form-control" placeholder="Email address" 
                        name="email"  required></input><br></br>
                    </div>
                    <div class="input-group md-3">
                        <input type="text" class="form-control" placeholder="Create UserId" 
                        name="username" required></input><br></br>
                    </div>
                    <div class="input-group md-3">
                        <input type="password" class="form-control" placeholder="Password" 
                        name="password" ></input><br></br>
                    </div>
                        <button type="submit" className="btn btn-primary mb-3" >Submit</button>
                        <button type="reset" className="btn btn-primary mb-3"  onClick = {(e)=>{this.setState({errorMessage: '', msg: ''})}} >Reset</button>
                        <p>{this.state.errorMessage}</p>
                        <p>{this.state.msg}</p>
                </form>
            </div>
        )
    }
}

export default Register