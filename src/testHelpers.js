export const wait = async delay =>
  new Promise(resolve => setTimeout(resolve, delay));

export const mockResponse = data => fetch.mockResponse(JSON.stringify(data));

export const data = {
  items: [
    {
      timestamp: 1577205012991,
      index: 1,
      stocks: { NASDAQ: 15.000035664937867, CAC40: 144.95085585450022 },
    },
    {
      timestamp: 1577205013993,
      index: 2,
      stocks: { NASDAQ: 14.999807535966454, CAC40: 144.94473794314257 },
    },
    {
      timestamp: 1577205014994,
      index: 3,
      stocks: { NASDAQ: 14.923148783552527, CAC40: 54.832722903277684 },
    },
    {
      timestamp: 1577205015995,
      index: 4,
      stocks: { NASDAQ: 14.910386463812493, CAC40: 54.83272271392798 },
    },
    {
      timestamp: 1577205016996,
      index: 5,
      stocks: { NASDAQ: 15.784500875221571, CAC40: 53.0103932525638 },
    },
    {
      timestamp: 1577205017997,
      index: 6,
      stocks: { NASDAQ: 15.800954512976684, CAC40: 51.964596975905756 },
    },
    {
      timestamp: 1577205018998,
      index: 7,
      stocks: { NASDAQ: 15.75607527534057, CAC40: 82.92863498029928 },
    },
    {
      timestamp: 1577205019999,
      index: 8,
      stocks: { NASDAQ: 15.755362566834256, CAC40: 79.77210957972518 },
    },
    {
      timestamp: 1577205020999,
      index: 9,
      stocks: { NASDAQ: 17.959520734996243, CAC40: 81.31317656817889 },
    },
    {
      timestamp: 1577205022001,
      index: 10,
      stocks: { NASDAQ: 14.79792027248049, CAC40: 109.72239916988094 },
    },
    {
      timestamp: 1577205023002,
      index: 11,
      stocks: { NASDAQ: 20.6455208726967, CAC40: 110.43443262937416 },
    },
    {
      timestamp: 1577205024003,
      index: 12,
      stocks: { NASDAQ: 32.186997789424034, CAC40: 56.50619716004383 },
    },
    {
      timestamp: 1577205025004,
      index: 13,
      stocks: { NASDAQ: 32.1869992400095, CAC40: 56.49264660421396 },
    },
    {
      timestamp: 1577205026005,
      index: 14,
      stocks: { NASDAQ: 33.073425565636114, CAC40: 63.68522669833696 },
    },
    {
      timestamp: 1577205027006,
      index: 15,
      stocks: { NASDAQ: 33.06895342921482, CAC40: 46.029524704391044 },
    },
    {
      timestamp: 1577205028007,
      index: 16,
      stocks: { NASDAQ: 51.96495250880295, CAC40: 46.029524704084196 },
    },
    {
      timestamp: 1577205029008,
      index: 17,
      stocks: { NASDAQ: 60.48395695643411, CAC40: 19.981267480499998 },
    },
  ],
  last: {
    timestamp: 1577205029008,
    index: 19,
    stocks: { NASDAQ: 60.48395695643412, CAC40: 19.981267480491 },
  },
};

// dirty hack to handle unhandled values returned by the API
// Like 4.0330219586014976e-84 ...
const formatNumber = nbr => {
  const magicSlice = 5;
  const [n1, n2] = String(nbr).split('.');
  return Number(Number(`${n1}.${n2.slice(0, magicSlice)}`).toFixed(2));
};

export const records = data.items.map(({ stocks, index }) => ({
  id: index,
  NASDAQ: formatNumber(stocks.NASDAQ),
  CAC40: formatNumber(stocks.CAC40),
}));
