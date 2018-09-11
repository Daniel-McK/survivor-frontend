import './App.scss';
import * as React from "react";
import { Header } from "./Header";
import { Main } from "./Main";

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    );
  }
}
