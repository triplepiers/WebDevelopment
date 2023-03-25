import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
    state = {
        users: [],
        isFirst: true,
        isLoading: false,
        errMsg: ''
    }

    componentDidMount() {
        PubSub.subscribe('neoState', (_,data) => {
            this.setState({...data})
        })
    }

	render() {
        const {users, isFirst, isLoading, errMsg} = this.state

		return (
			<div className="row">
                {
                    isFirst ? <h3>欢迎！请输入关键字进行搜索</h3> :
                    isLoading ? <h3>加载中...</h3> :
                    errMsg ? <h3 style={{color:'red'}}>{errMsg}</h3> :
                    users.map(item => {
                        return (
                            <div className="card" key={item.id}>
                                <a href={item.html_url} rel="noreferrer" target="_blank">
                                    <img alt="head_portrait" style={{width:'100px'}} src={item.avatar_url}/>
                                    <p className="card-text" style={{marginTop:'5px'}}>{item.login}</p>
                                </a>
                            </div>
                        )
                    })
                }
			</div>
		)
	}
}
