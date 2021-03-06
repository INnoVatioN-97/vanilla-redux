import React, { useState } from 'react';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';
import { add, remove } from '../store';

const Home = ({ toDos, addToDo, deleteToDo }) => {
	const [text, setText] = useState('');
	function onChange(e) {
		setText(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		if (text === '') return;
		addToDo(text);
		setText('');
	}
	return (
		<>
			<h1>To do</h1>
			<form onSubmit={onSubmit}>
				<input type='text' value={text} onChange={onChange} />
				<button>Add</button>
			</form>
			<ul>
				{toDos.map((toDo) => (
					<ToDo {...toDo} key={toDo.id} />
				))}
			</ul>
		</>
	);
};

function mapStateToProps(state) {
	return { toDos: state };
}

function mapDispatchToProps(dispatch) {
	return {
		addToDo: (text) => dispatch(add(text)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
