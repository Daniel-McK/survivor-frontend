import * as React from 'react';
import { getContestants } from '../../api/api-gateway';
import { List } from '../list/List';
import styled from '../../../../node_modules/react-emotion';
import { Contestant } from '../../models/types';
import ContestantProfile from './ContestantProfile';

interface ContestantsState {
  activeContestant?: Contestant;
  contestants: Contestant[];
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export class Contestants extends React.Component<{}, ContestantsState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      activeContestant: null,
      contestants: []
    };
  }

  public componentDidMount() {
    this.getContestants();
  }

  public render() {
    const { activeContestant, contestants } = this.state;
    return (
      <MainWrapper>
        <List
          displayProperty="name"
          options={contestants || []}
          onClick={this.setActive}
          active={activeContestant}
        />
        {activeContestant
          ? <ContestantProfile contestant={activeContestant} />
          : 'Select a contestant!'}
      </MainWrapper>
    );
  }

  private setActive = (contestant) => {
    this.setState({
      activeContestant: contestant
    });
  }

  private async getContestants() {
    const response = await getContestants('season-37');
    this.setState({
      contestants: response.data
    });
  }
}