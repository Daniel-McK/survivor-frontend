import * as React from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import styled from 'react-emotion';
import { AppTab } from "../../models/structure";

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface AppState {
  selectedTab: AppTab
}

export default class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedTab: AppTab.Contestants
    }
  }

  public render() {
    return (
      <AppWrapper>
        <Header onTabChange={this.updateSelectedTab} selectedTab={this.state.selectedTab} />
        <Main />
      </AppWrapper>
    );
  }

  private updateSelectedTab = (selectedTab: AppTab) => {
    this.setState({
      selectedTab
    });
  }
}
