import * as React from 'react';
import { Header } from './Header';
import styled from 'react-emotion';
import { AppTab } from '../../models/structure';
import Contestants from '../contestants/Contestants';
import { connect } from 'react-redux';
import { Contestant, Point, User } from '../../models/types';
import { ReduxState } from '../../store';
import { Users } from '../users/Users';
import { Dispatch } from 'redux';
import { loadAllContent } from '../../store/async/data';
import { PointsByEpisodeGraph } from '../graphs/PointsByEpisodeGraph';

const Scrollable = styled('div')`
  overflow-y: auto;
`;

const Main = styled('main')``;

interface AppProps {
  // redux state
  contestants?: Contestant[];
  points?: Point[];
  users?: User[];
  initialized?: boolean;

  // redux actions
  dispatch?: Dispatch;
}

const App: React.SFC<AppProps> = props => {
  const [selectedTab, setSelectedTab] = React.useState(AppTab.Contestants);
  React.useEffect(() => {
    loadAllContent(props.dispatch);
  }, []);
  return (
    <Main>
      <Header onTabChange={setSelectedTab} selectedTab={selectedTab} loading={!props.initialized} />
      {props.initialized && (
        <Scrollable>
          {selectedTab === AppTab.Users && <Users users={props.users} />}
          {selectedTab === AppTab.Contestants && <Contestants contestants={props.contestants} users={props.users} />}
          {selectedTab === AppTab.Graph && (
            <PointsByEpisodeGraph points={props.points} users={props.users} contestants={props.contestants} />
          )}
        </Scrollable>
      )}
    </Main>
  );
};

function mapStateToProps(state: ReduxState) {
  return {
    contestants: state.contestants,
    points: state.points,
    users: state.users,
    initialized: state.app.initialized
  };
}

export default connect(mapStateToProps)(App);
