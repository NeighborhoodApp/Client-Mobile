const initState = {
  users: [],
  user: {}, // user Now Loginned
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_USERS':
      if (action.payload.allUsers) {
        return {
          ...state,
          users: action.payload.allUsers,
          stage: action.stage,
          error: null,
        };
      }
      return { ...state, users: action.payload, stage: action.stage, error: null };
    case 'SET_USER':
      console.log(action.payload);
      if (action.payload.foundUser) {
        return { ...state, user: action.payload.foundUser, stage: action.stage, error: null };
      }
      return { ...state, user: action.payload, stage: action.stage, error: null };
    case 'UPDATE_USER':
      console.log(action);
      const updatedUser = state.users.filter((user) => user.id !== action.payload);
      return { ...state, result: action.payload, stage: action.stage, error: null, users: updatedUser };

    case 'SET_USERS_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER_LOADING':
      return { ...state, loading: action.payload };
    case 'UPDATE_USER_LOADING':
      return { ...state, loading: action.payload, stage: null };
    case 'SET_USERS_ERROR':
        return { ...state, stage: action.stage, error: action.payload };
    case 'SET_USER_ERROR':
    case 'UPDATE_USER_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
