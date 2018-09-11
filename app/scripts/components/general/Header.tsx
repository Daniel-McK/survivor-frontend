import * as React from 'react';
import styled from 'react-emotion';
import theme from '../../../styles/theme';

const HeaderWrapper = styled('div')`
  background-color: ${theme.color.primary};
  color: ${theme.color.primaryFont};
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin: 0;
    padding: 15px 0 10px;
  }
`;

export class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <HeaderWrapper>
        <h1>Fantasy Survivor</h1>
      </HeaderWrapper>
    );
  }
}