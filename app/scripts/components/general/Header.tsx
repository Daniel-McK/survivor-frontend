import * as React from 'react';
import styled from 'react-emotion';
import theme from '../../../styles/theme';
import { AppTab } from '../../models/structure';

const tabs = [
  { tabId: AppTab.Contestants, label: 'Contestants' },
  // { tabId: AppTab.Episodes, label: 'Episodes' }
  { tabId: AppTab.Users, label: 'Users' },
  { tabId: AppTab.Graph, label: 'Graph' }
];

const HeaderWrapper = styled('div')`
  background-color: ${theme.color.primary};
  color: ${theme.color.primaryFont};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  position: relative;
`;

const TabList = styled('nav')`
  display: flex;
`;

const Tab = styled('div')(
  ({ selected }: any) => `
  margin: 10px;
  padding: 2px 4px;
  text-transform: uppercase;
  cursor: pointer;
  ${
    selected
      ? ` border-bottom: 3px solid ${theme.color.white}; `
      : `&:hover {
          border-bottom: 3px solid ${theme.color.primaryLight};
        }`
  }
`
);

const TitleWrapper = styled('div')`
  z-index: 2;
  width: 100vw;
  background-color: ${theme.color.primary};
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
  height: ${({ loading }: { loading: boolean }) => (loading ? '100vh' : '40px')};
  transition: height .33s ease-in-out;
`;

const Title = styled('h1')`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface HeaderProps {
  loading: boolean;
  selectedTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const Header: React.SFC<HeaderProps> = props => {
  const onTabClick = ev => {
    ev && ev.target && props.onTabChange(parseInt(ev.target.dataset.id, 10));
  };

  return (
    <HeaderWrapper>
      <TitleWrapper loading={props.loading}>
        <Title>Fantasy Survivor</Title>
      </TitleWrapper>
      <TabList>
        {tabs.map(tab => (
          <Tab key={tab.tabId} selected={tab.tabId === props.selectedTab} data-id={tab.tabId} onClick={onTabClick}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
    </HeaderWrapper>
  );
};
