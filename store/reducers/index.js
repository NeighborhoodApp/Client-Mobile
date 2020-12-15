import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerRealEstate from './reducerRealEstate';

export default combineReducers({
  reducerUser,
  reducerRealEstate,
});
