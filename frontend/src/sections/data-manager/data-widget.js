import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function DataWidget({ title, value, total, icon, sx, ...other }) {
  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Box component="img" src={icon} sx={{ width: 48, height: 48 }} />

      <Typography variant="h6" sx={{ mt: 3 }}>
        {title}
      </Typography>

      <LinearProgress
        value={24}
        variant="determinate"
        color="inherit"
        sx={{
          my: 2,
          height: 6,
          '&::before': {
            bgcolor: 'divider',
            opacity: 1,
          },
        }}
      />

      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="flex-end"
        sx={{ typography: 'subtitle2' }}
      >
        <Box
          sx={{
            mr: 0.5,
            typography: 'body2',
            color: 'text.disabled',
          }}
        >
          {fData(value)}
        </Box>

        {` / ${fData(total)}`}
      </Stack>
    </Card>
  );
}

DataWidget.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  value: PropTypes.number,
};