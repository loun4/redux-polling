import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import stocksPollingMiddleware from './middlewares/stocksPolling';
import rootReducer from './reducers';
import createPoller from './services/createPoller';

const loggerMiddleware = createLogger({
  predicate() {
    return process.env.NODE_ENV === 'development';
  },
});

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    stocksPollingMiddleware(createPoller(process.env.REACT_APP_REST_URL))
  )
);
