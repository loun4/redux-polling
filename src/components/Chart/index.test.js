import React from 'react';
import renderer from 'react-test-renderer';
import Chart from './index';
import { records } from '../../testHelpers';

test('Render Chart', () => {
  const tree = renderer.create(<Chart data={records} />).toJSON();
  expect(tree).toMatchSnapshot();
});
