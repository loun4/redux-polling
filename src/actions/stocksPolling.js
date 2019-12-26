import {
  START_STOCKS_POLLING,
  PAUSE_STOCKS_POLLING,
  EDIT_STOCKS,
} from '../constants';

export const startStocksPolling = () => dispatch => {
  dispatch({
    type: START_STOCKS_POLLING,
  });
};

export const pauseStocksPolling = () => dispatch => {
  dispatch({
    type: PAUSE_STOCKS_POLLING,
  });
};

export const editStocks = ({ position, field, editValue }) => dispatch => {
  dispatch({
    type: EDIT_STOCKS,
    position,
    field,
    editValue,
  });
};
