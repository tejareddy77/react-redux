import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import store from './redux/store'
import RestaurantsContainer from './components/RestaurantsContainer';

function App() {
  return (
    <Provider store={store}>
      
      <RestaurantsContainer />
    </Provider>
  )
}

export default App
