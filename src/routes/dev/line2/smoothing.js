// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

import { conditionalRound } from './utils.js';

const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointB[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  };
};

const controlPoint = (current, previous, next, reverse, smoothing) => {
  const p = previous || current;
  const n = next || current;

  const o = line(p, n);

  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;

  const x = conditionalRound(current[0] + Math.cos(angle) * length);
  const y = conditionalRound(current[1] + Math.sin(angle) * length);

  return [x, y];
};

export const bezierCommand = (point, i, a, smoothing) => {
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false, smoothing);
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true, smoothing);

  return `C ${cpsX}, ${cpsY} ${cpeX}, ${cpeY} ${point[0]}, ${point[1]}`;
};

export const svgPath = (points, command, smoothing) => {
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${command(point, i, a, smoothing)}`,
    ''
  );
  return d;
};
