import React , {Component} from 'react';
import './App.css';
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage'
import BlogList from './Components/BlogList'
import Login from './Components/Login'
import Register from './Components/Register'
import CreateBlog from './Components/CreateBlog'
import Logout from './Components/Logout'
import Reset from './Components/Reset';

// import ViewBlog from './Components/ViewBlog'
// function App() {
//   return (
//     <div className="App">
//       <Login/>  
//       <Register/>
//       <CreateBlog/>
//       <BlogList/>
//     </div>
//   );
// }

// export default App;

class App extends Component{
  constructor(props) {
      super(props)
  }
  render() {
      return(
            <div>
                
            
              <BrowserRouter>
              
              {/* <h1> Blogging Application </h1> */}
                  {/* <Login/> */}
                  <MainPage/>
                  <Switch>
                      <Route exact path='/' component={Login}/>
                      <Route exact path='/Blogs' component={BlogList}/>
                      <Route exact path='/CreateBlog' component={CreateBlog}/>
                      {/* <Route exact path='/Login' component={Login}/> */}
                      {/* <Route exact path='/ViewBlog' component={ViewBlog}/> */}
                      {/* <Route exact path='/Blogs' component={BlogList}/> */}
                      <Route exact path='/Register' component={Register}/>
                      {/* <Route exact path='/Reset' component={Reset}/> */}
                      <Route exact path='/Logout' component={Logout}/>
                  </Switch>
            
              </BrowserRouter>
              </div>
          
      )
  }

}

export default App;
