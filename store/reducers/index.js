import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerEvent from './reducerEvent';
import reducerRealEstate from './reducerRealEstate';
import reducerTimeline from './reducerTimeline';

export default combineReducers({
  reducerUser,
  reducerRealEstate,
  reducerTimeline,
  reducerEvent,
});
