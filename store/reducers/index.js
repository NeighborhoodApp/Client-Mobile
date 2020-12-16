import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerRealEstate from './reducerRealEstate';
import reducerFees from './reducerFees';
import reducerTimeline from './reducerTimeline';
import reducerComment from './reducerComment';

export default combineReducers({
  reducerUser,
  reducerRealEstate,
  reducerComment,
  reducerFees
});
