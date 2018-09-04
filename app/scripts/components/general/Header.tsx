import * as React from 'react';
import './Header.scss';


export class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="app-header">
        <h1 className="app-header__title">Fantasy Survivor</h1>
      </div>
    );
  }
}