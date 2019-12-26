import createPoller, { Poller } from './createPoller';
import { mockResponse, wait, data } from '../testHelpers';

const createTestPoller = interval =>
  createPoller(process.env.REACT_APP_REST_URL, interval);

test('Throw error without endpoint', () => {
  expect(() => createPoller()).toThrow('endpoint must be specified');
});

test('Instantiate', () => {
  const poller = createTestPoller();
  expect(poller).toBeInstanceOf(Poller);
  expect(poller.endpoint).toEqual(process.env.REACT_APP_REST_URL);
});

test('Start & emit history event with data', async done => {
  mockResponse(data);

  const poller = createTestPoller();
  const mockHandler = jest.fn();

  poller.start();
  poller.addListener('history', mockHandler);

  await wait(100);
  expect(mockHandler).toHaveBeenCalledWith(data);
  expect(poller.isPending).toBe(true);
  done();
});

test('Emit next event with last data', async done => {
  mockResponse(data.items.slice(1).concat(data.last));

  const poller = createTestPoller(5);
  const mockHandler = jest.fn();

  poller.start();
  poller.once('next', mockHandler);

  await wait(100);
  expect(mockHandler).toHaveBeenCalledWith(data.last);
  expect(poller.isPending).toBe(true);
  done();
});

test('Pause polling', async done => {
  mockResponse(data.items.slice(1).concat(data.last));

  const poller = createTestPoller(5);
  const mockHandler = jest.fn();

  poller.start();
  poller.addListener('next', mockHandler);

  await wait(5);
  poller.pause();

  await wait(100);
  expect(mockHandler).toHaveBeenCalledTimes(0);
  expect(poller.isPending).toBe(false);
  done();
});
