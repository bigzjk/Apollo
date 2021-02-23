import React from 'react';
import { withRouter } from 'react-router-dom'
import Footer from './Footer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoPage = (props) => (
  <div>
    <TodoForm />
    <TodoList />
    <Footer />
    <div
      className="test"
      onClick={() => {
        props.history.push('/test')
      }}
    >Test</div>
  </div>
);
export default withRouter(TodoPage);
