import React from "react"
import {nanoid} from 'nanoid'

import './App.css'
import Header from "./components/Header"
import List from './components/List'
import Footer from "./components/Footer"

export default class App extends React.Component {
    state = {
        todos: [
            {
                id: '01',
                title: "吃饭",
                done: false
            },
            {
                id: '02',
                title: "睡觉",
                done: true
            },
            {
                id: '03',
                title: "打代码",
                done: false
            }
        ]
    }

    render() {
        const {todos} = this.state
        return (
            <div className="todo-container">
				<div className="todo-wrap">
                    <Header addTodo={this.addTodo}/>
                    <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                    <Footer todos={todos} checkAll={this.checkAll} clearDone={this.clearDone}/>
				</div>
			</div>
        ) 
    }
    
    addTodo = (title) => {
        const newTodo = {
            id: nanoid(),
            title,
            done: false
        }
        const newTodos = [newTodo, ...this.state.todos]
        this.setState({todos: newTodos})
    }

    updateTodo = (id, done) => {
        const {todos} = this.state
        // map 并不改变旧数组，所以要接一下
        const newtodos = todos.map(item => {
            if(item.id === id) {
                return {...item, done} // 仅修改 done 状态
            } else {
                return item
            }
        })
        this.setState({todos: newtodos})
    }

    deleteTodo = (id) => {
        const {todos} = this.state
        const newtodos = todos.filter(item => {
            return item.id !== id
        })
        this.setState({todos: newtodos})
    }

    checkAll = (done) => {
        const {todos} = this.state
        const newtodos = todos.map(item => {
            return {...item, done}
        })
        this.setState({todos: newtodos})
    }

    clearDone = () => {
        const {todos} = this.state
        const newtodos = todos.filter(item => {
            return !item.done
        })
        this.setState({todos: newtodos})
    }
}