const weightedMean = (arrValues, arrWeights) => {
  const result = arrValues
    .map((value, i) => {
      const weight = arrWeights[i]
      const sum = value * weight
      return [sum, weight]
    })
    .reduce((p, c) => [p[0] + c[0], p[1] + c[1]], [0, 0])

  return result[0] / result[1]
}

const calcPctChange = (data) => {
  data.forEach((sector, i) => {
    const industryValues = []
    sector.children.forEach((industry, j) => {
      const stonkPctChanges = []
      const stonkValues = industry.children.map((stonk) => stonk.value)
      const stonkWeights = []
      let sum = 0

      stonkValues.map((val) => (sum += val))
      industryValues.push(sum)

      industry.children.map((stonk) => {
        stonkPctChanges.push(parseFloat(stonk['pctChange']))
        stonkWeights.push(parseFloat(stonk['value']) / sum)
      })

      sector.children[j].pctChange = weightedMean(stonkPctChanges, stonkWeights)
    })

    const industryPctChanges = []
    const industryWeights = []
    let sum = 0
    industryValues.map((val) => (sum += val))
    for (let k = 0; k < sector.children.length; k++) {
      industryPctChanges.push(parseFloat(sector.children[k]['pctChange']))
      industryWeights.push(parseFloat(industryValues[k]) / sum)
    }
    data[i].pctChange = weightedMean(industryPctChanges, industryWeights)
  })
  return data
}

const convertToPositiveFloat = (number) => {
  return 0.5 + Math.abs(number) / 100
}

const formatCurrency = (value) => {
  /* 12 zeros for Trillions */
  return Math.abs(Number(value)) >= 1.0e12
    ? (Math.abs(Number(value)) / 1.0e12).toFixed(2) + 'T'
    : /* 9 zeros for Billions */
    Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
    : /* 6 zeros for Millions */
    Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
    : /* 3 zeros for Thousands */
    Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(value))
}

export { calcPctChange, convertToPositiveFloat, formatCurrency }
