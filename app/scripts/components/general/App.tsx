import * as React from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import styled from 'react-emotion';

const AppWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <AppWrapper>
        <Header />
        <Main />
      </AppWrapper>
    );
  }
}
