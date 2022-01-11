import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button} from 'antd';

const App = () => {
  return (
    <div className="container">
      <span>Hello React</span>
      <Button type="primary">Click</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
