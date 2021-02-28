import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function Logout(props) {

    useEffect(()=>{
        props.logoutdone()
    },[])
    
    return(
        <div>
            <Redirect to='/' />
            
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return{
//         userData: this.state.userData
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        logoutdone: () => dispatch({ type: 'LOGOUT'})
    }
}

export  default connect(null,mapDispatchToProps)(Logout)
