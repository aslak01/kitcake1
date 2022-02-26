import * as yootils from 'yootils'

const genPolygon = (d) => {
  const points = new Array(12)
  for (let i = 0; i < points.length; i++) {
    let x
    let y
    switch (i) {
      case 0 /* Point 1 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.1
        y = d.open <= d.close ? d.open : d.close
        points[i] = { x, y }
        break
      case 1 /* Point 2 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.1
        y = d.open <= d.close ? d.close : d.open
        points[i] = { x, y }
        break
      case 2 /* Point 3 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.4
        y = d.open <= d.close ? d.close : d.open
        points[i] = { x, y }
        break
      case 3 /* Point 4 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.4
        y = d.high
        points[i] = { x, y }
        break
      case 4 /* Point 5 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.6
        y = d.high
        points[i] = { x, y }
        break
      case 5 /* Point 6 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.6
        y = d.open <= d.close ? d.close : d.open
        points[i] = { x, y }
        break
      case 6 /* Point 7 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.9
        y = d.open <= d.close ? d.close : d.open
        points[i] = { x, y }
        break
      case 7 /* Point 8 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.9
        y = d.open <= d.close ? d.open : d.close
        points[i] = { x, y }
        break
      case 8 /* Point 9 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.6
        y = d.open <= d.close ? d.open : d.close
        points[i] = { x, y }
        break
      case 9 /* Point 10 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.6
        y = d.low
        points[i] = { x, y }
        break
      case 10 /* Point 11 */:
        x = d.openTimeInMillis + d.sizeInMillis * 0.4
        y = d.low
        points[i] = { x, y }
        break
      default:
        /* Point 12 */
        x = d.openTimeInMillis + d.sizeInMillis * 0.4
        y = d.open <= d.close ? d.open : d.close
        points[i] = { x, y }
    }
  }
  //console.log(points)
  return points
}

const filterUnwanted = (arr) => {
  const required = arr.filter((el) => {
    return el && el.open && el.close && el.low && el.high
  })
  console.log(required.length)
  return required
}
const formatBase = (value) => {
  return yootils.commas(value.toFixed(2))
}

export { genPolygon, filterUnwanted, formatBase }
