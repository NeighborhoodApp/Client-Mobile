const initState = {
  fees: [],
  fee: {}, // fee Now Loginned
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
  result: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_FEES':
      if (action.payload) {
        return {
          ...state,
          fees: action.payload,
          stage: action.stage,
          error: null,
        };
      }
      return { ...state, fees: action.payload, stage: action.stage, error: null };
    case 'SET_FEE':
      if (action.payload) {
        return { ...state, fee: action.payload, stage: action.stage, error: null };
      }
      return { ...state, fee: action.payload, stage: action.stage, error: null };
    case 'UPDATE_FEE':
      return { ...state, result: action.payload, stage: action.stage, error: null };

    case 'SET_FEES_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FEE_LOADING':
    case 'UPDATE_FEE_LOADING':
      return { ...state, loading: action.payload, stage: null };
    case 'SET_FEE_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'SET_FEE_ERROR':
    case 'UPDATE_FEE_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_FEE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
