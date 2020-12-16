const initState = {
  fees: [],
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_FEE':
      console.log(payload);
      // return { ...state, user: action.payload, stage: action.stage, error: null };
    case 'SET_FEE_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FEE_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'SET_FEE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}