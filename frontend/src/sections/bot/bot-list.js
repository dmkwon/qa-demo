import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
//
import BotItem from './bot-item';

// ----------------------------------------------------------------------

export default function BotList({ bots }) {
  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      router.push(paths.bot.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.bot.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {bots.map((bot) => (
          <BotItem
            key={bot.id}
            bot={bot}
            onView={() => handleView(bot.id)}
            onEdit={() => handleEdit(bot.id)}
            onDelete={() => handleDelete(bot.id)}
          />
        ))}
      </Box>

      {bots.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}

BotList.propTypes = {
  bots: PropTypes.array,
};
