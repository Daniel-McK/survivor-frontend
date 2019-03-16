import * as React from 'react';
import styled from 'react-emotion';
import { getPlaceTextFromRank } from '../../utils/format';
import { User } from '../../models/types';

const ProfileCardWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: white;
  overflow: hidden;
  align-items: center;
  margin: 0 16px 16px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

const ProfilePic = styled('img')`
  height: 250px;
`;

const ProfileLabel = styled('div')`
  padding-top: 10px;
  font-size: 1.2rem;

  &:last-child {
    padding-bottom: 10px;
  }
`;

interface ProfileCardProps {
  imageUrl?: string;
  name: string;
  rank?: number;
  totalPoints?: number;
  user?: User;
  additionalInfo?: string;
}

const ProfileCard: React.StatelessComponent<ProfileCardProps> = (props) => {
  const { additionalInfo, imageUrl, name, rank, totalPoints, user } = props;
  return (
    <ProfileCardWrapper>
      <ProfilePic src={imageUrl} alt={name} />
      <ProfileLabel>{name}</ProfileLabel>
      <ProfileLabel>{getPlaceTextFromRank(rank)}</ProfileLabel>
      <ProfileLabel>{totalPoints || 0} points</ProfileLabel>
      {user && <ProfileLabel>{user.firstName} {user.lastName}</ProfileLabel>}
      {additionalInfo && <ProfileLabel>{additionalInfo}</ProfileLabel>}
    </ProfileCardWrapper>
  );
};

export default ProfileCard;
