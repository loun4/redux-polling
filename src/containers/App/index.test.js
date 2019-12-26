import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { act } from '@testing-library/react';
import App from './index';
import { records } from '../../testHelpers';

const initialState = {
  stocks: {
    isPolling: true,
    isPaused: false,
    items: records,
    editItems: {},
  },
};

const mockStore = configureStore([thunk]);
const noop = () => {};

const buildSubject = (state, startStocksPollingAction = noop) => (
  <App
    store={mockStore(state)}
    startStocksPollingAction={startStocksPollingAction}
    pauseStocksPollingAction={noop}
    editStocksAction={noop}
  />
);

test('Render App', () => {
  const tree = renderer.create(buildSubject(initialState)).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Hydrate data from edit items', () => {
  const state = {
    stocks: {
      ...initialState.stocks,
      editItems: {
        0: {
          CAC40: 200,
        },
      },
    },
  };

  const expectRecords = records.map((record, index) =>
    index === 0 ? { ...record, CAC40: 200 } : record
  );

  const wrapper = shallow(buildSubject(state));
  expect(wrapper.dive().props().stocks.items).toEqual(expectRecords);
});

test('Call startStocksPollingAction on init', () => {
  const mockAction = jest.fn();

  act(() => {
    mount(buildSubject(initialState, mockAction));
  });

  expect(mockAction).toHaveBeenCalled();
});
