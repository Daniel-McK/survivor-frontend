import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import theme from '../../../styles/theme';
import { replace } from 'lodash';
import { Contestant } from '../../models/types';

const ListScroller = styled('div')`
  overflow-x: auto;
  max-width: 100%;
`;

const ListWrapper = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 4px;
  display: flex;
  border-bottom: solid 1px #c6ddde;
`;

const ListItem = styled('li')(({ selected }: any) => `
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 4px;
  overflow: hidden;
  min-width: 100px;

  &:hover > pre {
    background-color: ${selected ? theme.color.primaryLight : '#c6ddde'}
  }
`
);

const FloatingName = styled('pre')(({ selected }: any) => `
  position: absolute;
  margin: 0;
  padding: 5px 0;
  bottom: 0;
  text-align: center;
  vertical-align: center;
  background-color: ${selected ? theme.color.primaryLight : '#F5FFFF'};
  color: ${selected ? theme.color.primaryFont : theme.color.secondaryFont};
  width: 100px;
  opacity: 0.9;
`);

const Badge = styled('div')`
  position: absolute;
  width: 50px;
  left: -13px;
  top: 2px;
  background-color: ${theme.color.primaryDark};
  color: white;
  transform: rotate(-45deg);
`;

export interface PhotoOption {
  id: string;
  rank?: number;
  imageUrl: string;
  name: string;
}

interface PhotoListProps {
  options: PhotoOption[];
  onClick: (option: any) => void;
  active?: PhotoOption;
}

export default class PhotoList extends React.Component<PhotoListProps, {}> {
  public render() {
    const { active, onClick, options } = this.props;

    return (
      <ListScroller>
        <ListWrapper>
          {options.map((option: PhotoOption) => (
            <ListItem
              onClick={onClick.bind(null, option)}
              key={option.id}
              selected={active && active.id === option.id}
            >
              <Badge>{option.rank}</Badge>
              <img src={option.imageUrl} width="100" height="125" />
              <FloatingName selected={active && active.id === option.id}>{replace(option.name, ' ', '\r\n')}</FloatingName>
            </ListItem>
          ))}
        </ListWrapper>
      </ListScroller>
    );
  }
}
