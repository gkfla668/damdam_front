import { combineReducers } from 'redux'
import debate from '../redux/module/debate'
import debateChat from '../redux/module/debateChat'

export default combineReducers({
	debate,
	debateChat,
})
