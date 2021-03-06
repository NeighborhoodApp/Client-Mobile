const initState = {
  users: [],
  user: null, // user Now Loginned
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null,
};

export default function reducer(state = initState, action) {
  // console.log('action', action.stage)
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
      if (action.payload.foundUser) {
        return { ...state, user: action.payload.foundUser, stage: action.stage || null, error: null };
      }
      return { ...state, user: action.payload, stage: action.stage || action.stage || null, error: null };
    case 'UPDATE_USER':
      const updatedUser = state.users.filter((user) => user.id !== action.payload);

      console.log(action, updatedUser);
      return { ...state, result: action.payload, stage: action.stage, error: null, users: updatedUser };
    case 'REMOVE_USER':
      return { ...state, user: null, stage: null, error: null };
    case 'REMOVE_USERS':
      return { ...state, users: null, stage: null, error: null };

    case 'SET_USERS_LOADING':
    case 'SET_USER_LOADING':
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
