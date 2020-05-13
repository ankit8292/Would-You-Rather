import React from 'react';
import { Card, Button, CardTitle, Row, Col, CardSubtitle } from 'reactstrap';
import {formatQuestion} from "../utills/helpers";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Question = (props) => {
  const {question} = props;


    if (question === null) {
        return <p>This question doesn't exist.</p>
    }

    const {name, id, avatar, optionOne, optionTwo, hasVoted} = question;

    if (props.questionsToShow === 'answered' && hasVoted !== true) {
        return false;
    } else if (props.questionsToShow === 'unanswered' && hasVoted === true) {
        return false;
    }

    let viewPollLink = '';

    if (props.questionsToShow === 'answered') {
        
        viewPollLink = `/question/${id}`;
    } else if (props.questionsToShow === 'unanswered') {
        viewPollLink = `/question/${id}`;
    }

  return (
    <div  style={{border: '2px solid #A9A9A9',margin:'auto',marginTop: '40px', width:'450px' }}>
    <Card body >
        <CardTitle><strong>{name} asks:</strong></CardTitle>
    <Row>
      <Col sm="3">
            <Row style={{marginLeft:2, marginTop:25}}>
               <img className="avatar" src={avatar} height="100" width="100" alt='Sign in' ></img>
            </Row>
          
              
      </Col>
      <Col sm="9" >
         
        <Card body>
         <CardTitle><strong>Would You Rather</strong></CardTitle>
           <CardSubtitle>{optionOne.text} <strong>OR</strong> {optionTwo.text}</CardSubtitle>
           <Link to={viewPollLink} className='center'>
         <Button style={{display: 'block',width: '100%',border: 'none', backgroundColor: '#4CAF50', padding: '14px 28px',fontSize: '16px', cursor: 'pointer', textAlign: 'center',marginBottom:'20px',marginTop:'30px'}}>View Poll</Button>
          </Link>
        </Card>
      </Col>
    </Row>
    </Card>
    </div>
  );
};

function mapStateToProps({auth, users, questions}, {id, questionsToShow}) {
  const question = questions[id];

  return {
      authedUser: auth.loggedInUser.id,
      question: formatQuestion(question, users[question.author], auth.loggedInUser.id),
      questionsToShow
  }
}

export default connect(mapStateToProps)(Question);