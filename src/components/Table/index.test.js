import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Table from './index';
import { records } from '../../testHelpers';

const noop = () => {};

const buildSubject = (onBlur = noop, onChange = noop, editMode = false) => {
  return (
    <Table
      data={records}
      editMode={editMode}
      onFocus={noop}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

test('Render Table', () => {
  const tree = renderer.create(buildSubject()).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render with NASDAQ & CAC40 rows', () => {
  const wrapper = shallow(buildSubject());
  expect(wrapper.find('tr')).toHaveLength(2);
  expect(
    wrapper
      .find('th')
      .first()
      .text()
  ).toEqual('NASDAQ');
  expect(
    wrapper
      .find('th')
      .last()
      .text()
  ).toEqual('CAC40');
});

test('Render as many EditableCell as data items', () => {
  const wrapper = shallow(buildSubject());
  expect(wrapper.find('EditableCell')).toHaveLength(records.length * 2);
});

test('Call onBlur on editMode', () => {
  const map = {};
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });

  // editMode true
  let mockHandler = jest.fn();
  mount(buildSubject(mockHandler, undefined, true));
  map.click({ target: null });
  expect(mockHandler).toHaveBeenCalledTimes(1);

  // editMode false
  mockHandler = jest.fn();
  mount(buildSubject(mockHandler, undefined, false));
  map.click({ target: null });
  expect(mockHandler).toHaveBeenCalledTimes(0);
});

test('Call onChange with {field, position, editValue}', () => {
  const mockHandler = jest.fn();
  const wrapper = shallow(buildSubject(undefined, mockHandler));

  wrapper
    .find('EditableCell')
    .first()
    .props()
    .onChange(50);

  expect(mockHandler).toHaveBeenCalledWith({
    field: 'NASDAQ',
    position: 0,
    editValue: 50,
  });
});
