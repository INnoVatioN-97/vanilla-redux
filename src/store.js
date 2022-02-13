import { createStore } from 'redux';
import { createAction, createReducer } from '@reduxjs/toolkit';

const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

/**
 * createReducer (초기상태값, 분기)
 * = 새 state를 return 하거나, mutate할 수 있다.
 */
const reducer = createReducer([], {
	[addToDo]: (state, action) => {
		state.push({ text: action.payload, id: Date.now() });
	},
	[deleteToDo]: (state, action) => {
		// console.log(action.payload);
		// console.log(state);
		return state.filter((toDo) => toDo.id !== action.payload);
	},
});

const store = createStore(reducer);

export const actionCreators = {
	addToDo,
	deleteToDo,
};

export default store;
