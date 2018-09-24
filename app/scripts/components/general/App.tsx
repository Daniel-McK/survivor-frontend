import * as React from 'react';
import { isEmpty } from 'lodash';
import { Header } from './Header';
import styled from 'react-emotion';
import { AppTab } from '../../models/structure';
import Contestants from '../contestants/Contestants';
import { Episodes } from '../episodes/Episodes';
import { connect } from 'react-redux';
import { DDBPoint, Contestant, Point } from '../../models/types';
import { createLoadPointsAction } from '../../store/actions/points';
import { getPoints, getContestants } from '../../api/api-gateway';
import {
  createLoadContestantsAction,
  createRankContestantsAction
} from '../../store/actions/contestants';
import { ReduxState } from '../../store';

const Scrollable = styled('div')`
  overflow-y: auto;
`;

interface AppProps {
  // redux state
  contestants?: Contestant[];
  points?: Point[];

  // redux actions
  loadPoints?: (points: DDBPoint[]) => void;
  loadContestants?: (contestants: Contestant[]) => void;
  rankContestants?: (point: Point[]) => void;
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
  }

  public componentWillReceiveProps(newProps: AppProps) {
    if (!this.hasLoaded(this.props) && this.hasLoaded(newProps)) {
      this.props.rankContestants(newProps.points);
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
      case AppTab.Episodes:
        return <Episodes />;
      case AppTab.Contestants:
      default:
        return <Contestants contestants={this.props.contestants} />;
    }
  };

  private updateSelectedTab = (selectedTab: AppTab) => {
    this.setState({
      selectedTab
    });
  };

  private fetchPoints = async () => {
    const response = await getPoints('season-37');
    this.props.loadPoints(response.data);
  };

  private fetchContestants = async () => {
    const response = await getContestants('season-37');
    this.props.loadContestants(response.data);
  };

  private hasLoaded = (props: AppProps) => {
    return !isEmpty(props.contestants) && !isEmpty(props.points);
  };
}

function mapStateToProps(state: ReduxState) {
  return {
    contestants: state.contestants,
    points: state.points
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadContestants: (contestants: Contestant[]) =>
      dispatch(createLoadContestantsAction(contestants)),
    loadPoints: (points: DDBPoint[]) =>
      dispatch(createLoadPointsAction(points)),
    rankContestants: (points: Point[]) =>
      dispatch(createRankContestantsAction(points))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
