import * as React from 'react';
import { Header } from './Header';
import styled from 'react-emotion';
import { AppTab } from '../../models/structure';
import Contestants from '../contestants/Contestants';
import { Episodes } from '../episodes/Episodes';
import { connect } from 'react-redux';
import { DDBPoint, Contestant } from '../../models/types';
import { createLoadPointsAction } from '../../store/actions/points';
import { getPoints, getContestants } from '../../api/api-gateway';
import { createLoadContestantsAction } from '../../store/actions/contestants';
import { ReduxState } from '../../store';

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface AppProps {
  // redux state
  contestants?: Contestant[];

  // redux actions
  loadPoints?: (points: DDBPoint[]) => void;
  loadContestants?: (contestants: Contestant[]) => void;
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

  public render() {
    return (
      <AppWrapper>
        <Header
          onTabChange={this.updateSelectedTab}
          selectedTab={this.state.selectedTab}
        />
        {this.renderMain()}
      </AppWrapper>
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
}

function mapStateToProps(state: ReduxState) {
  return {
    contestants: state.contestants
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadContestants: (contestants: Contestant[]) => dispatch(createLoadContestantsAction(contestants)),
    loadPoints: (points: DDBPoint[]) => dispatch(createLoadPointsAction(points))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);