import React , { Component } from 'react'
import secureAxios from '../Components/secureAxios'

class BlogListing extends Component {
    constructor(props) {
        super(props)
        this.state={
            baseArray:[]
        }
    }

    componentDidMount() {
    
        // // secureAxios.get('/users').then (Response => {
          secureAxios.get(`/blog_details`).then (Response => {
        
            console.log(Response.data)
            this.setState({baseArray: [...Response.data ]})
            
            
        })
        // .catch (error => {
        //     console.log('some error', error )
        // })
    }
    
    handleSubmit = () => {
        secureAxios.post ('/posts' , { name : this.state.title }).then(Response =>{
            console.log(Response.data)
            this.setState({baseArray: [ ...this.state.baseArray,
                {Title : Response.data.Title , 
                 content : Response.data.content
                 }
                ] , Title: '' } )
        })
        
    }
    
    render () {
        const{Title} = this.state
        return(
            <div>
                {/* <strong>Hello User</strong>
                <br />
                <br/>
                <input type= 'text' value = {studName} placeholder='Name' 
                onChange={(event)=>{this.setState({studName: event.target.value})}}/>
                
                <input type= 'button' value = 'Add' onClick = { () => { this.handleSubmit()} }/> */}

                <div>
                {this.state.baseArray.map((item, index) => (
                    <h3 key={item.index}><strong>{item.title} </strong></h3>
                        ))}
                    
                </div>
                    
            </div>
        )
    }
}

export default BlogListing