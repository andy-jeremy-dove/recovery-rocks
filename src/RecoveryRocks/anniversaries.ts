import type {Anniversary, AnniversaryId} from './TheWholeDump';

export const thirtiethDay = {
  id: '1' as AnniversaryId,
  value: 29,
  unit: 'day',
  periodic: false,
} satisfies Anniversary;

export const sixtiethDay = {
  id: '2' as AnniversaryId,
  value: 59,
  unit: 'day',
  periodic: false,
} satisfies Anniversary;

export const ninetiethDay = {
  id: '3' as AnniversaryId,
  value: 89,
  unit: 'day',
  periodic: false,
} satisfies Anniversary;

export const sixMonths = {
  id: '4' as AnniversaryId,
  value: 6,
  unit: 'month',
  periodic: false,
} satisfies Anniversary;

export const nineMonths = {
  id: '5' as AnniversaryId,
  value: 9,
  unit: 'month',
  periodic: false,
} satisfies Anniversary;

export const eighteenMonths = {
  id: '6' as AnniversaryId,
  value: 18,
  unit: 'month',
  periodic: false,
} satisfies Anniversary;

export const oneYear = {
  id: '7' as AnniversaryId,
  value: 1,
  unit: 'year',
  periodic: true,
} satisfies Anniversary;

export const anniversaries = [
  thirtiethDay,
  sixtiethDay,
  ninetiethDay,
  sixMonths,
  nineMonths,
  eighteenMonths,
  oneYear,
] satisfies Anniversary[];
