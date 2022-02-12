import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addToDo = (text) => {
	return { type: ADD_TODO, text };
};
const deleteTodo = (id) => {
	return { type: DELETE_TODO, id };
};
const reducer = (state = [], action) => {
	// console.log(state, action);
	switch (action.type) {
		case ADD_TODO:
			return [{ text: action.text, id: Date.now() }, ...state];
		case DELETE_TODO:
			return state.filter((arr) => arr.id !== action.id);
		default:
			return state;
	}
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
	ul.innerHTML = '';
	const toDos = store.getState();
	toDos.forEach((toDo) => {
		const li = document.createElement('li');
		const btn = document.createElement('button');
		btn.addEventListener('click', dispatchDeleteTodo);
		li.id = toDo.id;
		li.innerText = toDo.text;
		btn.innerText = 'Delete';
		li.appendChild(btn);
		ul.appendChild(li);
	});
};

store.subscribe(paintToDos);

const dispatchAddToDo = (text) => {
	store.dispatch(addToDo(text));
};

const dispatchDeleteTodo = (e) => {
	const id = parseInt(e.target.parentNode.id);
	store.dispatch(deleteTodo(id));
};

const onSubmit = (e) => {
	e.preventDefault();
	const toDo = input.value;
	input.value = '';
	dispatchAddToDo(toDo);
};

form.addEventListener('submit', onSubmit);
