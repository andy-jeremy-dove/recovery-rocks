import {Anniversary, AnniversaryId} from './TheWholeDump';

export const thirtiethDay: Anniversary = {
  id: '1' as AnniversaryId,
  value: 29,
  unit: 'day',
  periodic: false,
};

export const sixtiethDay: Anniversary = {
  id: '2' as AnniversaryId,
  value: 59,
  unit: 'day',
  periodic: false,
};

export const ninetiethDay: Anniversary = {
  id: '3' as AnniversaryId,
  value: 89,
  unit: 'day',
  periodic: false,
};

export const sixMonths: Anniversary = {
  id: '4' as AnniversaryId,
  value: 6,
  unit: 'month',
  periodic: false,
};

export const nineMonths: Anniversary = {
  id: '5' as AnniversaryId,
  value: 9,
  unit: 'month',
  periodic: false,
};

export const eighteenMonths: Anniversary = {
  id: '6' as AnniversaryId,
  value: 18,
  unit: 'month',
  periodic: false,
};

export const oneYear: Anniversary = {
  id: '7' as AnniversaryId,
  value: 1,
  unit: 'year',
  periodic: true,
};

export const anniversaries: Anniversary[] = [
  thirtiethDay,
  sixtiethDay,
  ninetiethDay,
  sixMonths,
  nineMonths,
  eighteenMonths,
  oneYear,
];
