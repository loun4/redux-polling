import React from 'react';
import propTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const Chart = ({ data }) => {
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey={item => data.indexOf(item) + 1} />
      <YAxis />
      <Legend />
      <Line type="linear" dataKey="NASDAQ" stroke="#eb7d3c" dot={false} />
      <Line type="linear" dataKey="CAC40" stroke="#5e9cd3" dot={false} />
    </LineChart>
  );
};

Chart.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({})).isRequired,
};

export default Chart;
