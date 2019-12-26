import {
  HISTORY_STOCKS_POLLING,
  NEXT_STOCKS_POLLING,
  PAUSE_STOCKS_POLLING,
  EDIT_STOCKS,
} from '../constants';

// dirty hack to handle unhandled values returned by the API
// Like 4.0330219586014976e-84 ...
const formatNumber = nbr => {
  const magicSlice = 5;
  const [n1, n2] = String(nbr).split('.');
  return Number(Number(`${n1}.${n2.slice(0, magicSlice)}`).toFixed(2));
};

export const stocksRecord = ({ stocks, index }) => ({
  id: index,
  NASDAQ: formatNumber(stocks.NASDAQ),
  CAC40: formatNumber(stocks.CAC40),
});

export const initRecords = data => data.map(stocksRecord);

export const initialState = {
  isPolling: false,
  isPaused: false,
  items: [],
  editItems: {},
};

export default (
  state = initialState,
  { type, data, position, field, editValue }
) => {
  switch (type) {
    case HISTORY_STOCKS_POLLING:
      return {
        ...state,
        isPolling: true,
        isPaused: false,
        items: initRecords(data),
      };

    case NEXT_STOCKS_POLLING:
      return {
        ...state,
        isPolling: true,
        items: state.items.slice(1).concat(stocksRecord(data)),
      };

    case PAUSE_STOCKS_POLLING:
      return {
        ...state,
        isPolling: false,
        isPaused: true,
      };

    case EDIT_STOCKS:
      return {
        ...state,
        isPolling: true,
        editItems: {
          ...state.editItems,
          [position]: {
            ...state.editItems[position],
            [field]: editValue,
          },
        },
      };

    default:
      return state;
  }
};
