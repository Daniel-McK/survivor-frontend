import * as React from 'react';
import PhotoList from './PhotoList';
import styled from '../../../../node_modules/react-emotion';
import { Contestant, User } from '../../models/types';
import ContestantProfile from './ContestantProfile';
import { Swipeable } from 'react-swipeable';

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
  const { contestants, users } = props;
  const [activeContestant, setActiveContestant] = React.useState<Contestant>(
    contestants.length > 0 ? contestants[0] : null
  );

  const onSwipedLeft = () => {
    const position = contestants.indexOf(activeContestant);
    if (position >= 0 && position < contestants.length - 1) {
      setActiveContestant(contestants[position + 1]);
    }
  };

  const onSwipedRight = () => {
    const position = contestants.indexOf(activeContestant);
    if (position > 0 && position <= contestants.length - 1) {
      setActiveContestant(contestants[position - 1]);
    }
  };

  return (
    <MainWrapper>
      <PhotoList options={contestants || []} onClick={setActiveContestant} active={activeContestant} />
      {activeContestant ? (
        <Swipeable onSwipedLeft={onSwipedLeft} onSwipedRight={onSwipedRight}>
          <ContestantProfile contestant={activeContestant} users={users} />
        </Swipeable>
      ) : (
        'Select a contestant!'
      )}
    </MainWrapper>
  );
};

export default Contestants;
