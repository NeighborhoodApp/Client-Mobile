const initState = {
  timelines: [],
  timeline: {},
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null,
  newTimeline: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_TIMELINES':
      return { ...state, timelines: action.payload, stage: action.stage, error: null };
    case 'CREATE_TIMELINE':
      return { ...state, newTimeline: action.payload, stage: action.stage, error: null };
    case 'REMOVE_NEW_TIMELINE':
      return { ...state, newTimeline: null, stage: 'removeTimeline', error: null };
    case 'UNMOUNT_TIMELINES':
      return { ...state, timelines: [], stage: null, error: null };
    case 'SET_TIMELINES_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TIMELINES_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
