import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
	render() {
		return (
			<section className="jumbotron">
				<h3 className="jumbotron-heading">搜索Github用户</h3>
				<div>
					<input ref={(cur)=>{this.InputBox=cur}} type="text" placeholder="输入关键词点击搜索" />&nbsp;
					<button onClick={this.searchUsr}>搜索</button>
				</div>
			</section>
		)
	}
	// 搜索 Github 用户
	searchUsr = (e) => {
		// 获取用户输入 - 只定义了最内侧的 value, 可以用 old-name:new-name 定义新的名字
		const {InputBox:{value:keyWord}} = this
		this.InputBox.value = ""
		// loading...
		PubSub.publish('neoState', {isFirst: false, isLoading: true})
		// 发送网络请求
		axios.get(`/api/search/users?q=${keyWord}`)
		.then(
			res => {
				PubSub.publish('neoState', {isLoading: false, users: res.data.items})
			},
			err => {
				PubSub.publish('neoState', {isLoading: false, errMsg: '请求出错'})
			}
		)
	}
}
