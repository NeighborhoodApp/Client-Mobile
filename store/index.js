import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const url = 'https://my-json-server.typicode.com/agungwas/finalprojectserverfake/'

export function fetchRealEstate () {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING START'})
    axios({
      method: 'get',
      url: url + 'RealEstates'
    }).then(({data}) => {
      dispatch({ type: 'GET REAL ESTATE', data })
      dispatch({ type: 'LOADING END'})
    }).catch(err => console.log(err))
  }
} 


function reducer (state = { 
  loading: false, error: false,
  realEstate: [],
  kompleks: [], 
}, action) {

  switch (action.type) {
    case 'LOADING START':
      return { ...state, loading: true }
    case 'LOADING END':
      return { ...state, loading: false }
    case 'GET REAL ESTATE':
      return { ...state, realEstate: action.data }
  }
  return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));


export default store