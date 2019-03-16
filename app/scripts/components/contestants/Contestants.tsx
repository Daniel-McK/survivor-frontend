import * as React from 'react';
import PhotoList from './PhotoList';
import styled from '../../../../node_modules/react-emotion';
import { Contestant, User } from '../../models/types';
import ContestantProfile from './ContestantProfile';

interface ContestantsProps {
  contestants?: Contestant[];
  users?: User[];
}

const MainWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Contestants: React.SFC<ContestantsProps> = props => {
  const [activeContestant, setActiveContestant] = React.useState<Contestant>(null);
  const { contestants, users } = props;
  return (
    <MainWrapper>
      <PhotoList
        options={contestants || []}
        onClick={setActiveContestant}
        active={activeContestant}
      />
      {activeContestant ? (
        <ContestantProfile contestant={activeContestant} users={users} />
      ) : (
        'Select a contestant!'
      )}
    </MainWrapper>
  );
};

export default Contestants;
