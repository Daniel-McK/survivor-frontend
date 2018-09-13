import * as React from "react";
import { Header } from "./Header";
import styled from "react-emotion";
import { AppTab } from "../../models/structure";
import { Contestants } from "../contestants/Contestants";
import { Episodes } from "../episodes/Episodes";

const AppWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface AppState {
  selectedTab: AppTab;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedTab: AppTab.Contestants
    };
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
}
