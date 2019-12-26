import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import stocksPollingMiddleware from './stocksPolling';
import createPoller from '../services/createPoller';
import { mockResponse, wait, data } from '../testHelpers';

const poller = createPoller(process.env.REACT_APP_REST_URL, 50);
const mockStore = configureMockStore([thunk, stocksPollingMiddleware(poller)]);

test('Start polling on START_STOCKS_POLLING', async done => {
  mockResponse(data.items);

  const store = mockStore({});
  store.dispatch({
    type: 'START_STOCKS_POLLING',
  });

  await wait(0);
  expect(poller.isPending).toBe(true);
  done();
});

test('Pause polling on PAUSE_STOCKS_POLLING', async done => {
  mockResponse(data.items);

  const store = mockStore({});
  store.dispatch({
    type: 'PAUSE_STOCKS_POLLING',
  });

  await wait(0);
  expect(poller.isPending).toBe(false);
  done();
});

test('Dispatch HISTORY_STOCKS_POLLING on history', async done => {
  mockResponse(data.items);

  const store = mockStore({});
  store.dispatch({
    type: 'START_STOCKS_POLLING',
  });

  const expectedAction = {
    type: 'HISTORY_STOCKS_POLLING',
    data: data.items,
  };

  await wait(0);
  expect(store.getActions()).toContainEqual(expectedAction);
  done();
});

test('Dispatch NEXT_STOCKS_POLLING on next', async done => {
  mockResponse(data.items.slice(1).concat(data.last));

  const store = mockStore({});
  store.dispatch({
    type: 'START_STOCKS_POLLING',
  });

  const expectedAction = {
    type: 'NEXT_STOCKS_POLLING',
    data: data.last,
  };

  await wait(100);
  expect(store.getActions()).toContainEqual(expectedAction);
  done();
});
