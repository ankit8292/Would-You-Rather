import { NavLink} from 'react-router-dom';
import {Navbar,Nav,NavbarToggler,NavbarBrand,Collapse,NavItem} from 'reactstrap';

import React from 'react';



  

  export default class Navigation extends React.Component{
    constructor(props){
      super(props);
      this.toggleNav = this.toggleNav.bind(this);
      this.state = {
        isNavOpen: false,
       
      };
    }
    toggleNav() {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    }
    render(){
      const loggedInUser = this.props;
    return (
      <React.Fragment>
            <Navbar dark expand="md" >
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand style = {{color : 'pink',fontStyle:'italic'}}className="mr-auto">Would You Rather</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink  className="nav-link" style={{color: 'white', textDecoration: 'bold'}} activeStyle={{color: 'purple', textDecoration: 'none'}} exact to='/'> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  style={{color: 'white', textDecoration: 'bold'}} activeStyle={{color: 'purple', textDecoration: 'none'}} exact to='/add'> New Question</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  style={{color: 'white', textDecoration: 'bold'}} activeStyle={{color: 'purple', textDecoration: 'none'}} exact to='/leaderboard'>Leaderboard</NavLink>
                            </NavItem>
                          
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                     <span className = "nav-link" style={{color: 'black', textDecoration: 'none'}}> {(loggedInUser.loggedInUser===null)?null
                                                                                                                        :`Hello ${loggedInUser.loggedInUser.name}`}</span>
                                </NavItem>
                                <NavItem>
                                  {loggedInUser.loggedInUser ===null? null
                                  :<img src={loggedInUser.loggedInUser.avatarURL} alt={`Avatar of `} className='navatar' />}
                                </NavItem>
                                <NavItem>
                                  {loggedInUser.loggedInUser===null?null
                                   :<NavLink className="nav-link" style={{color: 'white', textDecoration: 'bold'}} activeStyle={{color: 'purple', textDecoration: 'none'}} exact to='/logout'>Logout</NavLink>
                                  }
                                  </NavItem>
                            </Nav>
                        </Collapse>
                      
                    </div>
                </Navbar>
           
            </React.Fragment>
      
    )
  } 
}
