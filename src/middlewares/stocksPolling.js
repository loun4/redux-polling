import {
  START_STOCKS_POLLING,
  PAUSE_STOCKS_POLLING,
  HISTORY_STOCKS_POLLING,
  NEXT_STOCKS_POLLING,
} from '../constants';

const stocksPollingMiddleware = poller => ({ dispatch }) => {
  const dispatchHistory = data => {
    dispatch({
      type: HISTORY_STOCKS_POLLING,
      data,
    });
  };

  const dispatchNext = data => {
    dispatch({
      type: NEXT_STOCKS_POLLING,
      data,
    });
  };

  poller.addListener('history', dispatchHistory);
  poller.addListener('next', dispatchNext);

  return next => action => {
    switch (action.type) {
      case START_STOCKS_POLLING:
        poller.start();
        break;
      case PAUSE_STOCKS_POLLING:
        poller.pause();
        break;
      default:
    }

    // eslint-disable-next-line consistent-return
    return next(action);
  };
};

export default stocksPollingMiddleware;
