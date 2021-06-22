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
		sector.children.forEach((industry, j)=>{
			//console.log(industry)
			const stonkPctChanges = []
			const stonkValues =  industry.children.map(stonk => stonk.value)
			const stonkWeights = []
			let sum = 0
			
			stonkValues.map(val => sum += val)
			industryValues.push(sum)
			
			industry.children.map(stonk => {
				stonkPctChanges.push(parseFloat(stonk["pctChange"]))
				stonkWeights.push(parseFloat(stonk["value"])/sum)		
			})
			
			sector.children[j].pctChange = weightedMean(stonkPctChanges, stonkWeights)
		})
		
		const industryPctChanges = []
		const industryWeights = []
		let sum = 0
		industryValues.map(val => sum+=val)
		for(let k = 0; k < sector.children.length; k++){
			industryPctChanges.push(parseFloat(sector.children[k]["pctChange"]))
			industryWeights.push(parseFloat(industryValues[k])/sum)
		}
		data[i].pctChange = weightedMean(industryPctChanges, industryWeights)
	})
	console.log(data)
	return data
}

export {calcPctChange}

export const convertToPositiveFloat = (number) => {
	return .5 + Math.abs(number) / 100
}