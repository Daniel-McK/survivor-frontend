import * as React from "react";
import styled, { css } from "react-emotion";
import theme from "../../../styles/theme";
import { AppTab } from "../../models/structure";

const tabs = [
  { tabId: AppTab.Contestants, label: "Contestants" },
  { tabId: AppTab.People, label: "People" }
];

const HeaderWrapper = styled("div")`
  background-color: ${theme.color.primary};
  color: ${theme.color.primaryFont};
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin: 0;
    padding: 15px 0 10px;
  }
`;

const TabList = styled("div")`
  display: flex;
`;

const Tab = styled("div")`
  margin: 10px;
  padding: 2px 4px;
  text-transform: uppercase;
  cursor: pointer;
`;

interface HeaderProps {
  selectedTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export class Header extends React.Component<HeaderProps, {}> {
  public render() {
    return (
      <HeaderWrapper>
        <h1>Fantasy Survivor</h1>
        <TabList>
          {tabs.map(tab => {
            const selected = tab.tabId === this.props.selectedTab;

            return (
              <Tab
                key={tab.tabId}
                className={css`
                  ${selected
                    ? `border-bottom: 3px solid ${theme.color.white}`
                    : `&:hover { border-bottom: 3px solid ${
                        theme.color.primaryLight
                      }; }`};
                `}
                data-id={tab.tabId}
                onClick={this.onTabClick}
              >
                {tab.label}
              </Tab>
            );
          })}
        </TabList>
      </HeaderWrapper>
    );
  }

  private onTabClick = ev => {
    ev && ev.target && this.props.onTabChange(parseInt(ev.target.dataset.id, 10));
  };
}
