import React , {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

class BlogList extends Component{
    constructor(props) {
    super(props)

    this.state = {
        blog:[],  viewSingleBlog:[],  bTitle: '',
        bContent: '', bImage: null,  bUser: 0,
        bDate: '',  title: '', content: '', uContent:'',
        image: null , myToggel: 'create' , msg: ''
    }
}
UploadImage=(e)=>{
    e.preventDefault()
    this.setState({image:e.target.files[0]})
}
submitHandler = (e) => {
        e.preventDefault()
        {console.log('inside submit')}
        let data = new FormData();
        // data.append('user', `http://127.0.0.1:8000/users/${token_id}/`)
        data.append('title', e.currentTarget['title'].value)
        data.append('content',e.currentTarget['content'].value )
        data.append('date', new Date().toLocaleString())
        data.append('image', this.state.image)
        data.append('flag', 1) // flag 1 is for create - logic not implemented due to time constraints
        data.append('username', this.props.userIdDisplay) 

        axios.post('http://127.0.0.1:8000/blog_details/', data)
            .then(res => {
                console.log(res.data);
                e.target.reset();
                this.setState({msg: 'Data Added!!' })
                this.getData()
            })
            // .catch(error => {console.log(error)})
            // this.setState({msg: 'Failed to create Blog'})
            .catch(error => {
                this.setState({ msg: 'Failed to create Blog' });
                console.error('There was an error!', error);
            });
    }

    componentDidMount(){
       this.getData()
    }
    getData=()=> {
        axios.get(`http://127.0.0.1:8000/blog_details/`).then(res =>{
        console.log(res);
        this.setState({blog: res.data});
    });
    }
    handleSetState = (index) => {
        {console.log(index , 'index check')}
        this.setState({
            bTitle: this.state.blog[index].title,
            bContent: this.state.blog[index].content,
            bImage: this.state.blog[index].image,
            bUser: this.state.blog[index].username,
            bDate: this.state.blog[index].date
        })
    }
    handleView = (index) => {
        this.handleSetState(index)
    }
    handleEdit = (t,c,i,d,u) => {
        this.setState({
            bTitle: t,
            bContent: c,
            bImage: i,
            bUser: u,
            bDate: d,
            uContent: 'Only content can be updated',
            myToggel: 'update'
        })
    }
    handlePut = (e) => {
        
        console.log('inside put',this.state.bTitle,this.state.bContent)
        let data = new FormData();
            data.append('title', this.state.bTitle) 
            data.append('content', this.state.bContent)
            data.append('flag', 1) // flag - logic not implemented due to time constraints
            data.append('username', this.state.bUser) 

        axios.put(`http://127.0.0.1:8000/blog_details/${this.state.bTitle}/`, data)
                .then(res => {
                console.log(res.data);
                this.getData()
                this.setState({title:'' , content:''})
                this.setState({ msg: 'Blog updated successfully!!' });
            })
            .catch(error => {
                this.setState({ msg: 'Failed to update' });
                console.error('There was an error!', error);
            });
    }
    
    handleDelete = (dTitle) => {
        axios.delete(`http://127.0.0.1:8000/blog_details/${dTitle}/`)
                .then(res => {
                console.log(res.data);
                this.getData()
                this.setState({ msg: 'Blog deleted successfully!!' });               
            })
            .catch(error => {
                this.setState({ msg: 'Failed to delete' });
                console.error('There was an error!', error);
            });
    }


    render(){
        const {userAuth} = this.props
        console.log('inside render',this.props)

            return(
                
            <>
            
            <div className="container">
                <div className="row ">
                {this.state.blog.map((item,index) =>
                    <div key={index} className=" col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card mb-3">
                        <img className="card-img" height={200} width={60} src={item.image} alt="image"/>
                        <div className="card-body">
                        <h4 className="card-title">{item.title}</h4>
                        <p className="card-text">{`${item.content.slice(0,15)}.....`}</p>
                            
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div className="views">{`${item.date.slice(0,10)} ...@ ${item.date.slice(11,19)} `}
                        <div>
                        <input type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-primary mb-3" 
                        value="View" onClick= {()=>{this.handleView(index)}}/>
                        {item.username == this.props.userIdDisplay &&
                        <input type="button" 
                        data-bs-toggle="modal" data-bs-target="#editModal" 
                        className="btn btn-primary mb-3" 
                        value="Edit" 
                        onClick= {()=>{this.handleEdit(item.title,item.content,item.image,item.date,item.username)}}
                        />}
                        {item.username == this.props.userIdDisplay &&
                        <input type="button" className="btn btn-primary mb-3" 
                        value="Delete" onClick= {()=>{this.handleDelete(item.title)}}/>}
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">BLOGs </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

               
                <div className="modal-body">
                    <div className="col-12">
                    <div className="card ">
                        <img  className="card-img" src={this.state.bImage} alt="image"/>
                        <div className="card-body">
                        <h4  className="card-title">{this.state.bTitle}</h4>
                        <small className="text-muted cat">
                            {/* <i className="far fa-clock text-info"></i> 30 minutes
                            <i className="fas fa-users text-info"></i> 4 portions */}
                        </small>
                        <p className="card-text"><small  className="text-muted">{this.state.bContent}</small></p>
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div  className="views">
                        </div>
                        <div className="stats">
                            {/* <i className="far fa-eye"></i> {this.state.bUser} */}
                            <i className="far fa-eye"></i> {this.props.userNameDisplay}
                            <i className="far fa-comment"></i> {`${this.state.bDate.slice(0,10)}  ...@ ${this.state.bDate.slice(11,19)}`}
                        </div>
                            
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                    onClick={(e)=>{this.setState({bTitle:'',bContent:'',bImage:null,myToggel:'create',msg:''})}}
                    >Close</button>
                </div>
                </div>
            </div>
            </div>      

            
            <div className="modal fade  " id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">BLOGs </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

               
                <div className="modal-body">

                    <form className="row g-3" 
                    onSubmit={this.state.myToggel == 'create'? 
                    this.submitHandler : this.handlePut}> 
                    {console.log(this.state.myToggel)}
                        <div className="col-auto">
                            <p>{this.state.uContent}</p>
                            {this.state.myToggel == 'create'? 
                            <input type="text" 
                            className="form-control"
                            placeholder="Title" 
                            onChange={(e)=>{this.setState({bTitle: e.target.value})}}
                            name="title" value={this.state.bTitle}  
                            /> :
                            <input type="text" 
                            className="form-control"
                            placeholder="Title" 
                            onChange={(e)=>{this.setState({bTitle: e.target.value})}}
                            name="title" value={this.state.bTitle}  
                            disabled/>
                            } 
                            <br></br>
                            <textarea name="content" 
                            onChange={(e)=>{this.setState({bContent: e.target.value})}}
                            className="form-control"
                            placeholder="Content" value={this.state.bContent}
                            rows="4" cols="50"/><br></br>
                            {this.state.myToggel == 'create'? 
                            <input type="file"  onChange={this.UploadImage} />
                            :
                            <input type="file"  onChange={this.UploadImage} disabled/>
                            }
                            <br></br>
                            <br></br>
                            {this.state.myToggel == 'create'?
                            
                            <button type="submit" 
                            className="btn btn-primary mb-3" 
                            >Create</button>
                            :
                            <input type="submit" 
                            className="btn btn-primary mb-3" 
                            onClick={this.handlePut} value='Update'/> }
                            {/* ></input>} */}
                            {/* <button ></button> */}
                            <p>{this.state.msg}</p>
                            <button type="button" className="btn" 
                            data-bs-dismiss="modal" //aria-label="Close"
                            onClick={()=>{this.setState({bTitle:'',bContent:'',msg:'',myToggel: 'create',uContent:''})}}></button>
                            
                        </div>
                    
                    </form>                    
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                    onClick={()=>{this.setState({bTitle:'',bContent:'',msg:'',myToggel: 'create',uContent:''})}}
                    data-bs-dismiss="modal">Close</button>
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
        
        userNameDisplay: state.username,
        userIdDisplay: state.userid,
        
    }
}

export default connect(mapStateToProps)(BlogList)
