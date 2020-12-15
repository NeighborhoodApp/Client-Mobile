const initState = {
  users: [],
  user: {},
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, stage: action.stage, error: null };
    case 'SET_USER':
      return { ...state, user: action.payload, stage: action.stage, error: null };
    case 'UPDATE_USER':
      return { ...state, result: action.payload, stage: action.stage, error: null };
    case 'SET_USERS_LOADING':
    case 'SET_USER_LOADING':
    case 'UPDATE_USER_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERS_ERROR':
    case 'SET_USER_ERROR':
    case 'UPDATE_USER_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
