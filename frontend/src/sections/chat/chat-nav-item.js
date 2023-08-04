import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
// @mui
// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useResponsive } from 'src/hooks/use-responsive';
// api
import { clickConversation } from 'src/api/chat';
//
import Iconify from 'src/components/iconify';
import { useGetNavItem } from './hooks';

// ----------------------------------------------------------------------

export default function ChatNavItem({ selected, collapse, conversation, onCloseMobile }) {
  const { user } = useMockedUser();

  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const { displayName, displayText, lastActivity } = useGetNavItem({
    conversation,
    currentUserId: user.id,
  });

  // const singleParticipant = participants[0];

  // const { name, avatarUrl, status} = singleParticipant;

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

      await clickConversation(conversation.id);

      router.push(`${paths.chat.root}?id=${conversation.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [conversation.id, mdUp, onCloseMobile, router]);

  // const renderGroup = (
  //   <Badge
  //     variant={hasOnlineInGroup ? 'online' : 'invisible'}
  //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  //   >
  //     <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
  //       {participants.slice(0, 2).map((participant) => (
  //         <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
  //       ))}
  //     </AvatarGroup>
  //   </Badge>
  // );

  // const renderSingle = <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />;
  const renderSingle = <Iconify icon="tabler:message" width={48} />;

  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge color="error" overlap="circular" badgeContent={0}>
        {renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={displayName}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={displayText}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: 'body2',
              color: 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
              })}
            </Typography>

            {/* {!!conversation.unreadCount && (
              <Box sx={{ width: 8, height: 8, bgcolor: 'info.main', borderRadius: '50%' }} />
            )} */}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}

ChatNavItem.propTypes = {
  collapse: PropTypes.bool,
  conversation: PropTypes.object,
  onCloseMobile: PropTypes.func,
  selected: PropTypes.bool,
};
