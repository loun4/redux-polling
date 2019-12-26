import stocks, { initialState, initRecords, stocksRecord } from './stocks';
import { data } from '../testHelpers';

test('Handle ENTITY_DATA_REQUESTED', () => {
  const action = {
    type: 'HISTORY_STOCKS_POLLING',
    data: data.items,
  };

  const expectedState = {
    ...initialState,
    isPolling: true,
    isPaused: false,
    items: initRecords(data.items),
  };

  expect(stocks(initialState, action)).toEqual(expectedState);
});

test('Handle NEXT_STOCKS_POLLING', () => {
  const action = {
    type: 'NEXT_STOCKS_POLLING',
    data: data.last,
  };

  const prevState = {
    ...initialState,
    isPolling: true,
    isPaused: false,
    items: initRecords(data.items),
  };

  const expectedState = {
    ...prevState,
    isPolling: true,
    isPaused: false,
    items: initRecords(data.items)
      .slice(1)
      .concat(stocksRecord(data.last)),
  };

  expect(stocks(prevState, action)).toEqual(expectedState);
});

test('Handle PAUSE_STOCKS_POLLING', () => {
  const action = {
    type: 'PAUSE_STOCKS_POLLING',
  };

  const expectedState = {
    ...initialState,
    isPolling: false,
    isPaused: true,
  };

  expect(stocks(initialState, action)).toEqual(expectedState);
});

test('Handle EDIT_STOCKS', () => {
  const action = {
    type: 'EDIT_STOCKS',
    position: 1,
    field: 'CAC40',
    editValue: 150,
  };

  const expectedState = {
    ...initialState,
    isPolling: true,
    isPaused: false,
    editItems: {
      1: {
        CAC40: 150,
      },
    },
  };

  expect(stocks(initialState, action)).toEqual(expectedState);
});
