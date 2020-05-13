import React from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import {connect} from 'react-redux';
import PageNotFound from './Page404';


const Results = (props) => {

    const {question, author, pageNotFound} = props;

    if (pageNotFound === true) {
        return <PageNotFound/>;
    }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    const optionSelected = question.optionOne.votes.includes(author.id) ? "optionOne" : "optionTwo";

    let optionOneWidth = Math.round((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoWidth = Math.round((question.optionTwo.votes.length / totalVotes) * 100);

  return (
    <div  style={{border: '2px solid #A9A9A9',margin:'auto',marginTop: '40px', width:'600px' }}>
    <Card body >
        <CardTitle><strong>{author.name} asks:</strong></CardTitle>
    <Row>
      <Col sm="3">
            <Row style={{marginLeft:2, marginTop:25}}>
               <img className="avatar" src={author.avatarURL} height="100" width="100" alt='Sign in' ></img>
            </Row>
          
              
      </Col>
      <Col sm="9" >
         
        <Card body>
         <CardTitle><strong>Results</strong></CardTitle>
            <Row>
                <Card body>
                    <CardTitle>Would you rather</CardTitle>
                    <div>
                    <div className={`card card-poll-results ${(optionSelected === 'optionOne') ? "chosen-answer" : ""}`}>Would you rather {question.optionOne.text}?

                          <div className="progress m-progress--sm">
                              <div className="progress-bar m--bg-success"
                                  style={{ width: optionOneWidth + '%' }}
                                  ></div>
                          </div>
                          <div>
                              <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionOneWidth}%)</span>
                          </div>

                          </div>
                          <div className={`card card-poll-results ${(optionSelected === 'optionTwo') ? "chosen-answer" : ""}`}>Would you rather {question.optionTwo.text}?

                          <div className="progress m-progress--sm">
                              <div className="progress-bar m--bg-success"
                                  style={{ width: optionTwoWidth + '%' }}
                              ></div>
                          </div>
                          <div>
                              <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                          </div>
                          </div>
                        </div>
                </Card>
            </Row>
        </Card>
      </Col>
    </Row>
    </Card>
    </div>
  );
};

function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props;

  let pageNotFound = true;
  let author = "";
  let specificQuestion = "";

  if (questions[id] !== undefined) {
      pageNotFound = false;
      specificQuestion = questions[id];
      author = users[specificQuestion['author']];
  }

  return {
      id,
      question: specificQuestion,
      author: author,
      pageNotFound: pageNotFound
  }
}

export default connect(mapStateToProps)(Results);