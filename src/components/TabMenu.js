import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import GameRoom from '../pages/GameRoom';

const TabMenu = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const {id, host} = props;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="활동" sx={{ width: '100%' }} />
        <Tab label="직업 정보" sx={{ width: '100%' }} />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        {/* 활동 탭에 해당하는 컴포넌트 */}
        <GameRoom id={id} host={host}/>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {/* 메모 탭에 해당하는 컴포넌트 */}
        <Typography>메모 내용을 보여주는 컴포넌트</Typography>
      </TabPanel>
    </div>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabMenu;