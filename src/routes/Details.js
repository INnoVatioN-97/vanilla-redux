import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const Details = ({ toDos }) => {
	const params = useParams();
	const toDoText = toDos.find((toDo) => toDo.id === parseInt(params.id));
	console.log(toDoText);
	return (
		<>
			<h1>"{toDoText?.text}"</h1>
			<h5>Created At {params.id}</h5>
		</>
	);
};

function mapStateToProps(state, ownProps) {
	return { toDos: state };
}

export default connect(mapStateToProps)(Details);
