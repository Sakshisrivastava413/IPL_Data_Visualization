export const TEAM_COLOR = [
  '',
  '#C7A9F9',
  '#F2C5A6',
  '#E9B1F0',
  '#F5E6AC',
  '#F2A9A9',
  '#D3F0A3',
  '#FFB8D2',
  '#9FF1DC',
  '#BF9898',
  '#569BEE',
  '#A8D0FF',
  '#F3D2A3',
  '#889EFF',
];

export const BUBBLE_CHART_TEAM_COLOR = [
  '#9067D5',
  '#D88E5B',
  '#E9B1F0',
  '#4A6D97',
  '#CC62D9',
  '#D95353',
  '#A1D350',
  '#CE4C7C',
  '#46C6A5',
  '#816363',
  '#3D8AE7',
  '#E19E40',
  '#6D6D6D',
];

export const VENUE_COLOR = [
  '#F5B7B1',
  '#D2B4DE',
  '#F9E79F',
  '#D5DBDB',
  '#AED6F1',
  '#EDBB99',
  '#A3E4D7',
  '#E2F5CC',
  '#EECCF5',
  '#FEA5A5',
];

export function hexToRgbString(hex, alpha = 1) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
}
