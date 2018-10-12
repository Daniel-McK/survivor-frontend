import * as React from 'react';
import PhotoList from './PhotoList';
import styled from '../../../../node_modules/react-emotion';
import { Contestant, User } from '../../models/types';
import ContestantProfile from './ContestantProfile';

interface ContestantsProps {
  contestants?: Contestant[];
  users?: User[];
}

interface ContestantsState {
  activeContestant?: Contestant;
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default class Contestants extends React.Component<ContestantsProps, ContestantsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeContestant: null
    };
  }

  public render() {
    const { activeContestant } = this.state;
    const { contestants, users } = this.props;
    return (
      <MainWrapper>
        <PhotoList
          options={contestants || []}
          onClick={this.setActive}
          active={activeContestant}
        />
        {activeContestant ? (
          <ContestantProfile contestant={activeContestant} users={users} />
        ) : (
          'Select a contestant!'
        )}
      </MainWrapper>
    );
  }

  private setActive = contestant => {
    this.setState({
      activeContestant: contestant
    });
  };
}
