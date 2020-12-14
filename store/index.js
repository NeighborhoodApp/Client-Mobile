import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const url = 'http://localhost:3000/'

export function fetchRealEstate () {
  return dispatch => {
    console.log('sampai dalam');
    dispatch({ type: 'LOADING START'})
    axios({
      method: 'get',
      url: url + 'RealEstates'
    }).then(({data}) => {
      console.log(url);
      dispatch({ type: 'GET REAL ESTATE', data })
      dispatch({ type: 'LOADING END'})
    }).catch(err => console.log(err))
  }
}

export function fetchComplex () {
  return dispatch => {
    console.log('sampai dalam');
    dispatch({ type: 'LOADING START'})
    axios({
      method: 'get',
      url: url + 'Complexs'
    }).then(({data}) => {
      dispatch({ type: 'GET COMPLEX', data })
      dispatch({ type: 'LOADING END'})
    }).catch(err => console.log(err))
  }
}

export function login () {
  console.log('sampai login');
  return (dispatch, getState) => {
    console.log('sampai login');
  }
}

function reducer (state = { 
  loading: false, error: false,
  realEstate: [],
  complex: [], 
}, action) {

  switch (action.type) {
    case 'LOADING START':
      return { ...state, loading: true }
    case 'LOADING END':
      return { ...state, loading: false }
    case 'GET REAL ESTATE':
      return { ...state, realEstate: action.data }
    case 'GET COMPLEX':
      return { ...state, complex: action.data }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store