const initState = {
  events: [],
  event: null, // event Now Loginned
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_EVENTS':
      if (action.payload) {
        return {
          ...state,
          events: action.payload,
          stage: action.stage,
          error: null,
        };
      }
      return { ...state, events: action.payload, stage: action.stage, error: null };
    case 'SET_EVENT':
      if (action.payload) {
        return { ...state, event: action.payload, stage: action.stage, error: null };
      }
      return { ...state, event: action.payload, stage: action.stage, error: null };
    case 'UPDATE_EVENT':
      return { ...state, result: action.payload, stage: action.stage, error: null };

    case 'SET_EVENTS_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EVENT_LOADING':
    case 'UPDATE_EVENT_LOADING':
      return { ...state, loading: action.payload, stage: null };
    case 'SET_EVENTS_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'SET_EVENT_ERROR':
    case 'UPDATE_EVENT_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
