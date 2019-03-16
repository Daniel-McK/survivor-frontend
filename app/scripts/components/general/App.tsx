import * as React from 'react';
import { isEmpty } from 'lodash';
import { Header } from './Header';
import styled from 'react-emotion';
import { AppTab } from '../../models/structure';
import Contestants from '../contestants/Contestants';
import { connect } from 'react-redux';
import { DDBPoint, Contestant, Point, User } from '../../models/types';
import { createLoadPointsAction } from '../../store/actions/points';
import { getPoints, getContestants, getUsers } from '../../api/api-gateway';
import {
  createLoadContestantsAction,
  createRankContestantsAction
} from '../../store/actions/contestants';
import { ReduxState } from '../../store';
import { createLoadUsersAction } from '../../store/actions/users';
import { Users } from '../users/Users';

const Scrollable = styled('div')`
  overflow-y: auto;
`;

interface AppProps {
  // redux state
  contestants?: Contestant[];
  points?: Point[];
  users?: User[];

  // redux actions
  loadPoints?: (points: DDBPoint[]) => void;
  loadContestants?: (contestants: Contestant[]) => void;
  loadUsers?: (users: User[]) => void;
  rankContestants?: (contestants: Contestant[], points: Point[]) => void;
}

interface AppState {
  selectedTab: AppTab;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      selectedTab: AppTab.Contestants
    };
  }

  public componentDidMount() {
    this.fetchContestants();
    this.fetchPoints();
    this.fetchUsers();
  }

  public componentWillReceiveProps(newProps: AppProps) {
    if (!this.hasLoaded(this.props) && this.hasLoaded(newProps)) {
      this.props.rankContestants(newProps.contestants, newProps.points);
    }
  }

  public render() {
    return (
      <main>
        <Header
          onTabChange={this.updateSelectedTab}
          selectedTab={this.state.selectedTab}
        />
        <Scrollable>{this.renderMain()}</Scrollable>
      </main>
    );
  }

  private renderMain = () => {
    switch (this.state.selectedTab) {
      // case AppTab.Episodes:
      //   return <Episodes />;
      case AppTab.Users:
        return <Users users={this.props.users} />;
      case AppTab.Contestants:
      default:
        return (
          <Contestants
            contestants={this.props.contestants}
            users={this.props.users}
          />
        );
    }
  };

  private updateSelectedTab = (selectedTab: AppTab) => {
    this.setState({
      selectedTab
    });
  };

  private fetchPoints = async () => {
    const response = await getPoints('season-38');
    this.props.loadPoints(response.data);
  };

  private fetchContestants = async () => {
    const response = await getContestants('season-38');
    this.props.loadContestants(response.data);
  };

  private fetchUsers = async () => {
    const response = await getUsers();
    this.props.loadUsers(response.data);
  };

  private hasLoaded = (props: AppProps) => {
    return (
      !isEmpty(props.contestants) &&
      !isEmpty(props.points) &&
      !isEmpty(props.users)
    );
  };
}

function mapStateToProps(state: ReduxState) {
  return {
    contestants: state.contestants,
    points: state.points,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadContestants: (contestants: Contestant[]) =>
      dispatch(createLoadContestantsAction(contestants)),
    loadPoints: (points: DDBPoint[]) =>
      dispatch(createLoadPointsAction(points)),
    loadUsers: (users: User[]) => dispatch(createLoadUsersAction(users)),
    rankContestants: (contestants: Contestant[], points: Point[]) =>
      dispatch(createRankContestantsAction(contestants, points))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
