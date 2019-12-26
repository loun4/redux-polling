import 'cross-fetch';
import EventEmitter from 'events';

const HISTORY_COUNT = 20;
const NEXT_COUNT = 1;
const POLLING_INTERVAL = 1000;

const getData = (endpoint, count) =>
  fetch(`${endpoint}?count=${count}`).then(res => res.json());

export class Poller extends EventEmitter {
  constructor(endpoint, interval = POLLING_INTERVAL) {
    super();

    if (typeof endpoint === 'undefined') {
      throw new Error('endpoint must be specified');
    }

    this.endpoint = endpoint;
    this.timer = null;
    this.isPending = false;
    this.interval = interval;
  }

  async start() {
    const data = await getData(this.endpoint, HISTORY_COUNT);
    this.emit('history', data);
    this.isPending = true;
    this.next();
  }

  next() {
    clearTimeout(this.timer);

    this.timer = setTimeout(async () => {
      const data = await getData(this.endpoint, NEXT_COUNT);
      this.emit('next', [...data].pop());
      this.next();
    }, this.interval);
  }

  pause() {
    this.isPending = false;
    clearTimeout(this.timer);
  }
}

const createPoller = (endpoint, interval) => new Poller(endpoint, interval);

export default createPoller;
