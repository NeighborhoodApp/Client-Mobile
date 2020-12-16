import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerRealEstate from './reducerRealEstate';
import reducerFees from './reducerFees';

export default combineReducers({
  reducerUser,
  reducerRealEstate,
  reducerFees
});
