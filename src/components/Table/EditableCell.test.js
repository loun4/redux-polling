import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import EditableCell from './EditableCell';

const noop = () => {};

const buildSubject = (onFocus = noop, onChange = noop) => {
  return <EditableCell value={1} onFocus={onFocus} onChange={onChange} />;
};

test('Render EditableCell', () => {
  const tree = renderer.create(buildSubject()).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Call onChange', () => {
  const mockHandler = jest.fn();
  const wrapper = shallow(buildSubject(undefined, mockHandler));

  wrapper
    .find('input')
    .props()
    .onChange({
      target: {
        value: '5',
      },
    });

  expect(mockHandler).toHaveBeenCalledWith(5);
});

test('Call onFocus', () => {
  const mockHandler = jest.fn();
  const wrapper = shallow(buildSubject(mockHandler));

  wrapper
    .find('input')
    .props()
    .onFocus();

  expect(mockHandler).toHaveBeenCalled();
});
