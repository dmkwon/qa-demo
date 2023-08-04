import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// components
import Iconify from 'src/components/iconify';
//
import PromptItem from './prompt-item';
import { PromptItemSkeleton } from './prompt-skeleton';

// ----------------------------------------------------------------------

export default function PromptList({ posts, loading, disabledIndex }) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <PromptItemSkeleton />
        </Grid>
      ))}
    </>
  );

  const renderList = (
    <>
      {posts.map((post, index) => (
        <Grid key={post.id} xs={12} sm={6} md={!disabledIndex && index === 0 ? 6 : 3}>
          <PromptItem post={post} index={!disabledIndex ? index : undefined} />
        </Grid>
      ))}
    </>
  );

  return (
    <>
      <Grid container spacing={3}>
        {loading ? renderSkeleton : renderList}
      </Grid>

      {posts.length > 8 && (
        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            mb: { xs: 10, md: 15 },
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />}
          >
            Load More
          </Button>
        </Stack>
      )}
    </>
  );
}

PromptList.propTypes = {
  disabledIndex: PropTypes.bool,
  loading: PropTypes.bool,
  posts: PropTypes.array,
};
