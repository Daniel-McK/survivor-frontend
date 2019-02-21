import * as React from 'react';
import { getEpisodes } from '../../api/api-gateway';
import styled from '../../../../node_modules/react-emotion';
import { map } from 'lodash';

interface EpisodesState {
  activeEpisode?: any;
  episodes: any[];
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
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
        {map(episodes, (episode) => episode.name)}
      </MainWrapper>
    );
  }

  private setActive = (episode) => {
    this.setState({
      activeEpisode: episode
    });
  }

  private async getUsers() {
    const response = await getEpisodes('season-38');
    this.setState({
      episodes: response.data
    });
  }
}