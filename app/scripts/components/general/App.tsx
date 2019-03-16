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

const Scrollable = styled('div')`
  overflow-y: auto;
`;

interface AppProps {
  // redux state
  contestants?: Contestant[];
  points?: Point[];
  users?: User[];

  // redux actions
  dispatch?: Dispatch;
}

const App: React.SFC<AppProps> = props => {
  const [selectedTab, setSelectedTab] = React.useState(AppTab.Contestants);
  React.useEffect(() => {
    loadAllContent(props.dispatch);
  }, []);
  return (
    <main>
      <Header
        onTabChange={setSelectedTab}
        selectedTab={selectedTab}
      />
      <Scrollable>
        {selectedTab === AppTab.Users && <Users users={props.users} />}
        {selectedTab === AppTab.Contestants && (
          <Contestants
            contestants={props.contestants}
            users={props.users}
          />
        )}
      </Scrollable>
    </main>
  );
};

function mapStateToProps(state: ReduxState) {
  return {
    contestants: state.contestants,
    points: state.points,
    users: state.users
  };
}

export default connect(mapStateToProps)(App);
