import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {
	static propTypes = {
		updateTodo: PropTypes.func.isRequired
	}

	render() {
		const {id, title, done} = this.props
		return (
			<li>
				<label>
					<input type="checkbox" onChange={this.alterCheck(id)} checked={done} />
					<span>{title}</span>
				</label>
				<button className="btn btn-danger" onClick={this.handleDelete(id)}>删除</button>
			</li>
		)
	}
	alterCheck = (id) => { // 更改 Checked 状态
		return (e) => {    // 返回值作为回调函数
			this.props.updateTodo(id, e.target.checked) // checkbox 用 checked 而非 value 取值
		}
	}
	handleDelete = (id) => { // 删除待办
		return () => {
			if(window.confirm('确定要删除吗？')) { // double check
				this.props.deleteTodo(id)
			}
		}
	}
}