import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import theme from '../../../styles/theme';

const ListWrapper = styled('ul')`
  border-right: 1px solid #c6ddde;
  width: 250px;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled('li')(({ selected }: any) => `
  padding: 10px 15px;
  border-bottom: solid 1px #c6ddde;
  background-color: ${selected && theme.color.primaryLight};
  color: ${selected ? theme.color.primaryFont : theme.color.secondaryFont};
  cursor: pointer;

  &:hover {
    background-color: ${selected ? theme.color.primaryLight : '#c6ddde'}
  }
`
);

interface ListProps {
  options: any[];
  displayProperty: string;
  onClick: (option: any) => void;
  active?: any;
}

export class List extends React.Component<ListProps, {}> {
  public render() {
    const { active, displayProperty, onClick, options } = this.props;

    return (
      <ListWrapper>
        {options.map((option, index) => (
          <ListItem
            onClick={onClick.bind(null, option)}
            key={option[displayProperty]}
            selected={active === option}
          >
            {option[displayProperty]}
          </ListItem>
        ))}
      </ListWrapper>
    );
  }
}
