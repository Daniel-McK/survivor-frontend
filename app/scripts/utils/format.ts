const SUFFIX_EXCEPTIONS = {
  11: 'th',
  12: 'th',
  13: 'th'
};

export function getPlaceTextFromRank(rank: number) {
  let suffix = '';
  if (SUFFIX_EXCEPTIONS[rank]) {
    suffix = SUFFIX_EXCEPTIONS[rank];
  } else {
    const lastDigit = rank % 10;
    switch (lastDigit) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }

  return `${rank}${suffix} place`;
}
