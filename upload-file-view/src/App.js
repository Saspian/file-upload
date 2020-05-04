import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Switch only one component at a time
import './App.css';
import FormInput from './FormInput';
import Modal from './modal';
import Cards from './getCard';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/card/:id' exact component={Modal} />
        <Route path='/' component={FormInput} />
        <Route path='/' component={Cards} />
      </Router>
    </div>
  );
}

export default App;
