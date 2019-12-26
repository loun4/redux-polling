import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  startStocksPolling,
  pauseStocksPolling,
  editStocks,
} from '../../actions/stocksPolling';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import '../../css/app.css';

function App({
  startStocksPollingAction,
  pauseStocksPollingAction,
  editStocksAction,
  stocks,
}) {
  useEffect(startStocksPollingAction, []);

  const { items, isPaused } = stocks;

  return (
    <div>
      <Chart data={items} />
      <Table
        data={items}
        editMode={isPaused}
        onChange={editStocksAction}
        onFocus={pauseStocksPollingAction}
        onBlur={startStocksPollingAction}
      />
    </div>
  );
}

App.propTypes = {
  startStocksPollingAction: propTypes.func.isRequired,
  pauseStocksPollingAction: propTypes.func.isRequired,
  editStocksAction: propTypes.func.isRequired,
  stocks: propTypes.shape({
    isPaused: propTypes.bool,
    items: propTypes.arrayOf(propTypes.shape({})),
  }).isRequired,
};

const hydrateDataFromEdit = (items, editItems) => {
  if (Object.keys(editItems).length === 0) return items;

  return items.map((item, index) => {
    if (!editItems[index]) return item;
    return {
      ...item,
      ...editItems[index],
    };
  });
};

const mapStateToProps = ({ stocks }) => ({
  stocks: {
    ...stocks,
    items: hydrateDataFromEdit(stocks.items, stocks.editItems),
  },
});

// Allow dispatchProps to be overriden
// so  props can be mocked & tested
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default connect(
  mapStateToProps,
  {
    startStocksPollingAction: startStocksPolling,
    pauseStocksPollingAction: pauseStocksPolling,
    editStocksAction: editStocks,
  },
  mergeProps
)(App);
