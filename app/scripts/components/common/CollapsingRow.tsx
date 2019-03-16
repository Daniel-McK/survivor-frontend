import styled from 'react-emotion';
import { SMALL_SCREEN } from '../../../styles/responsive';

const CollapsingRow = styled('div')`
display: flex;
padding-top: 16px;
align-items: flex-start;
${SMALL_SCREEN} {
  flex-direction: column;
  align-items: center;
}
`;

export default CollapsingRow;