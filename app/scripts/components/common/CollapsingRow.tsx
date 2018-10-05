import * as React from 'react';
import styled from 'react-emotion';
import { SMALL_SCREEN } from '../../../styles/responsive';

const CollapsingRow = styled('div')`
display: flex;
padding-top: 16px;
${SMALL_SCREEN} {
  flex-direction: column;
  align-items: center;
}
`;

export default CollapsingRow;