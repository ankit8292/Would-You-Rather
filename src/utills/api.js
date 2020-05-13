import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _getUser
  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
  
  export function saveQuestionAnswer (info) {
    return _saveQuestionAnswer(info)
  }
  export function getUser (id) {
    return _getUser(id)
  }
  
  export function saveQuestion (info) {
    return _saveQuestion(info)
  }