function ema(inReal, inTimePeriod, k1) {
  var outReal = new Array(inReal.length).fill(0.0);

  var lookbackTotal = inTimePeriod - 1;
  var startIdx = lookbackTotal;
  var today = startIdx - lookbackTotal;
  var i = inTimePeriod;
  var tempReal = 0.0;
  while (i > 0) {
    tempReal += inReal[today];
    today++;
    i--;
  }

  var prevMA = tempReal / inTimePeriod;

  while (today <= startIdx) {
    prevMA = (inReal[today] - prevMA) * k1 + prevMA;
    today++;
  }
  outReal[startIdx] = prevMA;
  var outIdx = startIdx + 1;
  while (today < inReal.length) {
    prevMA = (inReal[today] - prevMA) * k1 + prevMA;
    outReal[outIdx] = prevMA;
    today++;
    outIdx++;
  }
  return outReal;
}

const Ema = (inReal, inTimePeriod) => {
  let k = 2.0 / parseFloat(inTimePeriod + 1);
  return ema(inReal, inTimePeriod, k);
};

export { Ema };
