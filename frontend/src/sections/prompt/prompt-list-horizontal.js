import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
//
import { PromptItemSkeleton } from './prompt-skeleton';
import PromptItemHorizontal from './prompt-item-horizontal';

// ----------------------------------------------------------------------

export default function PromptListHorizontal({ posts, loading }) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <PromptItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  const renderList = (
    <>
      {posts.map((post) => (
        <PromptItemHorizontal key={post.id} post={post} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {posts.length > 8 && (
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

PromptListHorizontal.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.array,
};
