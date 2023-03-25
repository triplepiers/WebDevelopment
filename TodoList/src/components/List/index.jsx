import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import Item from '../Item'

export default class List extends Component {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		updateTodo: PropTypes.func.isRequired,
		deleteTodo: PropTypes.func.isRequired
	}

	render() {
		const {todos, updateTodo, deleteTodo} = this.props
		return (
			<ul className="todo-main">
				{
					todos.map(item => {
						return <Item key={item.id} {...item} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
					}) 
				}
			</ul>
		)
	}
}