import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import fundReducer from './slices/fund';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  fund: fundReducer
});

export { rootPersistConfig, rootReducer };
