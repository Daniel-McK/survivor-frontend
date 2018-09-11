import './Main.scss';
import * as React from 'react';
import { getContestants } from '../../api/api-gateway';
import { List } from '../list/List';

interface MainState {
  activeContestant?: any;
  contestants: any[];
}

export class Main extends React.Component<{}, MainState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      activeContestant: null,
      contestants: []
    };
  }

  public componentDidMount() {
    this.getContestants();
  }

  public render() {
    const { activeContestant, contestants } = this.state;
    return (
      <div className="main-component">
        <List
          displayProperty="name"
          options={contestants || []}
          onClick={this.setActive}
          active={activeContestant}
        />
      </div>
    );
  }

  private setActive = (contestant) => {
    this.setState({
      activeContestant: contestant
    })
  }

  private async getContestants() {
    const response = await getContestants('season-37');
    this.setState({
      contestants: response.data
    });
  }
}