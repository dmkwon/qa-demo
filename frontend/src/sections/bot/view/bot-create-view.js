'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import BotNewEditForm from '../bot-new-edit-form';

// ----------------------------------------------------------------------

export default function BotCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Bot"
        links={[
          {
            name: 'Bot',
            href: paths.bot.root,
          },
          { name: 'New Bot' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BotNewEditForm />
    </Container>
  );
}
