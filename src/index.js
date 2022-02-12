import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');
number.innerText = 0;
/**
 * return 되는 값이 곧 state로, store.getState() 로 가져올 수 있다.
 */
const countModifier = (count = 0, action) => {
	const { type } = action;
	switch (type) {
		case 'ADD':
			count++;
			break;
		case 'MINUS':
			count--;
			break;
		default:
			break;
	}
	// console.log(type);
	console.log(count);
	return count;
};

const countStore = createStore(countModifier);

const onChange = () => {
	console.log('There was a change on the store.');
	number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

add.addEventListener('click', () => countStore.dispatch({ type: 'ADD' }));
minus.addEventListener('click', () => countStore.dispatch({ type: 'MINUS' }));
