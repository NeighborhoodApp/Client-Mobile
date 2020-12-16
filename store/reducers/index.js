import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerRealEstate from './reducerRealEstate';
import reducerTimeline from './reducerTimeline';
import reducerComment from './reducerComment';

export default combineReducers({
  reducerUser,
  reducerRealEstate,
  reducerTimeline,
  reducerComment,
});
