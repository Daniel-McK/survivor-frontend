import * as React from 'react';
import { getContestants } from '../../api/api-gateway';

interface MainState {
  contestants: any[];
}

export class Main extends React.Component<{}, MainState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      contestants: []
    };
  }

  public componentDidMount() {
    this.getContestants();
  }

  public render() {
    const { contestants } = this.state;
    return (
      <div>
        <p>Contestants</p>
        {contestants.map((contestant) => <p>{contestant.name}</p>)}
      </div>
    );
  }

  private async getContestants() {
    const response = await getContestants('season-37');
    this.setState({
      contestants: response.data
    });
  }
}