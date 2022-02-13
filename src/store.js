import { createStore } from 'redux';
import { createAction, createReducer } from '@reduxjs/toolkit';

// 액션명을 정의
const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

/**
 * createReducer (초기상태값, 분기){
 *  [액션명] : (state, action) => {세부 동작}
 * }
 * = 새 state를 return 하거나, mutate할 수 있다.
 */
const reducer = createReducer([], {
	[addToDo]: (state, action) => {
		state.push({ text: action.payload, id: Date.now() });
	},
	[deleteToDo]: (state, action) => {
		return state.filter((toDo) => toDo.id !== action.payload);
	},
});

const store = createStore(reducer);

// 이전과 동일
export const actionCreators = {
	addToDo,
	deleteToDo,
};

export default store;
