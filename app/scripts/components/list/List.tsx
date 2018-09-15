import * as React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import theme from '../../../styles/theme';

const ListWrapper = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  border-bottom: solid 1px #c6ddde;
  justify-content: center;
`;

const ListItem = styled('li')(({ selected }: any) => `
  padding: 10px 15px;
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
