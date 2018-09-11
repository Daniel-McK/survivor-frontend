import * as React from "react";
import { css } from "emotion";
import styled from "react-emotion"
import theme from "../../../styles/theme";

const ListWrapper = styled('div')`
  border-right: 1px solid #c6ddde;
  width: 250px;
  height: 100%;
`;

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
        {options.map((option, index) => {
          const selected = active === option;
          const itemClass = css`
            padding: 10px 15px;
            border-bottom: solid 1px #c6ddde;
            background-color: ${selected && theme.color.primaryLight};
            color: ${selected ? theme.color.primaryFont : theme.color.secondaryFont};
            cursor: pointer;

            &:hover {
              background-color: ${selected ? theme.color.primaryLight : '#c6ddde'}
            }
          `;

          return (
            <div
              onClick={onClick.bind(null, option)}
              key={option[displayProperty]}
              className={itemClass}
            >
              {index + 1}. {option[displayProperty]}
            </div>
          );
        })}
      </ListWrapper>
    );
  }
}
