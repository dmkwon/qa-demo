import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// components
import { useSettingsContext } from 'src/components/settings';
import { varHover } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function ThemeButton({ icons, sx }) {
  const settings = useSettingsContext();

  return (
    <Box
      component={m.div}
      animate={{
        rotate: [0, settings.themeMode === 'dark' ? 0 : 360],
      }}
      transition={{
        duration: 12,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        aria-label="themes"
        onClick={() =>
          settings.onUpdate('themeMode', settings.themeMode === 'light' ? 'dark' : 'light')
        }
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <SvgColor
          src={`/assets/icons/setting/ic_${
            settings.themeMode === 'light' ? icons[0] : icons[1]
          }.svg`}
        />
      </IconButton>
    </Box>
  );
}

ThemeButton.propTypes = {
  icons: PropTypes.array,
  sx: PropTypes.object,
};
