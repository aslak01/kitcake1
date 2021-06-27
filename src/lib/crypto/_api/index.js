import querystring from 'querystring';

const stringifyPayload = (config) => {
  const params = querystring.stringify(config.params);
  return params ? `?${params}` : '';
};

const mapCandle = (payload, sizeInMillis, pair) => {
  const [time, low, high, open, close, volume] = payload;
  const [base, counter] = pair.split('-');
  const openTimeInMillis = time * 1000;
  return {
    base,
    close,
    counter,
    high,
    low,
    open,
    openTimeInISO: new Date(openTimeInMillis).toISOString(),
    openTimeInMillis,
    productId: pair,
    sizeInMillis,
    volume
  };
};

const getBucketsInMillis = (fromInMillis, toInMillis, candleSizeInMillis) => {
  const bucketsInMillis = [];
  const MAXIMUM_HISTORIC_DATA_POINTS = 300;

  const batch = MAXIMUM_HISTORIC_DATA_POINTS * candleSizeInMillis;

  let current = fromInMillis;
  bucketsInMillis.push(current);
  current = current + batch;

  while (current < toInMillis) {
    bucketsInMillis.push(current - 1);
    bucketsInMillis.push(current);
    current = current + batch;
  }

  bucketsInMillis.push(toInMillis);
  return bucketsInMillis;
};

const getBucketsInISO = (bucketsInMillis) => {
  const bucketsInISO = [];

  for (let i = 0; i < bucketsInMillis.length - 1; i += 2) {
    const start = new Date(bucketsInMillis[i]).toISOString();
    const stop = new Date(bucketsInMillis[i + 1]).toISOString();
    bucketsInISO.push({
      start,
      stop
    });
  }

  return bucketsInISO;
};

const getFetch = async (resource, params) => {
  const baseUrl = 'https://api.pro.coinbase.com';
  if (params) {
    const res = await fetch(`${baseUrl}${resource}${stringifyPayload(params)}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'User-Agent': 'coinbase-pro-node-client',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
    return res.json();
  } else {
    const res = await fetch(`${baseUrl}${resource}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'User-Agent': 'coinbase-pro-node-client',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
    return res.json();
  }
};

const getCandles = async (pair, params) => {
  /* const candleGranularity = {
    ONE_MINUTE: 60,
    FIVE_MINUTES: 300,
    FIFTEEN_MINUTES: 900,
    ONE_HOUR: 3600,
    SIX_HOURS: 21600,
    ONE_DAY: 86400
  } */
  const resource = `/products/${pair}/candles`;
  const candleSizeInMillis = params.granularity * 1000;
  const { end, start } = params;
  let rawCandles = [];

  if (start && end) {
    const fromInMillis = new Date(start).getTime();
    const toInMillis = new Date(end).getTime();

    const bucketsInMillis = getBucketsInMillis(fromInMillis, toInMillis, candleSizeInMillis);
    const bucketsInISO = getBucketsInISO(bucketsInMillis);

    for (let index = 0; index < bucketsInISO.length; index++) {
      const bucket = bucketsInISO[index];
      const res = await getFetch(resource, {
        params: {
          end: bucket.stop,
          granularity: params.granularity,
          start: bucket.start
        }
      });
      rawCandles.push(...res.data);
    }
  } else {
    const res = await getFetch(resource, { params });
    rawCandles = res;
  }

  return rawCandles
    .map((candle) => mapCandle(candle, candleSizeInMillis, pair))
    .sort((a, b) => a.openTimeInMillis - b.openTimeInMillis);
};

const getPairs = async () => {
  const resource = `/products`;
  const res = await getFetch(resource);
  return res.map((product) => product.id).sort();
};

export { getCandles, getPairs };
