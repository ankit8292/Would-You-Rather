import React from 'react';
import { Card, CardText, Row, Col } from 'reactstrap';
import {connect} from 'react-redux';

const LeaderBoard = (props) => {
  const {users} = props;
       

      let usersData = Object.keys(users).map((key,index) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;
        

        return {
            'name': users[key].name,
            'avatar': users[key].avatarURL,
            'questionsAnswered': questionsAnswered,
            'questionsAsked': questionsAsked,
            'totalScore': questionsAnswered + questionsAsked
        }
    });

    usersData.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });


   let rank = 0;
  return (
    <div className ="container" style={{border: '2px solid #A9A9A9',marginTop: '40px', width:'600px' }}>
    {usersData.map((user, index) => {
      return(
    <div key={index} className ="container" style={{border: '2px solid #A9A9A9',marginTop: '20px',marginBottom:'20px', width:'450px' }}>
    <Row>
      <Col sm="3">
            <Row style={{marginLeft:2, marginTop:25}}>
               <img className="avatar" src={user.avatar} height="100" width="100" alt='Sign in' ></img>
            </Row>
            <Row style={{marginLeft:3,marginTop:10}}>
            <Card body >
              <CardText className="center"><strong style={{fontSize:'20px'}}>Rank{++rank}</strong></CardText>
            </Card>
            </Row>
              
      </Col>
      <Col sm="9" >
         
        <Card body>
         <Row>
             <Col sm="8"  >
             <Row style={{marginRight:1}}>
                 <Card body>

                  <CardText className="center"><strong style={{fontSize:'20px'}}>{user.name}</strong></CardText>
                    </Card>
                 </Row>
                 <Row style={{marginRight:1}}>
                 <Card body >

                   <CardText className="center"><strong>Answered Questions:    {user.questionsAnswered}</strong></CardText>
                  
                     </Card>
                 </Row>
                 <Row style={{marginRight:1}}>
                 <Card body >

                    <CardText className="center"><strong>Questions Asked: {user.questionsAsked}</strong></CardText>
                     </Card>
                 </Row>

             </Col>
             <Col sm="4">
                 <Row>
                 <Card body style={{background:'gray'}}>

                     <CardText className="center"><strong>Score</strong></CardText>
                     </Card>
                 </Row>
                 <Row>
                 <Card body style={{background:'skyBlue'}}>
                   <CardText className="center"><strong>{user.totalScore}</strong></CardText> 
                     
                  </Card>

                 </Row>
                

             </Col>
         </Row>
        </Card>
      </Col>
    </Row>
    </div>
      );
    })}
    </div>
  )
 
};

function mapStateToProps({users}) {
  return {
      users
  }
}

export default connect(mapStateToProps)(LeaderBoard);