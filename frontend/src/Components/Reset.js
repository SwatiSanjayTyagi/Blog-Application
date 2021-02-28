import React , {Component} from 'react'
import axios from 'axios'
 
class Reset extends Component {
    constructor(props){
        super(props)
        this.state={
            username: '',
            password:'',
            errorMessage:'',
            msg: ''
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.setState({errorMessage: ''})
        const userCredentialsReset = {
            username: e.currentTarget['username'].value,
            password: e.currentTarget['password'].value
        }
        
        this.setState({errorMessage: ''})
        axios.put('http://127.0.0.1:8000/users/', userCredentialsReset )
        .then(res =>{
            console.log(res);
            this.setState({errorMessage: 'Data updated successfully!! '})
            this.setState({msg: 'Please login to continue'})
        })
        .catch(error => {
            this.setState({ errorMessage: 'User does not exist!!' });
            this.setState({msg: 'Please register ...'})
            console.error('There was an error!', error);
        });
    }
    render() {
        return(
            <>
                <div id="register-container" className="row  mb-4"> 
                    <h1> Reset Password </h1>
                    <form onSubmit={this.submitHandler}> 
                        <div class="input-group md-3">
                            <input type="text" class="form-control" placeholder="User Name" 
                            name="username"  /><br></br>
                        </div>
                        <div class="input-group md-3">
                            <input type="password" class="form-control" placeholder="Password" 
                            name="password" ></input><br></br>
                        </div>
                        {/* <div class="input-group md-3">
                            <input type="password" class="form-control" placeholder="Re-enter Password" 
                            name="password2" onChange={(e) => {e.target.value}}></input><br></br>
                        </div>
                        {this.state.password != this.state.password2 &&
                            <p>Passwords do not match</p>
                            this.setState({password:''})
                        } */}
                            <button type="submit" className="btn btn-primary mb-3" >Submit</button>
                            <button type="reset" className="btn btn-primary mb-3"  onClick = {(e)=>{this.setState({errorMessage: '', msg: ''})}} >Reset</button>
                            <p>{this.state.errorMessage}</p>
                            <p>{this.state.msg}</p>
                    </form>
                </div>
            
            </>
        )
    }
}
export default Reset