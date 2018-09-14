import * as React from 'react';
import { getEpisodes } from '../../api/api-gateway';
import { List } from '../list/List';
import styled from '../../../../node_modules/react-emotion';

interface EpisodesState {
  activeEpisode?: any;
  episodes: any[];
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
`;

export class Episodes extends React.Component<{}, EpisodesState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      activeEpisode: null,
      episodes: []
    };
  }

  public componentDidMount() {
    this.getUsers();
  }

  public render() {
    const { activeEpisode, episodes } = this.state;
    return (
      <MainWrapper>
        <List
          displayProperty="name"
          options={episodes || []}
          onClick={this.setActive}
          active={activeEpisode}
        />
      </MainWrapper>
    );
  }

  private setActive = (episode) => {
    this.setState({
      activeEpisode: episode
    });
  }

  private async getUsers() {
    const response = await getEpisodes('season-37');
    this.setState({
      episodes: response.data
    });
  }
}