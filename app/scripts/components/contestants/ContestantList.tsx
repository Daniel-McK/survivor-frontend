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
  padding: 0;
  display: flex;
  border-bottom: solid 1px #c6ddde;
`;

const ListItem = styled('li')(({ selected }: any) => `
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px 5px;

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

interface ContestantListProps {
  options: Contestant[];
  onClick: (option: any) => void;
  active?: Contestant;
}

export default class ContestantList extends React.Component<ContestantListProps, {}> {
  public render() {
    const { active, onClick, options } = this.props;

    return (
      <ListScroller>
        <ListWrapper>
          {options.map((contestant, index) => (
            <ListItem
              onClick={onClick.bind(null, contestant)}
              key={contestant.id}
              selected={active === contestant}
            >
              <img src={contestant.imageUrl} width="100" height="125" />
              <FloatingName selected={active === contestant}>{replace(contestant.name, ' ', '\r\n')}</FloatingName>
            </ListItem>
          ))}
        </ListWrapper>
      </ListScroller>
    );
  }
}