import React,{Component} from 'react';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route ,withRouter,Switch} from 'react-router-dom';
import NewQuestion from './NewQuestion';
import Login from './Login';
import LeaderBoard from './LeaderBoard';
import Dashboard from './Dashboard';
import QuestionPoll from './QuestionPoll';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Logout from './Logout';
import SecuredRoute from './SecuredRoute';
import PageNotFound from './Page404';



class  App extends Component{
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render(){
    
   
  return (
    <div className="App">
       <Router>
       
          <LoadingBar />
       <div>
          
            {this.props.authenticated == null
                        ? <Navigation loggedInUser = {null}/>
                        : <Navigation loggedInUser={this.props.loggedInUser}/>
                    }
            <div>
            {this.props.loading === true
              ? null
              :  <div>
                <Switch>
                
                  
                  <SecuredRoute path='/add' exact component={NewQuestion}  isAuthenticated={this.props.authenticated} />
                  <SecuredRoute path='/' exact component={Dashboard}  isAuthenticated={this.props.authenticated} />
                  <SecuredRoute path='/question/:id' exact component={connect(mapStateToProps)(QuestionPoll)} isAuthenticated={this.props.authenticated}/>
                  <Route path="/login" exact component={withRouter(Login)}/>
                  <Route path="/logout" exact component={withRouter(Logout)}/>
                  <SecuredRoute path='/leaderboard' component={LeaderBoard} isAuthenticated={this.props.authenticated} />
                    <Route component={PageNotFound} />
               
                  </Switch>
                  </div>

            }
                </div>
          </div>
          
       </Router>
     
     
    </div>
  );
  }
}
function mapStateToProps({users, auth}) {
  return {
      loading: false,
      loggedInUser: auth.loggedInUser,
      authenticated: auth.authenticated,
      
}
}


export default connect(mapStateToProps)(App);
