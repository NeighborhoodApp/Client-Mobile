import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerEvent from './reducerEvent';
import reducerFee from './reducerFee';
import reducerRealEstate from './reducerRealEstate';
import reducerTimeline from './reducerTimeline';
import reducerComment from './reducerComment';

export default combineReducers({
  reducerUser,
  reducerRealEstate,
  reducerTimeline,
  reducerEvent,
  reducerComment,
  reducerFee,
});
