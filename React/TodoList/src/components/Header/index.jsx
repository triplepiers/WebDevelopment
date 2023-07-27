import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Header extends Component {
	// 对接受的 props 进行类型 & 必要性限制
	static propsTypes = {
		addTodo: PropTypes.func.isRequired
	}

	render() {
		return (
			<div className="todo-header">
				<input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
			</div>
		)
	}
	
	handleKeyUp = (e) => {
		const {target, keyCode} = e
		// 匹配 Enter
		if(keyCode === 13) {
			if(target.value.trim() === '') {
				alert('输入不能为空！')
				return
			}
			this.props.addTodo(target.value)
			target.value = ""
		}
	}
}