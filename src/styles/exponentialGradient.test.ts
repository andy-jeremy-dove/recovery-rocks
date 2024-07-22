import {expect, it} from '@jest/globals';

import exponentialGradient from './exponentialGradient';

it('obeys invariants', () => {
  const fromColor = '#0068C8';
  const fromOpacity = 1;
  const toColor = '#263379';
  const toOpacity = 1;
  const interimPoints = 3;
  const gradient = exponentialGradient(
    fromColor,
    fromOpacity,
    toColor,
    toOpacity,
    0.7,
    interimPoints,
  );
  expect(gradient.length).toBe(2 + interimPoints);
  const first = gradient[0];
  const last = gradient[gradient.length - 1];
  expect(first.color).toBe(fromColor);
  expect(first.offset).toBe(0);
  expect(first.opacity).toBe(fromOpacity);
  expect(last.color).toBe(toColor);
  expect(last.offset).toBe(1);
  expect(last.opacity).toBe(toOpacity);
});

it('computes exponential gradient of 3 interim points', () => {
  const gradient = exponentialGradient('#0068C8', 1, '#263379', 0, 0.7, 3);
  expect(gradient).toMatchSnapshot();
});

it('computes exponential gradient of 2 interim points', () => {
  const gradient = exponentialGradient('#0068C8', 1, '#263379', 0, 0.65, 2);
  expect(gradient).toMatchSnapshot();
});
