import React , {Component} from 'react'
import axios from 'axios'

class CreateBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            image: null,
            try: 'try'
        }
    }
        UploadImage=(e)=>{
        e.preventDefault()
        this.setState({image:e.target.files[0]})
    }


    submitHandler = (e) => {
            e.preventDefault()
                
            let data = new FormData();
            // data.append('user', `http://127.0.0.1:8000/users/${token_id}/`)
            data.append('title', e.currentTarget['title'].value)
            data.append('content',e.currentTarget['content'].value )
            data.append('date', new Date().toLocaleString())
            data.append('image', this.state.image)
            data.append('flag', 1) // flag 1 isfor create
            data.append('username', 1) // need to pass this dynamically
            

            axios.post('http://127.0.0.1:8000/blog_details/', data)
                .then(res => {
                    console.log(res.data);

                    e.target.reset();
                    console.log(this.state.try)
                    // this.setState({title:'' , content:'', image: null})
                    
                })
        }
        
    render(){
        return(
            
            <form className="row g-3" onSubmit={this.submitHandler}> 
                <div className="col-auto">
                    <input type="text" 
                    className="form-control"
                    placeholder="Title" 
                    name="title"   /><br></br>
                    <textarea name="content" 
                    className="form-control"
                    placeholder="Content" 
                    rows="4" cols="50"/><br></br>
                    <input type="file"  onChange={this.UploadImage} />
                    <input type="button" className="btn btn-primary mb-3" 
                    value="Preview"/>
                    <button type="submit" className="btn btn-primary mb-3" 
                    >Submit</button>
                    <button type="reset" className="btn btn-primary mb-3" 
                    >Reset</button>
                </div>
                
            </form>

        )
    }
}

export default CreateBlog