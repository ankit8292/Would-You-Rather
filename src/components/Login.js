import React from 'react';
import { Button, Form, FormGroup,  Input,Label } from 'reactstrap';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleGetUsers,handleLoginUser} from '../actions/shared';
import LoadingBar from "react-redux-loading";

class Login extends React.Component{

  state={
    userSelected:''
  };

  componentDidMount() {
    this.props.dispatch(handleGetUsers());
    }

    handleChange = (e) => {
      const userSelected = e.target.value;

      this.setState(() => ({
          userSelected
      }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(handleLoginUser(this.state.userSelected));
};



    render(){
      if (this.props.loading === true || !this.props.users) {
        return <div/>;
       }

       const {from} = this.props.location.state || {from: {pathname: '/'}};

      if (this.props.isAuthed) {
        return <Redirect to={from}/>;
      }
        return(
          <div>
             <LoadingBar />
         
    <div className ="container" style={{border: '2px solid #A9A9A9',marginTop: '40px', width:'600px' ,marginBottom:'100px'}}>
     <Form onSubmit={this.handleSubmit}>
     <FormGroup tag="fieldset" >
        <legend className="center" style={{fontStyle:'italic',fontSize:'30px'}}>Welcome to Would You Rather App! </legend>
        </FormGroup>
        <FormGroup tag="fieldset" >
        <p  className = "center" style={{fontStyle:'bold' ,fontSize:'15px'}}>Please sign in to continue..</p>
        </FormGroup>
        <FormGroup tag="fieldset" >
            <div className="center" > <img  src='user.png' height="150" width="150" alt='Sign in'></img></div>
        
        </FormGroup>
        <FormGroup tag="fieldset" >
        <legend className="center" style={{fontStyle:'bold',fontSize:'25px',color:'rgb(164, 42, 245)'}}>Sign in </legend>
        </FormGroup>
        <FormGroup>
        <Label for="selectUser">Select User</Label>
        <Input type="select" name="select" id="selectUser"  onChange={(e) => this.handleChange(e)} >
          <option>select user</option>
          {
                                            Object.keys(this.props.users).map((user) => {
                                                return <option key={this.props.users[user].id}
                                                               value={this.props.users[user].id}>{this.props.users[user].name}</option>
                                            })
            }
        
        </Input>
       
      </FormGroup>
     
     
      <Button type = "submit" style={{display: 'block',width: '100%',border: 'none', backgroundColor: '#4CAF50', padding: '14px 28px',fontSize: '16px', cursor: 'pointer', textAlign: 'center',marginBottom:'20px'}} disabled={this.state.userSelected === 'select user'}>Sign in</Button>
    </Form>
    </div>
    </div>

        )
    }

}
function mapStateToProps({users,auth}) {
  return {
      loading: users === null,
      users,
      isAuthed: auth.authenticated
  }
}
export default connect(mapStateToProps)(Login);