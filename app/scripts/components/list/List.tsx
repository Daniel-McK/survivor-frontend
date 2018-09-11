import "./List.scss";
import * as React from "react";

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
      <div className="list">
        {options.map((option, index) => (
          <div
            className={"list__item" + (active === option ? " selected" : "")}
            onClick={onClick.bind(null, option)}
            key={option[displayProperty]}
          >
            {index + 1}. {option[displayProperty]}
          </div>
        ))}
      </div>
    );
  }
}
