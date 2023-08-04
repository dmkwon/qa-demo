'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _bots } from 'src/_mock';
// components
import { useParams } from 'src/routes/hook';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import BotNewEditForm from '../bot-new-edit-form';

// ----------------------------------------------------------------------

export default function BotEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentBot = _bots.find((bot) => bot.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Bot',
            href: paths.bot.root,
          },
          { name: currentBot?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BotNewEditForm currentBot={currentBot} />
    </Container>
  );
}
