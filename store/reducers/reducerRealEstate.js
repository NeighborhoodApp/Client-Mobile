const initState = {
  realEstates: [],
  realEstate: null,
  error: null,
  loading: false,
  stage: null, // create, update, delete, edit, customize welcome
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'SET_REAL_ESTATES':
      return { ...state, realEstates: action.payload.allRealEstates, stage: action.stage, error: null };
    case 'SET_REAL_ESTATE':
      return { ...state, realEstate: action.payload, stage: action.stage, error: null };
    case 'REMOVE_REAL_ESTATE':
      return { ...state, realEstates: null, stage: null, error: null };
    case 'SET_REAL_ESTATES_LOADING':
    case 'SET_REAL_ESTATE_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_REAL_ESTATES_ERROR':
    case 'SET_REAL_ESTATE_ERROR':
      return { ...state, stage: action.stage, error: action.payload };
    case 'REMOVE_STAGE_ERROR':
      return { ...state, stage: null, error: null };
    default:
      return state;
  }
}
