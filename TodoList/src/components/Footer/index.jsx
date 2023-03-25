import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Footer extends Component {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		checkAll: PropTypes.func.isRequired,
		clearDone: PropTypes.func.isRequired
	}

	render() {
		const {todos} = this.props
		// 计算 done / all
		const done = todos.reduce((pre, cur) => {
			return cur.done ? pre+1 : pre
		}, 0)
		const tot = todos.length

		return (
			<div className="todo-footer">
				<label>
					<input type="checkbox" checked={done === tot && tot > 0} onChange={this.handleAll}/>
				</label>
				<span>
					<span>已完成{done}</span> / 全部{tot}
				</span>
				<button className="btn btn-danger" onClick={()=>{this.props.clearDone()}}>清除已完成任务</button>
			</div>
		)
	}

	handleAll = (e) => { // 全选/全不选
		this.props.checkAll(e.target.checked)
	}
}
