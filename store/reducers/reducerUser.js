const initState = {
  users: [],
  user: {}, // user Now Loginned
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, stage: action.stage, error: null };
    case 'SET_USER':
      return { ...state, user: action.payload, stage: action.stage, error: null };
    case 'SET_USERS_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERS_ERROR':
        return { ...state, stage: action.stage, error: action.payload };
    case 'SET_USER_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
