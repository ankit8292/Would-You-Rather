import { getInitialData,getUser,saveQuestionAnswer, saveQuestion } from '../utills/api'
import { receiveUsers,addUserQuestion,addUserQuestionAnswer } from '../actions/users'
import { receiveQuestions,addQuestionAnswer,addQuestion } from '../actions/questions'
import {receiveAuthLogin,receiveAuthLogout} from '../actions/authedUser';

import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      
      .then(({ users, questions }) => {

        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
} 


export function handleGetUsers () {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        
        .then(({ users }) => {
  
          dispatch(receiveUsers(users))
         
          dispatch(hideLoading())
        })
    }
  } 

  export function handleLoginUser(id) {
    return (dispatch) => {
        dispatch(showLoading());
        getUser(id).then((user) => {
            dispatch(receiveAuthLogin(user));
            dispatch(hideLoading());
        });
    };
}

export function handleLogoutUser() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(receiveAuthLogout());
        dispatch(hideLoading());
    }
}

export function handleAddQuestionAnswer (questionId, selectedOption) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const {auth} = getState();
        const authedUser = auth.loggedInUser.id;

        saveQuestionAnswer({
            authedUser,
            qid: questionId,
            answer: selectedOption
        }).then(() => {
            dispatch(addQuestionAnswer(authedUser, questionId, selectedOption));
            dispatch(addUserQuestionAnswer(authedUser, questionId, selectedOption));
            dispatch(hideLoading());
        });
    }
}

export function handleAddQuestion (optionOneText, optionTwoText, callback) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const {auth} = getState();
        const author = auth.loggedInUser.id;

        saveQuestion({
            optionOneText,
            optionTwoText,
            author
        }).then((question) => {
            dispatch(addUserQuestion(question));
            dispatch(addQuestion(question));
            dispatch(showLoading());
        }).then(callback);
    }
}