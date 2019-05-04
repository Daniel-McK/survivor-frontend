import { find, forEach, get, keys, map, set, uniq } from 'lodash';
import { Point, Contestant } from '../models/types';
import { ChartData } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
import { DataByContestant } from '../models/graphs';

export function getChartData(contestants: Contestant[], points: Point[]): ChartData<chartjs.ChartData> {
  const episodeIds = getEpisodeIds(points);
  const dataByContestant: DataByContestant = {};

  forEach(points, (point: Point) => {
    const previousValue = get(dataByContestant, [point.contestantId, point.episodeId], 0);
    set(dataByContestant, [point.contestantId, point.episodeId], previousValue + point.pointType.value);
  });

  const datasets: chartjs.ChartDataSets[] = [];

  forEach(keys(dataByContestant), (contestantId, index) => {
    let sum = 0;

    const data = [];
    for (const episodeId of episodeIds) {
      sum += get(dataByContestant, [contestantId, episodeId], 0);
      data.push(sum);
    }

    datasets.push({
      label: find(contestants, { id: contestantId }).name,
      data,
      borderColor: COLOURS[index],
      pointBackgroundColor: COLOURS[index],
      backgroundColor: 'transparent'
    });
  });

  return {
    datasets,
    labels: map(episodeIds, getEpisodeName)
  };
}

function getEpisodeName(episodeId: string) {
  return `Episode ${episodeId.split('-')[1]}`;
}

function getEpisodeIds(points: Point[]) {
  return ['ep-0', ...uniq(map(points, point => point.episodeId)).sort((a, b) => {
    // sort the episode IDs numerically by episode number, not string comparison
    return parseInt(a.substring(3)) - parseInt(b.substring(3));
  })];
}

const COLOURS = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
  '#fabebe',
  '#008080',
  '#e6beff',
  '#9a6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#808080',
  '#ffffff',
  '#000000'
];
