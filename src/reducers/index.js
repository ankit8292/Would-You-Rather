import { combineReducers } from 'redux'
import auth from './authedUser'
import users from './users'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  auth,
  users,
  questions,
  loadingBar: loadingBarReducer,
})