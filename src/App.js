import React, { Component } from "react";
import Todos from "./Components/Todos";
import Header from "./Components/Layout/Header";
import AddTodo from "./Components/AddTodo";
import "./App.css";
import axios from "axios";
//import uuid from "uuid";
import About from "./Components/Pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {
  state = {
    todos: [],
  };
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=30")
      .then((res) => this.setState({ todos: res.data }));
  }

  //TOGGLE COMPLETED
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // DELETE TODO
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };

  //addTodo
  addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    delTodo={this.delTodo}
                    markComplete={this.markComplete}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
