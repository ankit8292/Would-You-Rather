import React from 'react';
import { Button, Form, FormGroup,  Input } from 'reactstrap';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/shared'
import {Redirect} from 'react-router-dom';

class NewQuestion extends React.Component{


        state = {
          optionOneText: '',
          optionTwoText: '',
          toDashboard: false,
          hasSubmitted: false
      };

      handleOptionOneTextChange = (e) => {
          const text = e.target.value;

          this.setState({
              optionOneText: text
          });
      };

      handleOptionTwoTextChange = (e) => {
          const text = e.target.value;

          this.setState({
              optionTwoText: text
          });
      };

      handleSubmit = (e) => {
          e.preventDefault();

          const {optionOneText, optionTwoText} = this.state;
          const {dispatch} = this.props;

          this.setState({
              hasSubmitted: true
          });

          dispatch(handleAddQuestion(optionOneText, optionTwoText, () => {
              this.setState({
                  optionOneText: '',
                  optionTwoText: '',
                  toDashboard: true
              });
          }));
      };


    render(){

          const {
            optionOneText,
            optionTwoText,
            toDashboard,
            hasSubmitted
        } = this.state;

        if (toDashboard === true) {
            return <Redirect to='/'/>;
        }
        return(
            <div className ="container" style={{border: '2px solid #A9A9A9',marginTop: '40px', width:'600px' }}>
     <Form onSubmit={this.handleSubmit}>
     <FormGroup tag="fieldset" >
        <legend className="center" style={{fontStyle:'italic',fontSize:'30px'}}>Create New Question</legend>
        </FormGroup>
        <FormGroup tag="fieldset" >
        <p  style={{fontStyle:'bold' ,fontSize:'15px'}}>Complete the Question:</p>
        </FormGroup>
        <FormGroup tag="fieldset" >
        <strong  style={{fontStyle:'bold' ,fontSize:'25px'}}>Would you Rather..</strong>
        </FormGroup>
      <FormGroup>
        <Input type="text" name="option1" id="option1" placeholder="Enter Option 1 Text Here" value={optionOneText} onChange={this.handleOptionOneTextChange} />
      </FormGroup>
      <FormGroup tag="fieldset" >
        <legend className="center" style={{fontStyle:'italic',fontSize:'30px'}}>OR</legend>
        </FormGroup>
      <FormGroup>
        <Input type="text" name="option2" id="option2" placeholder="Enter Option 2 Text Here" value={optionTwoText} onChange={this.handleOptionTwoTextChange} />
      </FormGroup>
     
      <Button type = "submit" style={{display: 'block',width: '100%',border: 'none', backgroundColor: '#4CAF50', padding: '14px 28px',fontSize: '16px', cursor: 'pointer', textAlign: 'center',marginBottom:'20px'}} disabled={
                                                                   optionOneText === '' ||
                                                                   optionTwoText === '' ||
                                                                   hasSubmitted
                                                               } >Submit</Button>
    </Form>
    </div>

        )
    }

}
export default connect()(NewQuestion);