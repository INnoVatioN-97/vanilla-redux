import { createStore } from 'redux';
import {
	configureStore,
	createAction,
	createReducer,
	createSlice,
} from '@reduxjs/toolkit';

const toDos = createSlice({
	name: 'toDosReducer',
	initialState: [],
	reducers: {
		add: (state, action) => {
			state.push({ text: action.payload, id: Date.now() });
		},
		remove: (state, action) => {
			return state.filter((toDo) => toDo.id !== action.payload);
		},
	},
});

console.log(toDos.actions);

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer, action: toDos.actions });
