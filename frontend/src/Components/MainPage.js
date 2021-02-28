// this file does not have any routing process its stationary
import React , {Component}  from 'react'
import {Link} from 'react-router-dom' // adding Link
import {connect} from 'react-redux'

class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            headerToggel: true

        }
    }
    
    // componentDidMount(){
    //     this
    // }

    
    render(){

        return(
            <>
                {/* {this.props.userNameDisplay.map((item,index)=>
                
                <div key={index} className='head'> */}
                <div className='head'>
                    <h1> Blogging Application</h1>
                    {/* <p> Welcome {this.props.userNameDisplay.token == null && 
                    this.props.userNameDisplay.map((item) => 
                    <span key={item.id} > {item.username} </span>)
                    } !! </p> */}
                    <p> Welcome {this.props.userNameDisplay
                    } !! </p>
                    {!this.props.userTokenDisplay &&
                    <Link className='createSpace' to ='/'>Login</Link>}
                    <Link className='createSpace' to ='/Blogs'>Blogs</Link>
                    {/* <Link className='createSpace' to ='/CreateBlog'>Create Blog</Link> */}
                    
                    {this.props.userTokenDisplay && <Link  className='createSpace' 
                    data-bs-toggle="modal" data-bs-target="#editModal" data-bs-dismiss="modal" 
                    >Create Blog</Link>}
                    {this.props.userTokenDisplay && 
                    <Link className='createSpace' to ='/Logout'>Logout</Link>}


                </div>

                {/* )}             */}
            </>
        )
    }
}
// MainPage.defaultProps = {
//     userAuth: ''
// }
// MainPage.propTypes = {
//     userAuth: PropTypes.string
// }
const mapStateToProps = (state) => {
    return {
        userTokenDisplay: state.token != null? true:false,        
        userNameDisplay: state.username,
    }
}


export default connect(mapStateToProps)(MainPage)
