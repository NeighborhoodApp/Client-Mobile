const initState = {
  comments: [],
  comment: {},
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload, stage: action.stage, error: null };
    // case 'SET_TIMELINE': 
    //   let newData = state.timelines.concat(action.payload)
      // return { ...state, timelines: newData, stage: action.stage, error: null };
    // case 'SET_USER':
    //   if (action.payload.foundUser) {
    //     return { ...state, user: action.payload.foundUser, stage: action.stage, error: null };
    //   }
    //   return { ...state, user: action.payload, stage: action.stage, error: null };
    // case 'UPDATE_USER':
    //   return { ...state, result: action.payload, stage: action.stage, error: null };
    case 'SET_COMMENTS_LOADING':
    // case 'SET_USER_LOADING':
    // case 'UPDATE_USER_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_COMMENTS_ERROR':
    // case 'SET_USER_ERROR':
    // case 'UPDATE_USER_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
