'use client';

import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _bots, BOT_PUBLISH_OPTIONS, BOT_DETAILS_TABS } from 'src/_mock';
// components
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
//
import BotDetailsToolbar from '../bot-details-toolbar';
import BotDetailsContent from '../bot-details-content';
import BotDetailsCandidates from '../bot-details-candidates';

// ----------------------------------------------------------------------

export default function BotDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentBot = _bots.filter((bot) => bot.id === id)[0];

  const [publish, setPublish] = useState(currentBot?.publish);

  const [currentTab, setCurrentTab] = useState('content');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {BOT_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'candidates' ? (
              <Label variant="filled">{currentBot?.candidates.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <BotDetailsToolbar
        backLink={paths.bot.root}
        editLink={paths.bot.edit(`${currentBot?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={BOT_PUBLISH_OPTIONS}
      />
      {renderTabs}

      {currentTab === 'content' && <BotDetailsContent bot={currentBot} />}

      {currentTab === 'candidates' && <BotDetailsCandidates candidates={currentBot?.candidates} />}
    </Container>
  );
}
