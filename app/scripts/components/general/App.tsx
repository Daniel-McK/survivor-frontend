import * as React from 'react';
import { Header } from './Header';
import styled from 'react-emotion';
import { AppTab } from '../../models/structure';
import { Contestants } from '../contestants/Contestants';
import { Episodes } from '../episodes/Episodes';
import { connect } from 'react-redux';
import { DDBPoint } from '../../models/types';
import { createLoadPointsAction } from '../../store/actions/points';
import { getPoints } from '../../api/api-gateway';

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface AppProps {
  // redux actions
  loadPoints?: (points: DDBPoint[]) => void;
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
        return <Contestants />;
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
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loadPoints: (points: DDBPoint[]) => dispatch(createLoadPointsAction(points))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);