import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');
number.innerText = 0;

const ADD = 'ADD';
const MINUS = 'MINUS';

/**
 * return 되는 값이 곧 state로, store.getState() 로 가져올 수 있다.
 */
const countModifier = (count = 0, action) => {
	switch (action.type) {
		case ADD:
			return count + 1;

		case MINUS:
			return count - 1;

		default:
			return count;
	}
};

const countStore = createStore(countModifier);

const onChange = () => {
	console.log('There was a change on the store.');
	number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

add.addEventListener('click', () => countStore.dispatch({ type: ADD }));
minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));
