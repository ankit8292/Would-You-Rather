import React from 'react';
import {  Button,  Row, Col } from 'reactstrap';
import Question from './Question';
import {connect} from 'react-redux';

class Dashboard extends React.Component{
  state = {
    'questionsVisible': 'unanswered',
    'buttonActive':'unanswered'
  
  };
  
  handleTabChange = (e, tab) => {
    this.setState(() => ({
      questionsVisible: tab,
      buttonActive:tab
    
    }));
  };
  
  render(){
    
  return (
      <div>
    <div className ="container" style={{border: '2px solid #A9A9A9',marginTop: '40px', width:'600px' }}>
    <Row style={{margin:'auto'}}>
      <Col sm="6">
      <Button  className={(this.state.buttonActive === 'answered' ? 'active' : null)} color='primary' style={{width: '100%',marginBottom:'20px',marginTop:'30px'}}
       onClick={(e) => this.handleTabChange(e, 'answered')} >Answered Questions</Button>  
              
      </Col>
     
      <Col sm="6" >
      <Button className = {(this.state.buttonActive === 'unanswered' ? 'active' : null)} color='primary'style={{width: '100%',marginBottom:'20px',marginTop:'30px'}} 
       onClick={(e) => this.handleTabChange(e, 'unanswered')} >Unanswered Questions</Button>
        
      </Col>
    </Row>
    </div>
    <div className ="container" style={{border: '2px solid #A9A9A9', width:'600px' }}>
                {this.props.questionIds.map((id) => {
                  return (
                           <Question key={id} id={id}
                            questionsToShow={this.state.questionsVisible}/>
                              )
                          })}
    </div>
    </div>

  );
}
}

function mapStateToProps({questions}) {
  return {
      questionIds: Object.keys(questions)
          .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard);