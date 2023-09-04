export default function getRussianPluralCategory(_: number) {
  if (!Number.isInteger(_)) {
    return 'other';
  }

  if (_ % 10 === 1 && _ % 100 !== 11) {
    return 'one';
  }

  if (!!fewCases[_ % 10] && !notFewCases[_ % 100]) {
    return 'few';
  }

  if (_ % 10 === 0 || !!manyCases[_ % 10] || !!manyCases[_ % 100]) {
    return 'many';
  }

  return 'other';
}

const fewCases = mapCases([2, 3, 4]);

const notFewCases = mapCases([12, 13, 14]);

const manyCases = mapCases([5, 6, 7, 8, 9, 11, 12, 13, 14]);

function mapCases(cases: number[]) {
  const result: Partial<Record<number, boolean>> = {};
  for (const _case of cases) {
    result[_case] = true;
  }
  return result;
}
