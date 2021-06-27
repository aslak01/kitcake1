import { getCandles, getPairs } from '$lib/crypto/_api';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params, query }) {
  let { tradingPair } = params;
  let granularity = query.get('granularity');
  let pairs = await getPairs();
  let data = await getCandles(tradingPair, { granularity: granularity });

  if (data && pairs) {
    return {
      body: {
        data,
        pairs
      }
    };
  }
}
