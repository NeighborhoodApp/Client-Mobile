import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const url = 'http://localhost:3000/'

export function register (data) {
  return (dispatch, getState) => {
    console.log(data);
    dispatch({ type: 'DELETE ERROR' })
    dispatch({type: 'LOADING START'})
    axios({ method: 'post', url: url + 'users/register-warga', data })
      .then(data => {
        dispatch({ type: 'SUCCESS' })
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error: error.response.data.msg })
      })
      .finally(_=> dispatch({ type: 'LOADING END'}))
  }
}

export function fetchRealEstate () {
  return dispatch => {
    dispatch({ type: 'LOADING START'})
    axios({
      method: 'get',
      url: url + 'RealEstates'
    })
      .then(({data}) => {
      dispatch({ type: 'GET REAL ESTATE', data })
    })
      .catch(err => console.log(err))
      .finally(_=> {
        dispatch({ type: 'LOADING END'})
      })

  }
}

export function fetchComplex () {
  return dispatch => {
    dispatch({ type: 'LOADING START'})
    axios({
      method: 'get',
      url: url + 'Complexs'
    })
      .then(({data}) => {
      dispatch({ type: 'GET COMPLEX', data })
    })
      .catch(err => console.log(err))
      .finally(_=> {
        dispatch({ type: 'LOADING END'})
      })
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
    case 'ERROR':
      return { ...state, error: action.error }
    case 'DELETE ERROR':
      return { ...state, error: false }
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