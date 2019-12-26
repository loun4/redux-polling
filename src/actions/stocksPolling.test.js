import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startStocksPolling,
  pauseStocksPolling,
  editStocks,
} from './stocksPolling';

const mockStore = configureMockStore([thunk]);

test('dispatch START_STOCKS_POLLING', () => {
  const store = mockStore({});

  store.dispatch(startStocksPolling());
  const storeActions = store.getActions();
  const expectedAction = [{ type: 'START_STOCKS_POLLING' }];

  expect(storeActions).toEqual(expectedAction);
});

test('dispatch PAUSE_STOCKS_POLLING', () => {
  const store = mockStore({});

  store.dispatch(pauseStocksPolling());
  const storeActions = store.getActions();
  const expectedAction = [{ type: 'PAUSE_STOCKS_POLLING' }];

  expect(storeActions).toEqual(expectedAction);
});

test('dispatch EDIT_STOCKS', () => {
  const store = mockStore({});

  const payload = {
    position: 1,
    field: 'NASDAQ',
    editValue: 140,
  };

  store.dispatch(editStocks(payload));
  const storeActions = store.getActions();
  const expectedAction = [{ type: 'EDIT_STOCKS', ...payload }];

  expect(storeActions).toEqual(expectedAction);
});
